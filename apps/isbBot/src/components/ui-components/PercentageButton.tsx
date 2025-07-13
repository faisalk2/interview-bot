import React, { useState } from 'react';
import styles from './index.module.css';
import videoIcon from '../../assets/icons/gVideoIcon.svg'
import Image from 'next/image';
import { Box, Spinner } from '@chakra-ui/react'
import { IoVideocamOutline } from 'react-icons/io5';


const PercentageButton = ({ isVideoIcon = false, width = '220px', progress, loadingText = "Uploading", showPercentage = true }:
  { isVideoIcon?: boolean, width: string, progress: number, loadingText?: string, showPercentage?: boolean }) => {
  const barStyle = {
    width: `${progress}%`
  };



  return (
    <button className={styles.percentageButton} style={{ width: width }} >
      <div className={styles.percentageBar} style={barStyle}></div>

      <div className={styles.percentageText}
        style={{
          top: '40%',
          left: isVideoIcon ? '8%' : '22%',
          transform: 'translate(2%, -40%)',
          position: 'absolute'
        }}
      >
        {isVideoIcon && <IoVideocamOutline size={18} style={{ marginBottom: "-3px" }} />}
        <Box>
          {loadingText} {showPercentage && `${progress}%`} <span style={{ marginLeft: "10px" }}>
            {/* @ts-ignore */}
            <Spinner size='sm' color='#245BFF' marginBottom={'-3px'} />
          </span>
        </Box>
      </div>
    </button>
  );
};

export default PercentageButton;