/* eslint-disable turbo/no-undeclared-env-vars */
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Label from "../ui-components/Label";
import InputField from "../ui-components/InputField";
import MuiDatePicker from "../../UiComponents/MuiDatePicker";
import SelectTag from "../ui-components/SelectTag";
import PhoneNumberInput from "../ui-components/PhoneNumberInput";
import ImageUpload from "../ui-components/UploadImage";
import { ApplicationDetailsErrorType, IPersonalDetails } from "../../types/application-type/applicationInterface";
import { getYesterdayDate } from "../../utils/getYesDate";
import { Country, State, City } from "country-state-city"
import Select from "react-select";
import toast from "react-hot-toast";

const ventureStageOptions = [
  {
    label: "Ideation / MVP Stage: Ideating, doing market research and validation, product building & testing.",
    value: "Ideation / MVP Stage: Ideating, doing market research and validation, product building & testing.",
  },
  {
    label: "Pre - Revenue: Company Incorporated, MVP ready but not generating revenue yet.",
    value: "Pre - Revenue: Company Incorporated, MVP ready but not generating revenue yet.",
  },
  {
    label: "Revenue Stage: Company is generating revenue and has customer base.",
    value: "Revenue Stage: Company is generating revenue and has customer base.",
  },
];

const entrepreneurTypeOptions = [
  {
    label: "Startup Founder / Co-founder",
    value: "Startup Founder / Co-founder",
  },
  {
    label: "Aspiring Entrepreneur",
    value: "Aspiring Entrepreneur",
  },
];

