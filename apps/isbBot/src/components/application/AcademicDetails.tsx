import React, { CSSProperties, useState } from "react";
import styles from "./index.module.css";
import DragDropFile from "../draganddrop/DragDropFile";
import {
  academicDetailsErrorType,
  academicDetailsType,
} from "../../types/application-type/applicationInterface";
import { preSignApiCall, getPreSignApi, postResume } from "../../services/applicationFormApi";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";

const fileSizeValidation = (file: File) => {
  if (file) {
    const fileSize = file.size; // size in bytes
    const fileSizeInKB = fileSize / 1024; // size in KB
    let fileSizeInMB = fileSizeInKB / 1024; // size in MB
    fileSizeInMB = Math.round(fileSizeInMB)

    console.log('File Size:', fileSize, 'bytes');
    console.log('File Size:', fileSizeInMB.toFixed(2), 'MB');

    if (fileSizeInMB > 5) {

      // Clear the file input if the file size exceeds the li
      return false
    }
    return true
  }
  return false
}

//css
const containerStyle: CSSProperties = {
  // justifyContent: "space-between",
  display: "flex",
  flexWrap: 'wrap',
  gap: '30px',
};

const titleStyle: CSSProperties = {
  color: "#2E3B42",
  fontFamily: "Roboto-regular",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "24px",
  marginBottom: "10px",
};

const descriptionStyle: CSSProperties = {
  color: '#5D6F7A',
  fontFamily: "Roboto-regular",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginTop: "8px",
  alignSelf: "stretch",

};

const subDescription: CSSProperties = {
  color: "rgba(51, 63, 81, 0.70)",
  fontFamily: 'Roboto-regular',
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  marginTop: "12px",
  alignSelf: "stretch",

};

const uploadFileConfig = [
  {
    label: "Curriculum Vitae (CV)",
    description:
      "Please upload your <b>CV</b> in a <b>PDF format</b> with maximum size of <b>5MB</b>. And the CV should contain the following :",
    subDescription: [
      "Your <b>Education Details, Skills, Achievements & Awards, Work Experience</b> (if any) and Volunteer Work",
      "Your CV will be accepted if your name, email address, mobile number, and date of birth (DD/MM/YYYY) match the details entered in the previous step."
    ],
  },
  {
    label: "12th Grade Marksheet",
    description:
      "Please upload your <b>12th Grade marksheet</b> in a <b>PDF format</b> with maximum size of <b>5MB</b>",
  },
];

