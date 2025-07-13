import React, { useEffect, useState } from 'react'
import PersonalDetails from '../../../components/applicationForm/PersonalDetails'
import { academicDetailsType, ApplicationDetailsErrorType, applicationQuestionType, IPersonalDetails, User } from '../../../types/application-type/applicationInterface';
import { Backdrop, CircularProgress } from '@material-ui/core';
import SideBar from '../../../components/applicationForm/SideBar';
import styles from '../index.module.css'
import { IoMdArrowBack } from 'react-icons/io';
import NextButton from '../../../components/nextbutton/NextButton';
import { getUserData, postUserData } from '../../../services/applicationFormApi';
import { useRouter } from 'next/router';
import { isValidApplicationDetails } from '../../../utils/validation';
import MobilePopup from '../../../components/ui-components/MobilePopup';
import TopBar from '../../../components/applicationForm/TopBar';
const initialApplicationDetailsError = () => {
    return {
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        gender: '',
        linkedinUrl: '',
        profileImage: '',
        state: "",
        city: "",
        pinCode: '',
        email: "",
        whatDefinesYou: '',
        sector: '',
        ventureStage: ''
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
        email: "",
        whatDefinesYou: '',
        sector: '',
        ventureStage: ''
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

const PersonalDetailsForm = () => {
    const [application, setApplication] = useState<User>(initialApplicationState);
    const [applicationDetailsError, setApplicationDetailsError] = useState<ApplicationDetailsErrorType>(initialApplicationDetailsError())
    const [loading, setLoading] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const windowWidth = document?.documentElement?.clientWidth;
    const router = useRouter();

    const handleChange = (key: string, value:
        IPersonalDetails | academicDetailsType | applicationQuestionType) => {
        let navigator_state = 0
        if (key == 'personalDetails') {
            navigator_state = 1
            setApplication((pre: User) => {
                return {
                    ...pre, academicDetails: {
                        ...pre.academicDetails,
                        curriculumVitae: ''
                    }
                }
            })
        }
        else if (key == 'academicDetails') {
            navigator_state = 2
        }
        else if (key == 'applicationQuestion') {
            navigator_state = 3
        }
        setApplication((pre) => {
            return {
                ...pre, [key]: value, navigator_state: navigator_state
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
            navigator_state: 1,
            entrepreneur_type:application.personalDetails.whatDefinesYou,
            venture_stage:application.personalDetails.ventureStage,
            sector:application.personalDetails.sector
        }

        if (isValidApplicationDetails(application?.personalDetails, setApplicationDetailsError)) {
            setLoading(true)
            // api call to save input data
            const resp = await postUserData(request, token, router, setLoading)

            console.log(resp)
            if (resp?.status === 200) {
                router.push('/application/academic-details')
            }
            setLoading(false)
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
        const resp = await getUserData(userId)

        if (resp?.data?.navigator_state !== 0) {
            if (resp?.data?.navigator_state == 1) {
                router.push("/application/academic-details")
            } else if (resp?.data?.navigator_state == 2) {
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
                whatDefinesYou: resp?.data?.entrepreneur_type ?? '',
                sector: resp?.data?.sector ?? '',
                ventureStage: resp?.data?.venture_stage ?? ''

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
        console.log('getting errror herer------------------')
        if (!userId) {
            console.log('getting errror herer')
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
            <SideBar activeTab={0} handleStepperTab={() => { }} />
            <div className={styles.formContainer}>
                <div className={styles.heading} style={{ marginBottom: "30px", marginTop: "80px" }}>
                    Personal Details  <span>(All fields are mandatory)</span>
                </div>
                <PersonalDetails
                    data={application?.personalDetails}
                    error={applicationDetailsError}
                    handleError={setApplicationDetailsError}
                    onChange={(value: any) => handleChange('personalDetails', value)}
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

export default PersonalDetailsForm