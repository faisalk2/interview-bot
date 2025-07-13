import React, { useEffect, useState } from 'react'
import { User } from '../../../types/application-type/applicationInterface';
import SideBar from '../../../components/applicationForm/SideBar';
import styles from '../index.module.css'
import { IoMdArrowBack } from 'react-icons/io';
import { getUserData, postUserData } from '../../../services/applicationFormApi';
import { useRouter } from 'next/router';

import Payment from '../../../components/applicationForm/Payment';
import { Box } from '@chakra-ui/react';
import MobilePopup from '../../../components/ui-components/MobilePopup';
import TopBar from '../../../components/applicationForm/TopBar';

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

const ApplicationPayment = () => {
    const [application, setApplication] = useState<User>(initialApplicationState);
    const router = useRouter();
    const windowWidth = document?.documentElement?.clientWidth;

    const getUserDetails = async (userId: string) => {
        let userName: any = localStorage.getItem('userName');
        userName = userName && userName !== 'undefined' &&
            userName !== undefined && userName !== null &&
            userName !== 'null' ? userName : ''

        const newUserName = userName.trim().split(' ')
        const firstName = newUserName[0] !== 'undefined' ? newUserName[0] : '';
        const lastName = newUserName[1] !== 'undefined' ? newUserName[1] : ''
        const resp = await getUserData(userId)

        if (resp?.data?.navigator_state !== 3) {
            if (resp?.data?.navigator_state == 0) {
                router.push("/application/personal-details")
            } else if (resp?.data?.navigator_state == 1) {
                router.push("/application/academic-details")
            } else if (resp?.data?.navigator_state == 2) {
                router.push("/application/application-questions")
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

        console.log('resp', resp)

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
            <TopBar />
            <SideBar activeTab={3} handleStepperTab={() => { }} />
            <div className={styles.formContainer}>

                <div className={styles.backBtn} style={{ marginTop: "80px" }} >
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
                                navigator_state: 2
                            }
                            const resp2 = await postUserData(request, token, router)
                            console.log("RESP2", resp2)

                            router.push('/application/application-questions')
                        }}
                    />
                    <span>BACK TO PREVIOUS</span>
                </div>
                <div className={styles.heading} style={{ marginBottom: "30px" }}>
                    Payment
                </div>

                <Box
                    display={'flex'}
                    justifyContent={'center'}

                >
                    <Payment
                        personalDetails={application?.personalDetails}
                        handleActiveTab={(value: number) => { }}
                    />
                </Box>
            </div>
        </div>
    )

}

export default ApplicationPayment