const AcademicDetails = (
  {
    data,
    error,
    handleError,
    onChange
  }: {
    data: academicDetailsType,
    error: academicDetailsErrorType,
    onChange: (arg: academicDetailsType) => void,
    handleError: (arg: academicDetailsErrorType) => void
  }
) => {
  const [curriculumVitae, setCurriculumVitae] = useState<File | null>(null);
  const [highSchoolCertificate, setHighSchoolCertificate] = useState<File | null>(null);
  const [progressForCv, setProgressForCv] = useState(0);
  const [progressForHsc, setProgressForHsc] = useState(0)
  const [cvUploading, setCvUploading] = useState(false);
  const [hscUploading, setHscUploading] = useState(false)


  const handleChange = async (key: string, value: File) => {
    const userId = localStorage.getItem('userId') ?? ''
    const formData = new FormData();
    if (key === 'curriculumVitae') {
      toast("Uploading and verifying will take time. Please wait!",
        {
          icon: <CiWarning size={26} color="#F7C500" />,
          style: {
            borderRadius: '10px',
            border: '1px solid #F7C500',
            color: '#F7C500',
          },
        }
      );

      if (!fileSizeValidation(value)) {
        // @ts-ignore
        handleError((pre: academicDetailsErrorType) => {
          return {
            ...pre, curriculumVitae: 'File size should not be more than 5 MB'
          }
        })
        return
      }
      setCvUploading(true)
      formData.append('file', value);
      formData.append('user_id', userId);
      const url = 'https://dev-is.s3.amazonaws.com/CandidateDetails/412b7e36-414d-43d8-b078-9d5c84fd76c9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUHQBCFSBFUG63JN7%2F20240415%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T141127Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=2c32548dc574ed82eb28622e642f286bfad3a46a8e3e85d73908c4bf8fb14ce6'
      try {
        const resp1 = await postResume(formData)
        if ('error' in resp1) {
          // @ts-ignore
          handleError((pre: academicDetailsErrorType) => {
            return {
              ...pre, curriculumVitae: `We have noticed errors in your CV. Please review the CV upload guidelines mentioned below. ${resp1['error']}`
            }
          })
          setCurriculumVitae(null)
          setCvUploading(false)
        } else {

          const apis = await getPreSignApi()
          // @ts-ignore
          const resp2 = await preSignApiCall(apis?.presigned_url, value, value?.type, setProgressForCv)

          if (error?.curriculumVitae) {
            // @ts-ignore
            handleError((pre: academicDetailsErrorType) => {
              return {
                ...pre, curriculumVitae: ''
              }
            })
          }
          setCurriculumVitae(value)
          onChange({ ...data, [key]: apis?.s3_location })
          setCvUploading(false)
          setProgressForCv(0)
        }

      } catch (e: any) {
        console.log(e?.response?.data?.detail)
        // @ts-ignore
        handleError((pre: academicDetailsErrorType) => {
          return {
            ...pre, curriculumVitae: e?.response?.data?.detail ?? "We've noticed errors in your resume. Please review the CV upload guidelines mentioned below. Please ensure that your name, email, mobile number, and date of birth are entered accurately in the following format: dd/mm/yyyy. Additionally, ensure that these details match the information provided in the previous step. This includes your education, skills, achievements & awards, work experience (if applicable), and volunteer work."
          }
        })
        setCurriculumVitae(null)
        setCvUploading(false)
      }
    } else {
      if (!fileSizeValidation(value)) {
        // @ts-ignore
        handleError((pre: academicDetailsErrorType) => {
          return {
            ...pre, highSchoolCertificate: 'File size should not be more than 5 MB'
          }
        })
        // onChange({ ...data, [key]: ""})
        return
      }
      try {
        setHscUploading(true)

        const apis = await getPreSignApi()
        // @ts-ignore
        const resp2 = await preSignApiCall(apis?.presigned_url, value, value?.type, setProgressForHsc)

        if (error?.highSchoolCertificate) {
          // @ts-ignore
          handleError((pre: academicDetailsErrorType) => {
            return {
              ...pre, highSchoolCertificate: ''
            }
          })
        }
        setHighSchoolCertificate(value)
        onChange({ ...data, [key]: apis?.s3_location })
        setHscUploading(false)
        setProgressForHsc(0)
      } catch (e) {
        // @ts-ignore
        handleError((pre: academicDetailsErrorType) => {
          return {
            ...pre, highSchoolCertificate: 'Upload failed. Please try again.'
          }
        })
        setHighSchoolCertificate(null)
        setHscUploading(false)
      }
    }
  }

  return (
    <div style={{
      paddingBottom: "25px"
    }}>
      <div style={containerStyle} className={styles.container}>

        <div
          style={{
            width: "500px",
          }}
        >
          <p style={titleStyle}>{uploadFileConfig[0].label}</p>
          <DragDropFile
            uploadedUrl={data?.curriculumVitae}
            value={curriculumVitae}
            onChange={(value) => handleChange('curriculumVitae', value)}
            errorMessage={error?.curriculumVitae}
            progress={progressForCv}
            isUploading={cvUploading}
            genericName="CV"
            btnText='Upload'
            loadingText='Uploading and Verifying'
            percentageBtnWidth='350px'
            showPercentage={false}
          />
          <p style={descriptionStyle}>
            <div dangerouslySetInnerHTML={{ __html: uploadFileConfig[0].description }} />
          </p>
          <div
            style={{
              marginLeft: "3px",
            }}
          >
            {
              uploadFileConfig[0]?.subDescription?.map((label, index) => (
                <p key={label} style={subDescription}>
                  <div dangerouslySetInnerHTML={{ __html: `${index + 1}. ${label}` }} />
                </p>
              ))}
          </div>
        </div>

        <div
          style={{
            width: "500px",
          }}
        >
          <p style={titleStyle}>{uploadFileConfig[1].label}</p>
          <DragDropFile
            uploadedUrl={data?.highSchoolCertificate}
            value={highSchoolCertificate}
            onChange={(value) => {
              if (cvUploading) {
                toast("Please wait while we upload your CV.",
                  {
                    icon: <CiWarning size={26} color="#F7C500" />,
                    style: {
                      borderRadius: '10px',
                      border: '1px solid #F7C500',
                      color: '#F7C500',
                    },
                  }
                );
                return
              } else {
                handleChange('highSchoolCertificate', value)
              }
            }
            }
            errorMessage={error?.highSchoolCertificate}
            progress={progressForHsc}
            isUploading={hscUploading}
            genericName="12thGrade-Marksheet"
            showPercentage={true}
          />

          <p style={descriptionStyle}>
            <div dangerouslySetInnerHTML={{ __html: uploadFileConfig[1].description }} /></p>
          <div
            style={{
              marginLeft: "3px",
            }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicDetails;
