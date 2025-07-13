import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styles from './index.module.css'
import InstructionGuideLine from '../welcomeScreen/InstructionGuideLine'

const InstructionPopUp = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
            {OverlayOne()}
             {/* @ts-ignore */}
            <ModalContent>
                <ModalCloseButton />
                <ModalBody >
                    <div className={styles.instruction}>Instructions</div>
                    <InstructionGuideLine />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default InstructionPopUp