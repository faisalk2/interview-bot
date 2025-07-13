import { Box } from '@chakra-ui/react'
import React, { useRef } from 'react'
import Webcam from "react-webcam";
import InterviewLabelValue from './InterviewLabelValue';
import { BsSoundwave } from 'react-icons/bs';
import interveiwEsmagicoLogo from '../../assets/images/interviewEsmagicoLogo.png'
import { CiUser } from 'react-icons/ci';

const VideoScreen = ({ companyLogo, userName }:
    { companyLogo: any, interviewDetails: any, userName: string }) => {
    const webcamRef = useRef(null);
    return (
        <Box
            sx={{

                display: "flex",
                gap: "12px",
                margin: "8px 12px",
                height: "24%",
                flexGrow: "1"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    width: "50%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "0px",
                    alignItems: "flex-start",
                    border: "1px solid #DFE4F2",
                    overflow:'hidden'
                }}
            >
                <Box sx={{
                    width: "350px",
                    height: "170px",
                    overflow: "hidden",
                    borderRadius: "6px"
                }}>
                    <Webcam ref={webcamRef} />
                </Box>
                <Box
                    fontSize='13px'
                    fontWeight={700}
                    color='#0F0F0F'
                    display='flex'
                    alignItems='center'
                    gap='8px'
                    mt='6px'
                    flexWrap={'wrap'}
                >
                    <CiUser color='#0F0F0F' size={14} /> {userName}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "50%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "16px",
                    position: "relative",
                    border: "1px solid #DFE4F2",
                    overflow:"hidden"
                }}
            >
                <Box
                    fontSize='13px'
                    fontWeight={700}
                    color='#0F0F0F'
                >AI Interviewer</Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",

                    }}
                >
                    <Box
                        sx={{
                            width: '100px',
                            height: '100px',
                            overflow: "hidden"
                        }}
                    >
                        <img src={companyLogo.src} alt="logo" style={{width: '100px',
                            height: '100px',}} />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default VideoScreen