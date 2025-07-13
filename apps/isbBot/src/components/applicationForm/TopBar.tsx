import { Box } from '@chakra-ui/react'
import React from 'react'
import isbLogoTopBar from '../../assets/svg/isbLogoTopBar.svg'
import iviLogoTopBar from '../../assets/svg/iviLogoTopBar.svg'
const TopBar = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                bgColor: '#FFFFFF',
                display: 'flex',
                justifyContent: "space-between",
                padding: '12px 30px',
                borderBottom: '1px solid #95A9B480'
            }}
        >
            <img src={iviLogoTopBar.src} alt="ivi" />
            <img src={isbLogoTopBar.src} alt="isb" />
        </Box>
    )
}

export default TopBar