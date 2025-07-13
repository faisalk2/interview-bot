import React, { useEffect, useState } from 'react'
import { academicDetailsErrorType, academicDetailsType, ApplicationDetailsErrorType, applicationQuestionErrorType, applicationQuestionType, IPersonalDetails, User } from '../../../types/application-type/applicationInterface';
import { Backdrop, CircularProgress } from '@material-ui/core';
import SideBar from '../../../components/applicationForm/SideBar';
import styles from '../index.module.css'
import { IoMdArrowBack } from 'react-icons/io';
import NextButton from '../../../components/nextbutton/NextButton';
import { getUserData, postUserData } from '../../../services/applicationFormApi';
import { useRouter } from 'next/router';
import { isValidAcademicDetails, isValidApplicationDetails, isValidApplicationQuestion } from '../../../utils/validation';
import AcademicDetails from '../../../components/application/AcademicDetails';
import ApplicationQuestion from '../../../components/applicationForm/ApplicationQuestion';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';
import MobilePopup from '../../../components/ui-components/MobilePopup';
import TopBar from '../../../components/applicationForm/TopBar';

const initialApplicationQuestionError = () => {
    return {
        startup_overview: '',
        startup_inspiration: '',
        startup_differentiation: ''
    }
}

export const initialApplicationState: User = {
    personalDetails: {
        firstName: "",
        lastName: "",
        phone: "",
        profileImage: '',
        dob: null,
        linkedinUrl: "",
        gender: "",
        country: "",
        state: "",
        city: "",
        pinCode: '',
        email: ""
    },
    academicDetails: {
        curriculumVitae: '',
        highSchoolCertificate: '',
    },
    applicationQuestion: {
        startup_overview: '',
        startup_inspiration: '',
        startup_differentiation: ''
    },
    navigator_state: 0
};

