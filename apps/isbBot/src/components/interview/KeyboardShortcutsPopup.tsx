import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import cautionIcon from "../../assets/svg/CautionIcon.svg"

const OverlayOne = () => (
    <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
    />
)

const KeyboardShortcutsPopup = ({ isOpen, onClose, setIsShortcutPopupOpen, handleEditAnswer, handleSend }:
    {
        isOpen: boolean,
        onClose: () => void,
        setIsShortcutPopupOpen: (isOpen: boolean) => void,
        handleEditAnswer: () => void,
        handleSend: () => void,
    }) => {
    const router = useRouter();

    const handleClose = () => {
        // @ts-ignore
        setIsShortcutPopupOpen(false);
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
            {OverlayOne()}
            {/* @ts-ignore */}
            <ModalContent sx={{ borderRadius: "16px" }}>
                <ModalCloseButton onClick={handleClose} />
                <ModalBody padding={30} sx={{ backgroundColor: "#FFFFFF", borderRadius: "12px" }} >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <img src={cautionIcon.src} alt="icon" style={{ width: '66px', height: '66px' }} />
                    </Box>
                    <Box
                        sx={{
                            fontSize: "24px",
                            fontWeight: 600,
                            color: "#2E3B42",
                            textAlign: "center",
                            marginTop: "25px"
                        }}
                    >
                        Hey just a reminder!
                    </Box>
                    <Box
                        sx={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#5D6F7A",
                            textAlign: "center",
                            marginTop: "14px",
                            opacity: 0.6

                        }}
                    >
                        {`[enter] is to send the answer | [shift+enter] is for a new line`}
                    </Box>
                    <Box
                        sx={{
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#F3F3F3",
                            textAlign: "center",
                            marginTop: "14px",
                            // opacity: isTimerStop ? 1 : 0.4
                        }}
                    >
                        {/* {formatTime()} */}
                    </Box>
                    <div className={styles.buttonContainer} style={{ marginTop: "40px" }}>
                        <Button
                            size='small'
                            onClick={handleEditAnswer}
                            _hover={{ bg: '#FFFFFF' }}
                            _active={{ bg: '#FFFFFF' }}
                            color={'#245BFF'}
                            bg={'#FFFFFF'}
                            fontSize={'16px'}
                            border='1px solid #245BFF'
                            fontWeight={500}
                            px={'30px'}
                            py='10px'
                        >
                            Edit Answer
                        </Button>
                        <Button
                            size='small'
                            onClick={handleSend}
                            _hover={{ bg: '#245BFF' }}
                            _active={{ bg: '#245BFF' }}
                            color={'#F3F3F3'}
                            bg={'#245BFF'}
                            variant='solid'
                            fontSize={'16px'}
                            fontWeight={500}
                            px={'27px'}
                            py='10px'
                        >
                            Send Answer
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default KeyboardShortcutsPopup