import Image from 'next/image'
import React from 'react'
import styles from './index.module.css'
import forwordArrowIcon from '../../assets/icons/forwordArrowIcon.svg'
import emailBGImage from '../../assets/svg/emailBgImgBlue.svg'
import emailIcon from '../../assets/svg/emailIconBlue.svg'
import { MdKeyboardArrowRight } from "react-icons/md";
import { Box } from '@chakra-ui/react'
import GetHelp from '../applicationForm/GetHelp'
const ForAnyHelp = () => {

    const handleEmail = () => {
        const emailAddress = "mailto:ivi@isb.edu";
        window.location.href = emailAddress;
    }

    return (
        <GetHelp />
    )
}

export default ForAnyHelp