import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import Timer from './Timer'
import PauseInterview from './PauseInterview'
import InterviewJobDescriptionPopup from './InterviewJobDescriptionPopup'
// import iviInterviewScreen from '../../assets/svg/chatbotImg.jpg'
import { useChatContext } from '../../context/ChatContext'


const InterviewTopBar = ({
    handleStopRecording,
    seconds,
    handleSeconds,
    minutes,
    handleMinutes,
    hours,
    handleHours,
    logo,
    interviewPause,
    jobTitle,
    jobDescription
}: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const [jdOpen, setJdOpen] = useState(false)
    const [isTimerStop, setIsTimerStop] = useState<boolean>(false)
    const { remainingQuestions } = useChatContext()
    const handlePause = () => {
        handleStopRecording()
    }

    const handleJobListingPopup = () => {
        setJdOpen(true)
    }

    return (
        <Box
            sx={{
                // padding: "12px 12px 12px 12px",
                color: "#F3F3F3",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#F4F8FA",
                borderBottom: "1px solid #F4F4F44D"
            }}
        >
            <InterviewJobDescriptionPopup
                isOpen={jdOpen}
                onClose={() => setJdOpen(false)}
                data={jobDescription}
            />
            <PauseInterview
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                setIsTimerStop={setIsTimerStop}
                isTimerStop={isTimerStop}
                handleStopRecording={handleStopRecording}
                interviewPause={interviewPause}
            />
            <Box sx={{
                display: "flex",
                gap: "40px",
                justifyContent: "space-between",
                alignItems: "center",
                borderRight: '1px solid #E6EBEE',
                width: '27%',
                padding: "12px 20px",
            }}>
                {/* <img src={iviInterviewScreen.src} alt="isb" style={{ width: '50px', height: '50px' }} /> */}

            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: '12px 32px'
                }}
            >
                {/* <Box
                    color='#192890'
                    fontSize={'14px'}
                    fontWeight={700}
                    whiteSpace={'nowrap'}
                >
                    {remainingQuestions?.attempted ?? 0} {remainingQuestions?.attempted <= 1 ? 'question' : 'questions'} attempted | Around {remainingQuestions?.remaining ?? 0} {remainingQuestions?.remaining <= 1 ? 'question' : 'questions'} remain
                </Box> */}
                <Timer
                    seconds={seconds}
                    handleSeconds={handleSeconds}
                    minutes={minutes}
                    handleMinutes={handleMinutes}
                    hours={hours}
                    handleHours={handleHours}
                    isTimerStop={isTimerStop}
                />

                <Button
                    size='small'
                    _hover="#291F29"
                    _active="#291F29"
                    color="#FFFFFF"
                    bg={'#E25247'}
                    sx={{
                        border: '1px solid #E25247',
                        fontSize: "12px",
                        fontWeight: 700
                    }}
                    onClick={handlePause}
                    p={'6px 12px'}
                >
                    Interview End
                </Button>

            </Box>

        </Box>
    )
}

export default InterviewTopBar