const ApplicationQuestionForm = () => {
    const [application, setApplication] = useState<User>(initialApplicationState);
    const [applicationQuestionError, setApplicationQuestionError] = useState<applicationQuestionErrorType>(initialApplicationQuestionError())
    const [loading, setLoading] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const router = useRouter();
    const windowWidth = document?.documentElement?.clientWidth;
    const handleChange = (key: string, value:
        IPersonalDetails | academicDetailsType | applicationQuestionType) => {

        setApplication((pre) => {
            return {
                ...pre, [key]: value,
            }
        })
    }


    const handleActiveTab = async () => {
        setDisableNext(true)
        const userId = localStorage.getItem('userId') ?? ''
        const token = localStorage.getItem('userToken') ?? ''
        const navigator_state = application?.navigator_state

        // data to  post
        const request = {
            id: userId,
            firstname: application?.personalDetails?.firstName ?? '',
            lastname: application?.personalDetails?.lastName ?? '',
            phone: application?.personalDetails?.phone ?? '',
            dob: application?.personalDetails?.dob ?? '',
            gender: application?.personalDetails?.gender ?? '',
            user_city: application?.personalDetails?.city ?? '',
            user_state: application?.personalDetails?.state ?? '',
            user_pincode: application?.personalDetails?.pinCode ?? '',
            user_country: application?.personalDetails?.country ?? '',
            email: application?.personalDetails?.email ?? '',
            linkedin_url: application?.personalDetails?.linkedinUrl ?? '',
            photo_url: application?.personalDetails?.profileImage ?? '',
            cv_url: application?.academicDetails?.curriculumVitae ?? '',
            highschool_url: application?.academicDetails?.highSchoolCertificate ?? '',
            startup_overview: application?.applicationQuestion?.startup_overview ?? '',
            startup_inspiration: application?.applicationQuestion?.startup_inspiration ?? '',
            startup_differentiation: application?.applicationQuestion?.startup_differentiation ?? '',
            navigator_state: 3
        }


        if (isValidApplicationQuestion(application.applicationQuestion, setApplicationQuestionError)) {
            // api call to save input data
            setLoading(true)
            const resp = await postUserData(request, token, router, setLoading)
            setLoading(false)
            if (resp?.status === 200) {
                router.push('/application/payment')
            }
        }

        setDisableNext(false)
    }


    const getUserDetails = async (userId: string) => {
        let userName: any = localStorage.getItem('userName');
        userName = userName && userName !== 'undefined' &&
            userName !== undefined && userName !== null &&
            userName !== 'null' ? userName : ''

        const newUserName = userName.trim().split(' ')
        const firstName = newUserName[0] !== 'undefined' ? newUserName[0] : '';
        const lastName = newUserName[1] !== 'undefined' ? newUserName[1] : ''
        setLoading(true)
        const resp = await getUserData(userId)
        setLoading(false)
        console.log('1')
        if (resp?.data?.navigator_state !== 2) {

            if (resp?.data?.navigator_state == 0) {
                console.log('2')
                router.push("/application/personal-details")
            } else
                if (resp?.data?.navigator_state == 1) {
                    console.log('3')
                    router.push("/application/academic-details")
                } else if (resp?.data?.navigator_state == 3) {
                    console.log('4')
                    router.push("/application/payment")
                } else
                    if (resp?.data?.navigator_state == 4) {
                        console.log('5')
                        router.push("/application-submitted")
                    }
                    else if (resp?.data?.navigator_state == 5) {
                        console.log('6')
                        router.push(`/interview/${userId}`)
                    }
                    else if (resp?.data?.navigator_state == 6) {
                        console.log('7')
                        router.push("/interview-completed")
                    }
                    else {
                        console.log('8')
                        router.push("/sign-in")
                    }
        }

        setApplication({
            personalDetails: {
                firstName: resp?.data?.firstname ?? firstName ?? "",
                lastName: resp?.data?.lastname ?? lastName ?? '',
                phone: resp?.data?.phone ?? "",
                profileImage: resp?.data?.photo_url ?? "",
                dob: resp?.data?.dob ?? "",
                linkedinUrl: resp?.data?.linkedin_url ?? "",
                gender: resp?.data?.gender ?? "",
                city: resp?.data?.user_city ?? "",
                state: resp?.data?.user_state ?? "",
                pinCode: resp?.data?.user_pincode ?? "",
                email: resp?.data?.email ?? "",
                country: resp?.data?.user_country ?? "",
            },
            academicDetails: {
                curriculumVitae: resp?.data?.cv_url ?? "",
                highSchoolCertificate: resp?.data?.highschool_url ?? "",
            },
            applicationQuestion: {
                startup_overview: resp?.data?.startup_overview ?? "",
                startup_inspiration: resp?.data?.startup_inspiration ?? "",
                startup_differentiation: resp?.data?.startup_differentiation ?? ""
            },
            navigator_state: resp?.data?.navigator_state ?? 0
        })

    }


    useEffect(() => {
        const userId = localStorage.getItem('userId') ?? ''
        toast(<div>
            <strong>Note:</strong>
            <br />
            Please upload your videos after reading through the guidelines
        </div>,

            {
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    borderLeft: '6px solid #EE984D',
                    borderTop: '1px solid #EE984D',
                    borderRight: '1px solid #EE984D',
                    borderBottom: '1px solid #EE984D',
                    color: '#EE984D',
                },
            }
        );
        if (!userId) {
            router.push('/sign-in');
        }

        getUserDetails(userId)

    }, [router])


    return (
        <div className={styles.applicationContainer}>
            {windowWidth <= 950 && <MobilePopup />}
            {loading && <Backdrop open={true} style={{ zIndex: 999, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            <TopBar />
            <SideBar activeTab={2} handleStepperTab={() => { }} />
            <div className={styles.formContainer}>

                <div className={styles.backBtn} style={{ marginTop: "75px" }} >
                    <IoMdArrowBack
                        size={32}
                        color="#545454"
                        style={{ cursor: "pointer" }}
                        onClick={async (e: any) => {
                            e.stopPropagation();
                            const userId = localStorage.getItem('userId') ?? ''
                            if (!userId) {
                                router.push('/sign-in');
                            }
                            const token = localStorage.getItem("userToken") ?? ""
                            const request = {
                                id: userId,
                                navigator_state: 1
                            }
                            const resp2 = await postUserData(request, token, router)
                            console.log("RESP2", resp2)

                            router.push('/application/academic-details')
                        }}
                    />
                    <span>BACK TO PREVIOUS</span>
                </div>
                <div className={styles.heading} style={{ marginBottom: "30px" }}>
                    Application Questions <span>(All fields are mandatory)</span>
                </div>

                <ApplicationQuestion
                    data={application?.applicationQuestion}
                    error={applicationQuestionError}
                    handleError={setApplicationQuestionError}
                    onChange={(value: any) => handleChange('applicationQuestion', value)}
                />

                <NextButton
                    name={'Next'}
                    disabled={false}
                    handleActiveTab={handleActiveTab}
                />
            </div>
        </div>
    )

}

export default ApplicationQuestionForm