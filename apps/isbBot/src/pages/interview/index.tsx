import React, { useEffect, useRef, useState } from 'react';
import StartInterviewPage from '../../components/interview/StartInterviewPage';
import InterviewScreen from '../../components/interview/InterviewScreen';
import { getUserData, postUserData, postVideoChunk } from '../../services/applicationFormApi';
import { User } from '../../types/application-type/applicationInterface';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Backdrop, CircularProgress } from '@material-ui/core';
import MobilePopup from '../../components/ui-components/MobilePopup';
import InterviewStartPopUP from '../../components/interview/InterviewStartPopUP';
import { initialApplicationState } from '../application/academic-details';

const Interview: React.FC = () => {
    const [isInterviewStart, setIsInterviewStart] = useState<boolean>(false);
    const [screenRecorder, setScreenRecorder] = useState<MediaRecorder | null>(null);
    const [userRecorder, setUserRecorder] = useState<MediaRecorder | null>(null);
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
    const [application, setApplication] = useState<User>(initialApplicationState);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(1);
    const [interviewCompleted, setInterviewCompleted] = useState(false)
    const [validUser, setValidUser] = useState(false)
    const [interviewStarted, setIsInterviewStarted] = useState(false);
    const [askToStart, setAskToStart] = useState(false)
    const apiCallCount = useRef(0)
    const interviewEnd = useRef(false)


    const router = useRouter();
    const { userId } = router.query;
    const windowWidth = document?.documentElement?.clientWidth;

    // screen share error handling
    const handleScreenSharingError = (err: any) => {
        if (!err) {
            toast.error("An unknown error occurred while trying to share your screen. Please refresh the page and try again.");
            return;
        }

        switch (err.name) {
            case "NotAllowedError":
                toast.error(
                    "Screen sharing was blocked. Please allow screen sharing permission in your browser and try again."
                );
                break;
            case "NotFoundError":
                toast.error(
                    "No screen or window was selected. Please choose a screen or application window to share."
                );
                break;
            case "AbortError":
                toast.error(
                    "Screen sharing was cancelled. Please click on a screen or window and confirm to proceed."
                );
                break;
            case "OverconstrainedError":
            case "TypeError":
                toast.error(
                    "Screen sharing failed due to unsupported constraints. Try restarting your browser or selecting a different screen."
                );
                break;
            default:
                // Provide more specific hints based on message content
                if (err.message?.includes("HTTPS")) {
                    toast.error(
                        "Screen sharing only works on secure (HTTPS) connections. Please switch to a secure site."
                    );
                } else if (err.message?.includes("getDisplayMedia")) {
                    toast.error(
                        "Your browser may not support screen sharing. Please update your browser or try a different one (like Chrome or Firefox)."
                    );
                } else {
                    toast.error("An unexpected error occurred: " + err.message);
                }
                break;
        }

        console.error("Screen sharing error:", err);
    };

    // function to handle screen share and record
    const handleScreenRecording = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                toast.error("Your browser may not support screen sharing. Please update your browser or try a different one (like Chrome or Firefox).");
                return;
            }

            const stream = await navigator.mediaDevices.getDisplayMedia({
                // @ts-ignore
                video: { mediaSource: "screen" },
            });

            let displaySurface = stream.getVideoTracks()[0].getSettings().displaySurface;
            if (displaySurface !== "monitor") {
                alert("Selection of entire screen mandatory!");
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                return;

            }
            setIsInterviewStart(true);
            const track = stream.getVideoTracks()[0]; // Assuming there's only one video track

            track.onended = function () {
                // Screen sharing has ended
                setIsInterviewStart(false);
                // You can perform any necessary actions here, such as notifying the user
            };

            const screenRecorderInstance = new MediaRecorder(stream);
            screenRecorderInstance.ondataavailable = (event) => handleDataAvailable(event, 'screen', false);
            screenRecorderInstance.start();
            setScreenRecorder(screenRecorderInstance);
            setScreenStream(stream);

            // Stop and restart recording every 1 minute
            const interval = setInterval(() => {
                if (screenRecorderInstance.state !== "inactive") {
                    screenRecorderInstance.stop(); // Stop current recording
                    screenRecorderInstance.start(); // Restart recording
                }
            }, 900000); // 15 minute interval
        } catch (err: any) {
            console.error("Screen recording error:", err);
            handleScreenSharingError(err)
        }

    }

    // function to handle video record
    const handleVideoRecording = async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });

        const userRecorderInstance = new MediaRecorder(cameraStream);
        userRecorderInstance.ondataavailable = (event) => handleDataAvailable(event, 'video', true);
        userRecorderInstance.start();
        setUserRecorder(userRecorderInstance);

        // Stop and restart recording every 1 minute
        const interval = setInterval(() => {
            if (userRecorderInstance.state !== "inactive") {
                userRecorderInstance.stop(); // Stop current recording
                userRecorderInstance.start(); // Restart recording
            }
        }, 900000); // 15 minute interval
        // setVideoInterval(interval)
    }

    const startRecording = async () => {
        await handleScreenRecording()
        await handleVideoRecording()

    };

    const handleDataAvailable = async (event: BlobEvent, type: string, isNavigate: boolean) => {
        // if (event.data.size > 0) {
        //     const videoBlob = new Blob([event.data], { type: 'video/mp4' });
        //     const formData = new FormData();
        //     formData.append('recording_chunk', videoBlob)
        //     // @ts-ignore
        //     formData.append('candidate_id', userId)
        //     formData.append('recording_type', type)
        //     try {
        //         apiCallCount.current = apiCallCount.current + 1
        //         const resp = await postVideoChunk(formData)
        //         apiCallCount.current = apiCallCount.current - 1
        //         if (interviewEnd.current && isNavigate && apiCallCount.current == 0) {
        //             router.push('/interview-completed')
        //         }

        //     } catch (e) {
        //         console.log('error while calling post video chunk ', e)
        //     }
        // }
    };

    const stopScreenSharing = () => {
        if (screenStream) {
            const tracks = screenStream.getTracks();
            tracks.forEach((track) => track.stop());
            setScreenStream(null);
        }
    };

    const stopRecording = async () => {
        if (screenRecorder && screenRecorder.state === "recording") {
            screenRecorder.stop();
        }

        if (userRecorder && userRecorder.state === "recording") {
            userRecorder.stop();
        }

        interviewEnd.current = true;

        stopScreenSharing();

    };

    const handleStartInterview = () => {
        alert('Please ensure screen sharing is active for smooth communication. Remember to share your entire screen! After screen sharing, do not click on the stop sharing button. Just click on hide.');
        setIsInterviewStarted(true)
        startRecording();
    };

    const handleStopRecording = async () => {
        const userConfirmed = confirm("Do you want to end the test?");
        if (userConfirmed) {
            // setInterviewCompleted(true)
            router.push('/interview-completed')
            // await stopRecording();
        }
    }

    const handleInterviewResume = async () => {
        alert('Please ensure screen sharing is active for smooth communication. Remember to share your entire screen! After screen sharing, do not click on the stop sharing button. Just click on hide.');
        await handleScreenRecording()
    }

    const handleAskToStart = () => {
        setAskToStart(true)
    }

    useEffect(() => {
        if (seconds == 1 && hours === 0 && minutes === 0) {
            setInterviewCompleted(true)
            stopRecording()
        }
    }, [seconds, hours, minutes, router])

    return (
        <>
            {windowWidth <= 950 && <MobilePopup />}
            <InterviewStartPopUP
                isOpen={askToStart}
                onClose={() => setAskToStart(false)}
                handleStartInterview={handleStartInterview}
            />
            {interviewCompleted && <Backdrop open={true} style={{ zIndex: 999, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            <div>
                <div>
                    {isInterviewStart ? (
                        <InterviewScreen
                            userProfile={application?.personalDetails?.profileImage}
                            userName={`${application?.personalDetails?.firstName} ${application?.personalDetails?.lastName}`}
                            handleStopRecording={handleStopRecording}
                            seconds={seconds} handleSeconds={setSeconds}
                            minutes={minutes}
                            handleMinutes={setMinutes}
                            hours={hours}
                            handleHours={setHours}
                        />
                    ) : (
                        <StartInterviewPage
                            handleInterviewStart={interviewStarted ?
                                handleInterviewResume : handleAskToStart}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Interview;
