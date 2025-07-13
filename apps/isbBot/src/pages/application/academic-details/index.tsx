import React, { useEffect, useState } from 'react'
import { academicDetailsErrorType, academicDetailsType, ApplicationDetailsErrorType, applicationQuestionType, IPersonalDetails, User } from '../../../types/application-type/applicationInterface';
import { Backdrop, CircularProgress } from '@material-ui/core';
import SideBar from '../../../components/applicationForm/SideBar';
import styles from '../index.module.css'
import { IoMdArrowBack } from 'react-icons/io';
import NextButton from '../../../components/nextbutton/NextButton';
import { getUserData, postUserData } from '../../../services/applicationFormApi';
import { useRouter } from 'next/router';
import { isValidAcademicDetails, isValidApplicationDetails } from '../../../utils/validation';
import AcademicDetails from '../../../components/application/AcademicDetails';
import MobilePopup from '../../../components/ui-components/MobilePopup';
import TopBar from '../../../components/applicationForm/TopBar';
const initialAcademicDetailsError = () => {
    return {
        curriculumVitae: "",
        highSchoolCertificate: ""
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

const AcademicDetailsForm = () => {
    const [application, setApplication] = useState<User>(initialApplicationState);
    const [academicDetailsError, setAcademicDetailsError] = useState<academicDetailsErrorType>(initialAcademicDetailsError())
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
            email: application?.personalDetails?.email ?? '',
            linkedin_url: application?.personalDetails?.linkedinUrl ?? '',
            photo_url: application?.personalDetails?.profileImage ?? '',
            cv_url: application?.academicDetails?.curriculumVitae ?? '',
            highschool_url: application?.academicDetails?.highSchoolCertificate ?? '',
            startup_overview: application?.applicationQuestion?.startup_overview ?? '',
            startup_inspiration: application?.applicationQuestion?.startup_inspiration ?? '',
            startup_differentiation: application?.applicationQuestion?.startup_differentiation ?? '',
            navigator_state: 2
        }


        if (isValidAcademicDetails(application.academicDetails, setAcademicDetailsError)) {
            // api call to save input data
            setLoading(true)
            const resp = await postUserData(request, token, router, setLoading)
            setLoading(false)
            if (resp?.status === 200) {
                router.push('/application/application-questions')
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

        if (resp?.data?.navigator_state !== 1) {
            if (resp?.data?.navigator_state == 0) {
                router.push("/application/personal-details")
            } else
                if (resp?.data?.navigator_state == 2) {
                    router.push("/application/application-questions")
                } else if (resp?.data?.navigator_state == 3) {
                    router.push("/application/payment")
                } else if (resp?.data?.navigator_state == 4) {
                    router.push("/application-submitted")
                }
                else if (resp?.data?.navigator_state == 5) {
                    router.push(`/interview/${userId}`)
                }
                else if (resp?.data?.navigator_state == 6) {
                    router.push("/interview-completed")
                }
                else {
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
            <SideBar activeTab={1} handleStepperTab={() => { }} />
            <div className={styles.formContainer}>
                <div className={styles.backBtn} style={{ marginTop: "80px" }} >
                    <IoMdArrowBack
                        size={24}
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
                                navigator_state: 0
                            }
                            const resp2 = await postUserData(request, token, router)
                            console.log("RESP2", resp2)

                            router.push('/application/personal-details')
                        }}
                    />
                    <span>BACK TO PREVIOUS</span>
                </div>
                <div className={styles.heading} style={{ marginBottom: "30px" }}>
                    Academic Details <span>(All fields are mandatory)</span>
                </div>

                <AcademicDetails
                    data={application?.academicDetails}
                    error={academicDetailsError}
                    handleError={setAcademicDetailsError}
                    onChange={(value: any) => handleChange('academicDetails', value)}
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

export default AcademicDetailsForm