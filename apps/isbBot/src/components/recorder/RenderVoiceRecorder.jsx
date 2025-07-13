import { useState, useRef, useEffect } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";
import { CiMicrophoneOn } from "react-icons/ci";
import Delete from "../../assets/svg/Delete.svg";
import EllipseInterview from "../../assets/svg/EllipseInterview.svg";
import Stopbutton from "../../assets/svg/Stopbutton.svg";
import { BsSend } from "react-icons/bs";
import { useChatContext } from "../../context/ChatContext";
import Lottie from "lottie-react";
import voiceAnimation from "../../assets/animations/voiceAnimation.json"
const RenderVoiceRecorder = ({
  setInputMsg,
  inputAnswer,
  isRecordingStart,
  setIsRecordingStart,
  handleSend,
}) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const mediaRecorderRef = useRef(null); // Use ref to keep track of mediaRecorder
  const recordingStartRef = useRef(isRecordingStart); // Ref to track the recording state
  const [apiCallStatus, setApiCallStatus] = useState("ideal");
  const audioRef = (useRef < HTMLAudioElement) | (null > null);

  const {
    sendMessage,
  } = useChatContext();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          stopTimer();
          setApiCallStatus("processing");
          handleTranscription(event.data);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder; // Set recorder to ref
    } catch (error) {
      setApiCallStatus("error");
      toast.error("Could not access microphone");
      console.error("Error accessing microphone:", error);
    }
  };

  const handleSend2 = () => {
    if (inputAnswer) {
      sendMessage(inputAnswer);
      //setInputAnswer('')
    }
  };

  const handleDelete = () => {
    if (inputAnswer) {
      setInputAnswer("");
    }
  };

  const handleInputChange1 = () => {
    //stopQuestionAudio();
    handlePause();
  };

  const handlePause = () => {
    // console.log("Pratik" + audioRef);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopRecording = async () => {
    setIsRecordingStart(false);
    recordingStartRef.current = false;
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setSeconds(0);
    }
  };

  const handleStartRecording = () => {
    startRecording();

    startTimer();
    setIsRecordingStart(true);
    recordingStartRef.current = true;
  };

  const handleKeyDown = (event) => {
    // Check if Shift + Space is pressed
    if (event && event.code === "Space" && event.shiftKey) {
      event.preventDefault(); // Prevent default space action

      // Toggle recording based on the current state
      if (recordingStartRef.current) {
        stopRecording(); // Stop the recording if it's already started
      } else {
        handleStartRecording(); // Start recording if not already recording
      }
    }
  };

  // Use effect to add and remove event listener for keydown
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputAnswer]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputAnswer]);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleTranscription = async (blobData) => {
    if (!blobData) {
      toast.error("No audio recorded");
      return;
    }

    const formData = new FormData();
    formData.append("file", blobData, "audio.wav");

    try {
      const resp = await axios.post(`/api/speechToText`, formData);
      setInputMsg((prev) => prev + resp?.data?.message?.text);
      setApiCallStatus("success");
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast.error("Error: Failed to transcribe audio");
      setApiCallStatus("error");
    }
  };

  const handledeleteAudioRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopTimer();
    setSeconds(0);
    // startRecording();
    // startTimer();
    setIsRecordingStart(false);
    recordingStartRef.current = false;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <>
      {apiCallStatus === "processing" && (
        <Backdrop open={true} style={{ zIndex: 999, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {isRecordingStart ? (
        <>
          {inputAnswer ? (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              marginLeft="20px"
              width={"100%"}
              padding={"20px 20px"}
            >
              <Box
                sx={{
                  color: "#0F0F0F",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                  opacity: 0.4,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  gap: "10px",
                  width: "33%",
                }}
              >
                {`We'll`} transcribe your answer once you stop recording
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={"33%"}
              >
                <Box>
                  <Button
                    size="small"
                    bg="#282C36"
                    _hover="#282C36"
                    marginRight={"20px"}
                    _active="#282C36"
                    borderRadius="40px"
                    color="#EB7E76"
                    marginBottom="20px"
                    onClick={handledeleteAudioRecording}
                  >
                    {<img src={Delete.src} alt="icon" />}
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "0px",
                  }}
                >
                  <Button
                    size="small"
                    bg="#2B3F79"
                    _hover={{ backgroundColor: "#2B3F79" }}
                    _active={{ backgroundColor: "#2B3F79" }}
                    borderRadius="40px"
                    color="#F3F3F3"
                    fontSize="12px"
                    fontWeight={600}
                    onClick={stopRecording}
                  >
                    <Lottie
                      animationData={voiceAnimation}
                      loop={true}
                      autoPlay={true}
                      style={{ height: "45px", marginLeft: "10px" }}
                    />
                    <img
                      src={EllipseInterview.src}
                      alt="icon"
                      // style={{ marginLeft: "20px" }}
                    />
                    <Box style={{ marginLeft: "10px" }}>
                      {formatTime(seconds)}
                    </Box>
                    <img
                      src={Stopbutton.src}
                      alt="icon"
                      style={{ marginLeft: "20px" }}
                    />
                  </Button>

                  <Box
                    sx={{
                      fontFamily: "PT Sans",
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "12.94px",
                      textAlign: "center",
                      color: "#0F0F0F !important",
                      marginTop: "10px",
                    }}
                  >
                    Stop recording [shift + space]
                  </Box>
                </Box>
              </Box>
              <Box></Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                padding: "20px 20px",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box
                  sx={{
                    color: "#0F0F0F",
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    opacity: 0.4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "10px",
                    width: "33%",
                    justifyContent: "flex-start",
                  }}
                >
                  {`We'll`} transcribe your answer once you stop recording
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "33%",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      size="small"
                      bg="#2B3F79"
                      _hover="#282C36"
                      _active="#282C36"
                      borderRadius="40px"
                      color="#EB7E76"
                      marginRight={"20px"}
                      onClick={() => {
                        handledeleteAudioRecording();
                      }}
                    >
                      {<img src={Delete.src} alt="icon" />}
                    </Button>
                    <Button
                      size="small"
                      bg="#245BFF"
                      _hover={{ backgroundColor: "#245BFF" }}
                      _active={{ backgroundColor: "#245BFF" }}
                      borderRadius="40px"
                      color="#F3F3F3"
                      fontSize="12px"
                      fontWeight={600}
                      onClick={stopRecording}
                    >
                      <Lottie
                        animationData={voiceAnimation}
                        loop={true}
                        autoPlay={true}
                        style={{ height: "45px", marginLeft: "10px" }}
                      />
                      <img
                        src={EllipseInterview.src}
                        alt="icon"
                      />
                      <Box style={{ marginLeft: "10px" }}>
                        {formatTime(seconds)}
                      </Box>
                      <img
                        src={Stopbutton.src}
                        alt="icon"
                        style={{ marginLeft: "20px" }}
                      />
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "PT Sans",
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "12.94px",
                      textAlign: "center",
                      color: "#F3F3F3 !important",
                      marginTop: "10px",
                      marginLeft: "80px",
                    }}
                  >
                    Stop recording [space]
                  </Box>
                </Box>
                {/* <Box>sdfasdf</Box> */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "100px",
                }}
              >
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="12px"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 15px 0px 10px",
              alignItems: "center",
            }}
          >
            {!isRecordingStart && (
              <Box
                sx={{
                  color: "#0F0F0F",
                  fontSize: "14px",
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontWeight: "400",
                }}
              >
                To start recording: [shift+space]
                <br />
                For a new line : [shift+enter]
              </Box>
            )}
            {/* Microphone Button */}
            <Box>
              <Button
                size="small"
                _hover={"#2B3F79"}
                padding="8px 55px"
                marginTop={"5px"}
                height={inputAnswer ? "30px" : "40px"}
                _active={"#2B3F79"}
                borderRadius={"40px"}
                color={"#F3F3F3"}
                background={"#245BFF"}
                fontSize="16px"
                fontWeight={400}
                onClick={() => {
                  handleStartRecording();
                  handleInputChange1();
                  handleKeyDown();
                }}
                sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CiMicrophoneOn size={22} color="#F3F3F3" />
              </Button>

              {/* Text below the microphone button */}
              <Box
                sx={{
                  color: "#0F0F0F",
                  fontSize: "10px",
                  textAlign: "center",
                  marginTop: "10px",
                  fontWeight: "400",
                }}
              >
                Press mic to record
              </Box>
            </Box>
            {!inputAnswer && (
              <Box
                sx={{
                  fontWeight: "400",
                  fontSizeL: "18px",
                  color: "#0F0F0F",
                }}
              >
                Either type or record your answer
              </Box>
            )}

            {inputAnswer && !isRecordingStart && (
              <Box
              >
                <Button
                  size="small"
                  bg="#34C759"
                  _hover="#2877EE"
                  padding="6px 50px"
                  _active={"#2877EE"}
                  borderRadius={"40px"}
                  color={"#F3F3F3"}
                  fontSize="14px"
                  fontWeight={600}
                  onClick={handleSend}
                >
                  <BsSend size={18} color="#F3F3F3" />
                </Button>
                <Box
                  sx={{
                    color: "#0F0F0F",
                    fontSize: "10px",
                    marginTop: "12px",
                    textAlign: "center",
                  }}
                >
                  {`[Enter]`} to Send
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RenderVoiceRecorder;
