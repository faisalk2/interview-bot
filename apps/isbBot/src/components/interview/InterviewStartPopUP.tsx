import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styles from './index.module.css'

const InterviewStartPopUP = ({ isOpen, onClose, handleStartInterview }: { isOpen: boolean, onClose: () => void, handleStartInterview: () => void }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const handleReady = () => {
    onClose();
    handleStartInterview();
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
      {OverlayOne()}
      {/* @ts-ignore */}
      <ModalContent>
        <ModalCloseButton />
        <ModalBody padding={30} >
          <div className={styles.popUpHeading}>Get Ready For Your AI Interview!</div>
          <div className={styles.popUpText}>
            Are you prepared to begin the test? Please note that once you start, you would not be able to pause or navigate away. Ensure you are in a quiet place and ready to focus. Good luck!
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onClose} width={170} colorScheme='#2B4078' color={'#245bff'} variant='outline'>
              Not now!
            </Button>
            <Button onClick={handleReady} width={170} colorScheme='#2B4078' color={'#FFFFFF'} background={'#245bff'} variant='solid'>
              Yes, I am ready
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InterviewStartPopUP