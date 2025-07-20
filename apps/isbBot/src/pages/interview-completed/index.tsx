import React from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Box } from '@chakra-ui/react';
import musicIcon from '../../assets/svg/musicIcon.svg'
import { Button } from 'chatui';


const InterviewCompleted = () => {
    const router = useRouter()

    return (
        <div className={styles.interviewScreenContainer}>
            <Box
                display={'flex'}
                justifyContent={'flex-end'}
                paddingRight={'50px'}
                paddingTop={'20px'}
            >
            </Box>
            <Box
                width={'39%'}
                m={'auto'}
                mt='150px'
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
                    You have successfully completed the AI interview.
                </Box>
                <Button colorScheme="blue" variant="solid" size="md">
                    Back to interview screen
                </Button>

            </Box>
        </div>
    )
}

export default InterviewCompleted