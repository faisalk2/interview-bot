import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import interviewIcon from '../../assets/images/interviewCompleteGif.gif'
const InterviewEndScreen = ({ handleStopRecording }:
    { handleStopRecording: (interviewEndState: string) => void }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: 'center',
                // height:"57vh",
                height: "54%",
                overflow: "auto"
            }}
        >
            <Box sx={{
                height: "50px",
                width: "50px",
                overflow: "hidden",
                marginTop: "50px"
            }}>
                <img src={interviewIcon.src} alt="icon" />
            </Box>
            <Box
                sx={{
                    color: '#0F0F0F',
                    fontSize: "24px",
                    fontWeight: 600,
                    marginTop: '24px'
                }}
            >
                Congratulations!!</Box>


            <Box
                sx={{
                    color: '#0F0F0F',
                    fontSize: "16px",
                    fontWeight: 400,
                    marginTop: '24px'
                }}
            >
                Your interview is complete. I hope you had fun, because I sure did.</Box>
            <Box
                sx={{
                    color: '#0F0F0F',
                    fontSize: "16px",
                    fontWeight: 400,
                    marginTop: '10px'
                }}
            >
                Could you please share your experience by providing some{' '}
                <a href='https://iventureisb.accubate.app/ext/survey/426/apply' target="_blank" rel="noreferrer" style={{ color: 'blue' }}>feedback</a>
                . Your insights are greatly appreciated!</Box>

            {/* @ts-ignore */}
            <Button
                color="#F3F3F3"
                bg='#6DAA39'
                _hover='#6DAA39'
                _active='#6DAA39'
                fontSize={'16px'}
                fontWeight={600}
                mt='50px'
                borderRadius='40px'
                padding='0px 40px'
                onClick={() => handleStopRecording("Interview Completed")}
            >
                End Interview</Button>
        </Box >
    )
}

export default InterviewEndScreen