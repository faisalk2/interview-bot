import Image from 'next/image'
import React from 'react'
import styles from './index.module.css'
import forwordArrowIcon from '../../assets/icons/forwordArrowIcon.svg'
import emailBGImage from '../../assets/icons/emailBgImg.svg'
import emailIcon from '../../assets/icons/emailIcon.svg'
import { MdKeyboardArrowRight, MdOutlineMailOutline } from "react-icons/md";
import { Box } from '@chakra-ui/react'
import { LuPhone } from 'react-icons/lu'
const GetHelp = ({ width = '260px', isSpan = false }) => {

    const handleEmail = () => {
        const emailAddress = "mailto:ivi@isb.edu";
        window.location.href = emailAddress;
    }

    return (
        <div
            style={{
                position: 'relative',
                padding: '16px 14px',
                borderRadius: '12px',
                border: "2px solid #2B407814",
                overflow: 'hidden',
                background: "#4453A1",
                width: width,
                marginTop: "20px"
            }}
        >
            <Box
                sx={{
                    fontSize: {
                        lg: '12px',
                        xl: '14px',
                    },
                    color: '#FFFFFF',
                }}
            >
                <Box sx={{
                    fontWeight: 400,
                    mb: '8px'
                }} >
                    For any queries, reach out to us at
                </Box>
                <Box
                    sx={{ display: "flex", alignItems: 'center', gap: '6px', mb: '8px', fontWeight: 500 }}
                >
                    <MdOutlineMailOutline size={14} /> <a href="mailto:ivi@isb.edu">ivi@isb.edu</a>
                </Box>
                <Box
                    sx={{ display: "flex", alignItems: 'center', gap: '6px', mb: '8px', fontWeight: 500 }}
                >
                    <LuPhone size={14} />9966444752  {isSpan && <span style={{
                        fontWeight: 400,
                    }} >
                        Monday - Friday (9:00 AM - 7:00 PM)
                    </span>}
                </Box>
                {!isSpan && <Box style={{
                    fontWeight: 400,
                    marginBottom: '8px',
                }} >
                    Monday - Friday (9:00 AM - 7:00 PM)
                </Box>}

            </Box>
        </div>
    )
}

export default GetHelp