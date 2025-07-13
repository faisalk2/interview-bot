import React from "react";
import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import InstructionContainer from "./InstructionContainer";
import instructionIcon1 from '../../assets/svg/instructionIcon1.svg'
import instructionIcon2 from '../../assets/svg/instructionIcon2.svg'
import instructionIcon3 from '../../assets/svg/instructionIcon3.svg'
import instructionIcon4 from '../../assets/svg/instructionIcon4.svg'
const instructions = [
    {
        icon: instructionIcon1,
        heading: "Create an account",
        list: [
            {
                list: [
                    'Please note that email will be the standard and official mode of communication',
                    'Please ensure that you provide valid email address only. The system is designed to accept your personal email id as your primary email id',
                    'The email address that you enter in this form will be treated as your primary email address and all communication will be sent to this id',
                    'Please note that the online application system does not allow you to change your primary email address once entered. We regret that we would be unable to accommodate any requests for changes in your email address',
                    'Please add ivi@isb.edu as a trusted source in the anti-spam software of your email. Otherwise, either you will not receive important emails or they will get delivered to your spam/junk folder',
                    'Please access your emails regularly and ensure that your inbox is accessible so as to ensure that all communications made by the ISB reach you in time'

                ]
            }
        ]
    },
    {
        icon: instructionIcon2,
        heading: "Fill out the application",
        list: [
            {
                list: [
                    'You have to enter your full name, contact number with the right country code, date of birth and gender',
                    'Please paste exact LinkedIn URL so that using the link we should be able to view your profile'

                ]
            }
        ]
    },
    {
        icon: instructionIcon3,
        heading: "Upload the relevant document",
        list: [
            {
                subHeading: "1. Upload Photo Instructions",
                list: [
                    'Upload a passport-style photo in JPEG format with dimensions of 2x2 inches (51x51 millimeters) and a maximum file size of 200 KB',
                    'Ensure a plain white background, facing forward with a neutral expression, and no hats or accessories obscuring the face',
                    'Review the photo for clarity, good lighting, and focus before uploading'
                ]
            },
            {
                subHeading: "2. Upload CV Instructions",
                list: [
                    'Please upload your CV in a PDF format with maximum size of 5MB. And the CV should contain the following : Your Education, Skills, Achievements & Awards, Work Experience (if any) and Volunteer Work'
                ]
            },
            {
                subHeading: "3. Upload High School Certificate Instructions",
                list: [
                    'Please upload your High school certificate in a PDF format only with maximum size of 5MB'
                ]
            },
            {
                subHeading: "4. Upload Video Instructions",
                list: [
                    'Please follow all the instructions listed in step 3'
                ]
            }
        ]
    },
    {
        icon: instructionIcon4,
        heading: 'Pay application fee & submit the form',
        list: [
            {
                list: [
                    'By payment of the application fee including of the Government of India mandated taxes, you can submit the application. You will receive email confirming the same'
                ]
            }
        ]
    }
]

const SignInInstructionPopup = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean,
    onClose: () => void,
}) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
            {OverlayOne()}
            {/* @ts-ignore */}
            <ModalContent maxW="1100px" width="90%">
                <ModalCloseButton _hover={{ bg: '#8C8C8C' }} borderRadius={'50%'} bg='#8C8C8C' color={"#FFFFFF"} size={'sm'} />
                <ModalBody>
                    <Box>
                        <Box
                            fontSize={'20px'}
                            color='#333F51'
                            mt='12px'
                            mb='12px'
                        >Instructions
                        </Box>

                        <Box
                            height={'75vh'}
                            overflowY={'scroll'}
                            mb='20px'
                        >
                            {instructions.map((item, i) => {
                                return <InstructionContainer key={i} data={item} />
                            })}
                        </Box>
                    </Box>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SignInInstructionPopup;
