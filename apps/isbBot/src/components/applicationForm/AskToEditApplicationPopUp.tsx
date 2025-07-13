import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styles from './index.module.css'

const AskToEditApplicationPopUp = ({ isOpen, onClose, handlePayment,handleActiveTab }: { isOpen: boolean, onClose: () => void, handlePayment: () => void,handleActiveTab:(arg:number)=>void }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const handleReady = () => {
        onClose();
        handlePayment()
    }

    const handleEdit=()=>{
        onClose();
        handleActiveTab(0)
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
            {OverlayOne()}
            {/* @ts-ignore */}
            <ModalContent>
                <ModalCloseButton />
                <ModalBody padding={30} >
                    <div className={styles.popUpHeading}>Confirm Payment!</div>
                    <div className={styles.popUpText}>
                     {`Please take a moment to review your application details. Once the payment is confirmed, you won't be able to make any further changes to the application.`}</div>
                    <div className={styles.buttonContainer}>
                        <Button onClick={handleEdit} width={170} colorScheme='#2B4078' color={'#2B4078'} variant='outline'>
                            Edit
                        </Button>
                        <Button onClick={handleReady} width={170} colorScheme='#2B4078' color={'#FFFFFF'} background={'#2B4078'} variant='solid'>
                            Confirm Payment
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AskToEditApplicationPopUp