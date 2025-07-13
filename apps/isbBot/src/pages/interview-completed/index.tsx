import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { getInterviewData, getUserData } from '../../services/applicationFormApi';
import { useRouter } from 'next/router';
import AssessmentProgressCard from '../../components/assessmentprogresscard/AssessmentProgressCard';
import LogoutBtn from '../../components/ui-components/LogoutBtn';
import toast from 'react-hot-toast';
import { Box } from '@chakra-ui/react';
import musicIcon from '../../assets/svg/musicIcon.svg'
import Image from 'next/image';
import isbLogo from '../../assets/svg/isbLogoTopBar.svg'
import iviLogo from '../../assets/svg/iviLogoTopBar.svg'

export type InterviewDataType = {
    total: string,
    skipped: string,
    attempted: string,
}

const getEmptyInterviewData = () => {
    return {
        total: '',
        skipped: '',
        attempted: '',
    }
}

const InterviewCompleted = () => {

    const [interviewData, setInterviewData] = useState<InterviewDataType>(getEmptyInterviewData())
    const [timeSpend, setTimeSpend] = useState<string>('')
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear();
        toast.success('sign out successful')
        router.push('/sign-in')
    }

    const getUserDetails = async (userId: string) => {
        const resp = await getUserData(userId)
        setTimeSpend(resp?.data?.interview_time ?? "")
        if (resp?.data?.navigator_state !== 6) {
            if (resp?.data?.navigator_state == 0) {
                router.push("/application/personal-details")
                return
            }
            else if (resp?.data?.navigator_state == 1) {
                router.push(`/application/academic-details`)
                return
            }
            else if (resp?.data?.navigator_state == 2) {
                router.push(`/application/application-questions`)
                return
            }
            else if (resp?.data?.navigator_state == 3) {
                router.push(`/application/payment`)
                return
            }
            else if (resp?.data?.navigator_state == 4) {
                router.push("application-submitted")
            }
            else if (resp?.data?.navigator_state == 5) {
                router.push(`interview/${userId}`)
            }
            else {
                router.push("/sign-in")
            }
        }
        const data = await getInterviewData(userId)
        console.log(data)
        setInterviewData(data)
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId") ?? ""
        getUserDetails(userId)
    }, [])

    return (
        <div className={styles.interviewScreenContainer}>
            <Box

                p='12px 30px'
                borderBottom={'1px solid #F4F4F44D'}
                display={'flex'}
                gap={'40px'}
                justifyContent={'space-between'}
                bgColor={'#FFFFFF'}
                width={'100%'}
            >
                <Image src={iviLogo} alt='logo' />
                <Image src={isbLogo} alt='logo' />
            </Box>
            <Box
                display={'flex'}
                justifyContent={'flex-end'}
                paddingRight={'50px'}
                paddingTop={'20px'}
            >
                <LogoutBtn onClick={handleLogout} />
            </Box>
            <Box
                width={'39%'}
                m={'auto'}
                mt='50px'
            >
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                >
                    <img src={musicIcon.src} alt="icon" />
                </Box>
                <Box
                    fontSize={'24px'}
                    fontWeight={600}
                    color={'#F3F3F3'}
                    mt='25px'
                    textAlign={'center'}
                >
                    Your Interview has ended
                </Box>
                <Box
                    fontSize={'16px'}
                    color='#F3F3F3'
                    mt='14px'
                    mb='70px'
                    textAlign={'center'}
                    opacity={0.6}
                >
                    You have successfully completed the AI interview for the I-Venture Immersive
                    (ivi) programme. Our team will review your interview and notify you of the
                    next steps via email. If you have any questions or encounter any issues,
                    please {`don't`} hesitate to contact our support team at ivi@isb.edu
                </Box>
                <AssessmentProgressCard interviewData={interviewData} timeSpend={timeSpend} />
            </Box>
        </div>
    )
}

export default InterviewCompleted