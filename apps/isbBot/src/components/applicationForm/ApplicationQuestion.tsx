import React, { useState } from 'react'
import styles from './index.module.css';
import VideoUpload from '../ui-components/VideoUpload';
import { applicationQuestionErrorType, applicationQuestionType } from '../../types/application-type/applicationInterface';

import { RxDotFilled } from "react-icons/rx";
import { Box } from '@chakra-ui/react';
const guidelines = [
    {
        heading: 'Prepare Your Video:',
        text: 'Ensure your video is clear, well-lit, and the audio is clear, to effectively communicate your message.'
    },
    {
        heading: 'File Format and size:',
        text: "Only MP4 is supported with a maximum size of 100MB."
    },
    {
        heading: 'File Name:',
        text: "The file name should follow the format 'Question1_response.mp4'."
    },
]

const ApplicationQuestion = ({
    data,
    error,
    handleError,
    onChange
}: {
    data: applicationQuestionType,
    error: applicationQuestionErrorType,
    handleError: (arg: applicationQuestionErrorType) => void,
    onChange: (arg: applicationQuestionType) => void
}) => {
    const [uploadStart, setUploadStart] = useState(false)
    const handleChange = (key: string, value: string) => {

        onChange({ ...data, [key]: value })
    }

    return (
        <div className={styles.applicationQuestionContainer}>
            <div style={{ marginRight: '375px' }} >
                <div className={styles.videoInputContainer} style={{ backgroundColor: error?.startup_overview && '#FFE4E4' }}>
                    <div className={styles.videoText} >

                        <div>
                            {"Upload a 2 minute video that explains \"Why am I a potential candidate?\""} <span style={{ color: '#EE574D' }}>*</span>
                        </div>
                    </div>
                    <div>
                        <VideoUpload
                            value={data?.startup_overview}
                            handleError={handleError}
                            onChange={(value) => handleChange('startup_overview', value)}
                            name={'startup_overview'}
                            error={error}
                            maxDuration={180}
                            fileSize={200}
                            uploadStart={uploadStart}
                            handleUploadStart={setUploadStart}
                        />
                    </div>
                </div>
                {/* {
                    error?.startup_overview &&
                    <div style={{ color: 'red', fontSize: '11px' }}>
                        {error?.startup_overview}
                    </div>
                } */}
                <div className={styles.videoInputContainer} style={{ backgroundColor: error?.startup_inspiration && '#FFE4E4' }}>
                    <div className={styles.videoText}>

                        <div>Upload a 5 minute video pitch of your start-up idea?<span style={{ color: '#EE574D' }}>*</span> </div>
                    </div>
                    <div>

                        <VideoUpload
                            value={data?.startup_inspiration}
                            handleError={handleError}
                            onChange={(value) => handleChange('startup_inspiration', value)}
                            name={'startup_inspiration'}
                            error={error}
                            maxDuration={360}
                            fileSize={300}
                            uploadStart={uploadStart}
                            handleUploadStart={setUploadStart}
                        />
                    </div>
                </div>
                <div className={styles.videoInputContainer} style={{ backgroundColor: error.startup_differentiation && '#FFE4E4' }}>
                    <div className={styles.videoText}>
                        <div>Upload a 1 minute video explaining why you need a scholarship and how much financial aid you require? <span style={{ color: '#8896AB' }}>(Optional)</span> </div>
                    </div>
                    <div>
                        <VideoUpload
                            value={data?.startup_differentiation}
                            handleError={handleError}
                            onChange={(value) => handleChange('startup_differentiation', value)}
                            name={'startup_differentiation'}
                            error={error}
                            maxDuration={120}
                            fileSize={200}
                            uploadStart={uploadStart}
                            handleUploadStart={setUploadStart}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.videoGuidelines}>
                <div className={styles.guidelineHeading}>
                    Guidelines for Uploading Video Responses
                </div>
                {guidelines?.map((item) => {
                    return <div key={item.heading} style={{ margin: '0px 30px 30px 30px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#192890',
                            fontFamily: "Roboto-regular",
                            fontSize: '14px',
                            fontWeight: 400,
                        }}><RxDotFilled size={24} color='#2B4078' style={{ marginLeft: "-8px" }} /> {item.heading}</div>
                        <div
                            style={{
                                color: '#5D6F7A',
                                fontFamily: "Roboto-medium",
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '20px',
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: item.text }} />
                        </div>
                    </div>
                })}
                <Box borderRadius={'8px'} position={'absolute'} bottom={'37px'} left={'20px'} right={'20px'} p='20px' background={'#FFFFFF'} >
                    <Box
                        fontSize={'14px'}
                        fontWeight={400}
                        color={'#192890'}
                    >
                        Note
                    </Box>
                    <Box
                        fontSize={'14px'}
                        fontWeight={400}
                        color={'#5D6F7A'}
                        mt='4px'
                    >
                        Depending on internet speed and file size, upload may take time. Ensure a stable connection of 2MBPS and wait for completion.
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default ApplicationQuestion