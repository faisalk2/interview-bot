import React from 'react'
import ISBLogo from "../../assets/images/isbLogo.png"
import iviLogo from '../../assets/images/iviLogo1.png'
import { Box } from '@chakra-ui/react'
import loginSuccessLogo from '../../assets/icons/loginSuccessLogo.svg'
const index = () => {
    return (
        <div>
            <Box
                m={{ base: "26px 16px", md: '24px 40px' }}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box

                    display={'flex'} alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'100%'}
                >
                    <Box
                        width={{ base: '60px', md: '92px' }}
                        height={{ base: '32px', md: "50px" }}
                        display={'flex'}
                        alignItems={'center'}
                    >

                        <img src={ISBLogo.src} alt="img" />
                    </Box>
                    <Box
                        width={{ base: '196px', md: '246px' }}
                        height={{ base: '24px', md: "30px" }}
                        display={'flex'}
                        alignItems={'center'}
                    >

                        <img src={iviLogo.src} alt="img" style={{ height: "30px" }} />
                    </Box>


                </Box>

            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
                mt='100px'
            >

                <img src={loginSuccessLogo.src} alt="icon" />

            </Box>
            <Box
                mt='42px'
            >
                <Box
                    textAlign={'center'}
                    fontSize={'24px'}
                    color='#111111'
                    fontWeight={700}

                >
                    Login Successful
                </Box>
                <Box

                    color={'#868686'}
                    fontSize={'16px'}
                    fontWeight={500}
                    lineHeight={'28px'}
                    textAlign={'center'}
                    mt='16px'
                >
                    To proceed with your application, kindly access the same link on a desktop or PC.
                </Box>
            </Box>
        </div>
    )
}

export default index