const SectorOptions = [
  { label: "SaaS", value: "SaaS" },
  { label: "B2B", value: "B2B" },
  { label: "Artificial Intelligence (AI)", value: "Artificial Intelligence (AI)" },
  { label: "Fintech", value: "Fintech" },
  { label: "Developer Tools", value: "Developer Tools" },
  { label: "Marketplaces", value: "Marketplaces" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Analytics", value: "Analytics" },
  { label: "HealthTech", value: "HealthTech" },
  { label: "EdTech", value: "EdTech" },
  { label: "Consumer Internet", value: "Consumer Internet" },
  { label: "Mobile", value: "Mobile" },
  { label: "Robotics", value: "Robotics" },
  { label: "Crypto/Web3", value: "Crypto/Web3" },
  { label: "Enterprise Software", value: "Enterprise Software" },
  { label: "Sustainability/CleanTech", value: "Sustainability/CleanTech" },
  { label: "Security", value: "Security" },
  { label: "Biotech", value: "Biotech" },
  { label: "AR/VR/XR", value: "AR/VR/XR" },
  { label: "Logistics/Supply Chain", value: "Logistics/Supply Chain" },
  { label: "Consumer Products", value: "Consumer Products" },
  { label: "Gaming", value: "Gaming" }
];


const PersonalDetails = ({
  data,
  error,
  onChange,
  handleError
}: {
  data: IPersonalDetails,
  onChange: (arg: IPersonalDetails) => void,
  error: ApplicationDetailsErrorType,
  handleError: (arg: ApplicationDetailsErrorType) => void
}) => {
  const [debouncedPostalCode, setDebouncedPostalCode] = useState(data?.pinCode);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState('')
  const [isDisable, setDisable] = useState(true)
  const [pinCodeError, setPinCodeError] = useState("");
  const options = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  const linkdinInstructionStyle = {
    marginTop: "4px",
    color: "#95A9B4",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    fontFamily: "Roboto-medium",
  };

  const handleChange = (key: string, value: string | Date | null) => {
    if (error?.[key]) handleError({ ...error, [key]: '' })

    onChange({ ...data, [key]: value })

  }

  const getCountryCodeAndIsoCode = (data: any) => {
    const resp: any = State.getStatesOfCountry(Country.getAllCountries().find((item) =>
      item?.name === data.country)?.isoCode).find((item) => item?.name === data?.state) ?? {}
    return { countryCode: resp?.countryCode, isoCode: resp?.isoCode }
  }

  const getCountryIso = (data: any) => {
    const isoCode = Country.getAllCountries().find((item) => item?.name === data?.country)?.isoCode ?? '';
    return isoCode
  }

  const fetchLocation = async (debouncedPostalCode) => {
    // console.log(debouncedPostalCode, process.env.GEOCODING_GOOGLE_API_KEY)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${debouncedPostalCode}&key=${process.env.NEXT_PUBLIC_GEOCODING_GOOGLE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        console.log('addressComponents', addressComponents)
        const city = addressComponents.find(component =>
          component.types.includes("locality")
        )?.long_name;
        const state = addressComponents.find(component =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;
        const country = addressComponents.find(component =>
          component.types.includes("country")
        )?.long_name;

        setPinCodeError("");
        setCity(city)

        setState(state)
        setCountry(country)
        setDisable(false)
      } else {
        console.log("Invalid postal code");
        setPinCodeError("Invalid pin code / post code")
        setCity("");
        setState("");
        setCountry('')
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    let timer;
    if (data.pinCode !== "") {
      timer = setTimeout(() => {
        setDebouncedPostalCode(data?.pinCode)
      }, 500);
    }

    return () => clearTimeout(timer)
  }, [data?.pinCode])

  useEffect(() => {
    if (debouncedPostalCode) {
      fetchLocation(debouncedPostalCode);
    }
  }, [debouncedPostalCode]);

  useEffect(() => {
    handleChange("city", city)
  }, [city])

  useEffect(() => {
    handleChange("state", state)
  }, [state])

  useEffect(() => {
    handleChange("country", country)
  }, [country])

  return (
    <div>
      <div className={styles.personalDetailsContainer}>
        <div style={{ width: "100%" }}>
          <div
            className={styles.fieldsContainer}
            style={{ marginBottom: "20px" }}
          >
            <div>
              <Label text="First Name" points='The first name should be same as in your CV' />
              <InputField
                placeholder="First Name"
                errorMessage={error?.firstName}
                onChange={(value) => {
                  if (!/\d/.test(value)) {
                    handleChange("firstName", value);
                  }
                }}
                value={data?.firstName}
              />
            </div>
            <div>
              <Label text="Last Name" points='The last name should be same as in your CV' />
              <InputField
                placeholder="Last Name"
                errorMessage={error?.lastName}
                onChange={(value) => {
                  if (!/\d/.test(value)) {
                    handleChange("lastName", value);
                  }

                }}
                value={data?.lastName}
              />
            </div>
          </div>
          <div
            className={styles.fieldsContainer}
            style={{ marginBottom: "20px" }}
          >
            <div>
              <Label text="Mobile Number" points='The mobile number should be the same as in your resume.' />
              <PhoneNumberInput
                errorMessage={error?.phone}
                value={data?.phone}
                onchange={(value) =>
                  handleChange("phone", value)
                }
                disabled={true}
              />
            </div>
            <div>
              <Label
                text="Email"
                points='Please ensure that you provide a valid email address. Note that once entered, the email address can not be changed.'
              />
              <InputField
                placeholder="Email"
                errorMessage={error?.email}
                onChange={(value) => {
                  handleChange("email", value);
                }}
                value={data?.email}
              />
            </div>
          </div>
          <div
            className={styles.fieldsContainer}
            style={{ marginBottom: "20px" }}
          >
            <div>
              <Label text="Gender" />
              <SelectTag
                errorMessage={error?.gender}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    handleChange("gender", value);
                  }
                }}
                options={options}
                placeholder="Gender"
                value={data.gender}
              />
            </div>
            <div>
              <Label text="Date of Birth" points='The date of birth should be the same as in your resume.' />
              <MuiDatePicker
                errorMessage={error?.dob}
                onChange={(value) => handleChange("dob", value)}
                maxDate={getYesterdayDate()}
                minDate={null}
                value={data?.dob ?? null}
              />
            </div>
          </div>
          <div
            className={styles.fieldsContainer}
            style={{ marginBottom: "20px" }}
          >
            <div>
              <Label text="Pin Code/Post Code" />
              <InputField
                type="number"
                placeholder="Pin Code/Post Code"
                errorMessage={error?.pinCode}
                onChange={(value) => {
                  handleChange("pinCode", value);
                }}
                value={data?.pinCode}
              />
              <div style={{ fontSize: "12px", color: "red" }}>{pinCodeError}</div>
            </div>
            <div>
              <Label text="City" />
              <InputField
                placeholder="Auto fill"
                errorMessage={error?.city}
                onChange={(value) => {
                  handleChange("city", value);
                }}
                disabled={isDisable}
                value={data.city}
              />
            </div>
          </div>

          <div
            className={styles.fieldsContainer}
            style={{ marginBottom: "20px" }}
          >
            <div>
              <Label text="State" />
              <InputField
                placeholder="Auto fill"
                errorMessage={error?.city}
                onChange={(value) => {
                  handleChange("state", value);
                }}
                disabled={isDisable}
                value={data.state}
              />
            </div>
            <div>
              <Label text="Country" />
              <InputField
                placeholder="Auto fill"
                errorMessage={error?.country}
                onChange={(value) => {
                  handleChange("country", value);
                }}
                disabled={isDisable}
                value={data.country}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Label text="LinkedIn URL"
              points={[
                'Login to your LinkedIn Account on your web-browser.',
                ' ⁠Click the Me icon at the top of your LinkedIn homepage, and click on view profile.',
                'Copy the profile URL present at the address bar of your webpage.'
              ]}
              width="500px"
            />
            <InputField
              errorMessage={error?.linkedinUrl}
              placeholder="https://www.linkedin.com/in/name/"
              onChange={(value) => {
                handleChange("linkedinUrl", value);
              }}
              value={data?.linkedinUrl}
            />
            <p style={linkdinInstructionStyle}>
              Please paste your LinkedIn profile URL so that we can view your profile
            </p>
          </div>
        </div>
        <div className={styles.photoContainer}>
          <Label text="Photo" />
          <div>
            <ImageUpload
              value={data?.profileImage}
              onChange={(value: string) => handleChange("profileImage", value)}
              error={error}
              handleError={handleError}
            />
          </div>

          <ol className={styles.imageGuidline}>
            <li>Passport-style photo in JPEG format only.</li>
            <li>Dimensions of 192x192 px and a maximum file size of 200KB.</li>
            <li>Please ensure a plain white background, forward-facing and with no accessories blocking the face.</li>
          </ol>
          {data.whatDefinesYou && <div
            className={styles.fieldsContainer}
            style={{ marginBottom: "20px" }}
          >
            <div>
              <Label text="What defines you?" />
              <SelectTag
                errorMessage={error?.whatDefinesYou}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    handleChange("whatDefinesYou", value);
                  }
                }}
                options={entrepreneurTypeOptions}
                placeholder="What defines you?"
                value={data.whatDefinesYou}
                isDisabled={true}
              />
            </div>
          </div>}
          {data.whatDefinesYou && data.whatDefinesYou === 'Startup Founder / Co-founder' && <>
            <div
              className={styles.fieldsContainer}
              style={{ marginBottom: "20px" }}
            >
              <div>
                <Label text="Venture Stage" />
                <SelectTag
                  errorMessage={error?.ventureStage}
                  onChange={(value) => {
                    if (typeof value === 'string') {
                      handleChange("ventureStage", value);
                    }
                  }}
                  options={ventureStageOptions}
                  placeholder="Venture Stage"
                  value={data.ventureStage}
                />
              </div>
            </div>
            <div
              className={styles.fieldsContainer}
              style={{ marginBottom: "20px" }}
            >
              <div>
                <Label text="Sector" />
                <SelectTag
                  errorMessage={error?.sector}
                  onChange={(value) => {
                    if (typeof value === 'string') {
                      handleChange("sector", value);
                    }
                  }}
                  options={SectorOptions}
                  placeholder="Sector"
                  value={data.sector}
                />
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;