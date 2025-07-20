import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import dynamic from "next/dynamic";
import { Box, Spinner } from '@chakra-ui/react';
import companyLogo from '../../assets/images/companyLogo.png'
import InterviewTopBar from './InterviewTopBar';
import VideoScreen from './VideoScreen';
import { useChatContext } from '../../context/ChatContext';
import RenderVoiceRecorder from '../recorder/RenderVoiceRecorder';
import InterviewEndScreen from './InterviewEndScreen';
import toast from 'react-hot-toast';
import axios from 'axios';
import historyBg from '../../assets/images/chatHistoryBg.png'
import { Typewriter } from 'react-simple-typewriter';
import Play from '../../assets/svg/Play.svg';
import Pause from '../../assets/svg/Pause.svg';
import Delete1 from '../../assets/svg/Delete1.svg';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonLoader } from '../SkeletonLoader';
import KeyboardShortcutsPopup from './KeyboardShortcutsPopup';
import msgDeleteIcon from '../../assets/svg/msgDeleteIcon.svg'
const ChatUiWindow = dynamic(
    () => import("../../components/ChatWindow/ChatUiWindow"),
    { ssr: false }
);

const InterviewScreen = ({
    handleStopRecording,
    seconds,
    handleSeconds,
    minutes,
    handleMinutes,
    hours,
    handleHours,
    interviewDetails,
    userName
}: any) => {
    const { messages, sendMessage, setRemainingQuestion, isMsgReceiving, setMessages, startTyping, setStartTyping, setLocale, loading, isChatVisible, setIsChatVisible } = useChatContext()
    const questionAudioRef = useRef(null);
    const [inputAnswer, setInputAnswer] = useState('')
    const [isRecordingStart, setIsRecordingStart] = useState(false);
    const question = messages[messages?.length - 1]?.position === 'left' && messages?.length > 0 ? Array.isArray(messages[messages.length - 1]?.message) ? messages[messages.length - 1]?.message.join(',') : messages[messages.length - 1]?.message : ''
    const [audioLoading, setAudioLoading] = useState(false)
    const [isPlay, setIsPlay] = useState(false)
    const [readyToCall, setReadyToCall] = useState(true)
    const [spacePressedTime, setSpacePressedTime] = useState(0);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const inputRef = useRef(null);
    const inputRef1 = useRef(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [key, setKey] = useState(0);
    const [textareaHeight, setTextareaHeight] = useState(100);
    const answerContainerRef = useRef<HTMLDivElement | null>(null);
    const [answerContainerRows, setAnswerContainerRows] = useState<number>(5);
    const [isShortcutPopupOpen, setIsShortcutPopupOpen] = useState(false);
    const inputAnswerRef = useRef<HTMLTextAreaElement | null>(null);
    const [isShortcutPopupShown, setIsShortcutPopupShown] = useState(false);
    const [isBorderOff, setIsBorderOff] = useState(false);
    console.log('messages==========>>>>>>>>>>>>>>>>>>>>>', messages)

    // const getAudioUrl = async (text: string) => {
    //     try {
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/text-speech/`, { input: text, voice: 'nova' });
    //         setStartTyping(true);
    //         return response?.data;
    //     } catch (e) {
    //         console.log('error while calling t2s api', e)
    //     }
    // }

    // const handleaudio = async (message: string) => {
    //     if (!message?.trim() && !loading) {
    //         toast.error('No Audio');
    //         return;
    //     }

    //     try {
    //         setReadyToCall(true);
    //         setAudioLoading(true)
    //         const resp = await getAudioUrl(message);
    //         console.log('audio url', resp);
    //         setAudioLoading(false)
    //         if (audioRef.current) {
    //             audioRef.current.pause();
    //             audioRef.current.currentTime = 0;
    //         }

    //         const audio = new Audio(resp?.detail);
    //         audioRef.current = audio;

    //         audioRef.current.onloadedmetadata = async () => {
    //             try {
    //                 if (audioRef.current) {
    //                     await audioRef.current.play();
    //                     console.log('Audio is playing');
    //                     setStartTyping(true);
    //                 }
    //             } catch (error) {
    //                 console.error('Error playing audio:', error);
    //                 setReadyToCall(false);
    //             }
    //         };

    //         audioRef.current.onended = () => {
    //             console.log("Audio finished playing");
    //             setReadyToCall(false);
    //         };

    //         audioRef.current.onerror = (error) => {
    //             console.error('Audio error:', error);
    //             setReadyToCall(false);
    //         };
    //     } catch (error) {
    //         console.error('Error fetching audio URL:', error);
    //         setReadyToCall(false);
    //     }
    // };

    const handleEditAnswer = () => {
        setIsShortcutPopupOpen(false);
        inputAnswerRef?.current?.focus();
    }

    const handlePopupSendAnswer = () => {
        setIsShortcutPopupOpen(false);
        handleSend();
    }
    const calculateSkeletonRows = () => {
        if (answerContainerRef) {
            const containerHeight = answerContainerRef?.current?.clientHeight;

            const rowHeight = 25;

            if (containerHeight) {
                setAnswerContainerRows(Math.floor(containerHeight / rowHeight))
            }
            console.log(containerHeight, "containerHeight")
        }
    }

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            console.log('Audio stopped');
            setReadyToCall(false);
        }
    };

    const disableCopyPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log('Copy-paste actions are disabled!');
    };

    const handleSend = () => {
        if (inputAnswer) {
            sendMessage(inputAnswer)
            setInputAnswer('')
        }
    }

    const handleDelete = () => {
        if (inputAnswer) {
            setInputAnswer('')
        }
    }

    const handleInputChange = (value: string) => {
        setInputAnswer(value);
        setIsBorderOff(false)
        handlePause();
    };

    const handleStartRecording = () => {
        // Your existing recording logic...
        stopQuestionAudio();  // Stop audio when recording starts
    };

    const stopQuestionAudio = () => {
        // @ts-ignore
        if (questionAudioRef.current && !questionAudioRef.current.paused) {
            // @ts-ignore
            questionAudioRef.current.pause();  // Pause the audio
            // @ts-ignore
            questionAudioRef.current.currentTime = 0;  // Reset audio to the beginning
        }
    };

    // Handle key down events
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // Allow new line
                event.preventDefault();
                setInputAnswer((prev) => prev + '\n'); // Insert new line
            } else {
                // Send the message
                event.preventDefault();
                if ((messages.length <= 2) && (!isShortcutPopupShown)) {
                    setIsShortcutPopupOpen(true);
                    setIsShortcutPopupShown(true);
                    return;
                }
                handleSend();
            }
        }
    };

    const handleDisableCopyPaste = (e: any) => {
        e.preventDefault();
        alert('Copy-pasting is not allowed.')
        return
    }

    const handleTypewriterEffectDone = () => {

        setIsBorderOff(true); // Mark the typing as done
    };

    useEffect(() => {
        // @ts-ignore
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            // @ts-ignore
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sendMessage, setInputAnswer, inputAnswer]);


    useEffect(() => {
        // Focus the input field when the component mounts
        if (inputRef.current) {
            // @ts-ignore
            inputRef.current.focus();
        }

        setKey(prevKey => prevKey + 1);
    }, [question, loading]);

    useEffect(() => {
        calculateSkeletonRows()
    }, [answerContainerRef.current?.clientHeight]);


    return (
        <>
            <div style={{ backgroundColor: "#2B3F79", width: "100%", height: "20%" }}>
                <InterviewTopBar
                    seconds={seconds}
                    handleSeconds={handleSeconds}
                    minutes={minutes}
                    handleMinutes={handleMinutes}
                    hours={hours}
                    handleHours={handleHours}
                    handleStopRecording={handleStopRecording}
                    logo={interviewDetails?.logo}
                    interviewPause={interviewDetails?.interviewPause}
                    jobTitle={interviewDetails?.applyingFor}
                    jobDescription={interviewDetails?.jobDescription}
                />
                <KeyboardShortcutsPopup
                    isOpen={isShortcutPopupOpen}
                    onClose={() => setIsShortcutPopupOpen(false)}
                    setIsShortcutPopupOpen={setIsShortcutPopupOpen}
                    handleEditAnswer={handleEditAnswer}
                    handleSend={handlePopupSendAnswer}
                />
            </div>
            <div className={styles.interviewScreenContainer}>
                <Box style={{
                    backgroundColor: "#192890",
                    width: isChatVisible ? "27%" : "auto",
                    height: "100%",
                    position: isChatVisible ? "relative" : "absolute",
                    left: isChatVisible ? "auto" : "0"
                }}>
                    <img src={historyBg.src} alt=""
                        style={{
                            position: "absolute",
                            width: "100%",
                            zIndex: 10,
                            left: 0,
                            right: 0,
                            //top: '65px',
                            pointerEvents: 'none'
                        }} />
                    <ChatUiWindow />
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        width: "73%",
                        height: "100vh",
                        paddingBottom: "5%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <VideoScreen
                        companyLogo={companyLogo}
                        interviewDetails={interviewDetails}
                        userName={userName}
                    />
                    {loading ? <Box
                        sx={{
                            borderRadius: "12px",
                            margin: "12px",
                            position: "relative",
                            backgroundColor: "#FBE9DC",
                            padding: "12px"
                        }}
                    >
                        <SkeletonLoader
                            lines={5}
                            widths={["99%", "65%", "75%", "85%", "95%"]}
                            baseColor="#FFFFFF"
                            highlightColor="#36497A"
                            borderRadius="16px"
                        />
                    </Box> : !question?.includes("Please give me feedback") ?
                        <Box
                            sx={{
                                overflow: "auto",
                                margin: "5px 12px 2px 12px",
                                backgroundColor: "#F4F8FA",
                                borderRadius: "12px",
                                height: "18%",
                                flexGrow: "1"
                            }}
                        >
                            <Box
                                sx={{
                                    padding: "16px 16px 16px 16px",
                                    borderRadius: "12px",
                                    overflowY: "auto",
                                    height: "100%"
                                }}
                            >
                                <Box
                                    sx={{
                                        fontSize: "12px",
                                        display: 'flex',
                                        gap: "10px",
                                        opacity: 0.6,
                                        alignItems: 'center',
                                        color: "#0F0F0F"
                                    }}
                                >
                                    {`Here's`} the Question
                                </Box>
                                <Box
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        color: "#0F0F0F",
                                        marginTop: "5px",
                                        maxHeight: inputAnswer ? '100px' : "170px",
                                        overflow: "auto",
                                        lineHeight: '22px',
                                        borderRadius: "12px",
                                        paddingX: "15px",
                                        width: "100%"
                                    }}
                                    onCopy={disableCopyPaste}
                                    onCut={disableCopyPaste}
                                >
                                    {/* {
                                        startTyping && */}
                                        <Typewriter
                                            words={[question]}
                                            key={key}
                                            loop={1}
                                            cursor
                                            cursorStyle="|"
                                            typeSpeed={60}
                                            deleteSpeed={0}
                                            onLoopDone={handleTypewriterEffectDone}
                                            onType={() => setIsBorderOff(false)}
                                        />
                                    {/* } */}
                                </Box>
                            </Box>
                        </Box> : ''}
                    {question && question?.includes("Please give me feedback") ?
                        <InterviewEndScreen handleStopRecording={handleStopRecording} /> :
                        <Box
                            sx={{
                                borderRadius: "12px",
                                height: "30%",
                                flexGrow: "1"
                            }}
                        >
                            <Box
                                sx={{
                                    margin: "12px",
                                    height: "100%"
                                }}
                            >
                                <Box
                                    ref={answerContainerRef}
                                    sx={{
                                        borderRadius: "12px",
                                        backgroundColor: "#245BFF1A",
                                        height: "100%"
                                    }}
                                >
                                    {/* {(messages[messages?.length - 1]?.position === 'left' && !isRecordingStart) || (isRecordingStart && inputAnswer) || (loading) ? */}
                                    <>
                                        <Box
                                            className={isBorderOff ? styles.animatedBorder : ''}
                                            sx={{

                                                backgroundColor: "#F0F6FE",
                                                borderRadius: "12px",
                                                padding: "12px",
                                                height: "100%",
                                                // border: isBorderOn ? '1px solid #5E73DE' : ""
                                            }}>
                                            <Box
                                                sx={{
                                                    color: "#0F0F0F",
                                                    fontSize: "12px",
                                                    display: 'flex',
                                                    justifyContent: ((inputAnswer) || (loading)) ? 'flex-start' : 'center',
                                                    alignItems: 'center',
                                                    gap: "10px",
                                                    opacity: 0.6,

                                                }}
                                            >

                                                <span>{((inputAnswer) && (!loading)) ? "Here’s your answer" : ''} </span>
                                                {(inputAnswer) && (
                                                    <img
                                                        src={msgDeleteIcon.src}
                                                        alt="Delete icon"
                                                        style={{
                                                            height: '32px',
                                                            marginLeft: 'auto',
                                                            display: 'block',
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={handleDelete}
                                                    />
                                                )}
                                            </Box>
                                            {loading && (<SkeletonLoader
                                                lines={answerContainerRows}
                                                widths={["99%", "65%", "75%", "85%", "95%", "99%", "65%", "75%", "85%", "95%", "99%", "65%", "75%", "85%", "95%", "99%", "65%", "75%", "85%", "95%"]}
                                                baseColor="#FFFFFF"
                                                highlightColor="#36497A"
                                                borderRadius="16px"
                                            />)}
                                            {!loading && (<textarea
                                                value={inputAnswer}
                                                onChange={(e) => handleInputChange(e.target.value)}
                                                ref={inputAnswerRef}
                                                placeholder="Here’s your answer"
                                                style={{
                                                    width: '100%',
                                                    height: "85%",
                                                    backgroundColor: '#F0F6FE',
                                                    color: '#0F0F0F',
                                                    fontSize: '13px',
                                                    fontWeight: 400,
                                                    border: 'none',
                                                    outline: 'none',
                                                    resize: 'none',
                                                    overflowWrap: 'break-word',
                                                    wordWrap: 'break-word',
                                                    padding: '10px',
                                                }}
                                                onCopy={handleDisableCopyPaste}
                                                onPaste={handleDisableCopyPaste}
                                                onCut={handleDisableCopyPaste}
                                            />)}
                                        </Box>

                                    </>
                                    {/* :  */}
                                    {/* <>
                                        <Box color='red' bg='#F0F6FE'>
                                            sdfdsfd
                                        </Box>
                                        </>} */}
                                </Box>
                            </Box>
                        </Box>
                    }

                    {/* {question && !loading && !question.includes("Please give me feedback") && <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "16px",
                            marginTop: "20px",
                            zIndex: 1000,  // Ensure the button is above other content
                        }}
                    >
                        <RenderVoiceRecorder
                            inputAnswer={inputAnswer}
                            setInputMsg={handleInputChange}
                            isRecordingStart={isRecordingStart}
                            setIsRecordingStart={setIsRecordingStart}
                            handleSend={handleSend}
                        />
                    </Box>} */}
                </Box>
            </div >
        </>
    )
}

export default InterviewScreen