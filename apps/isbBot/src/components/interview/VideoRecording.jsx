import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Timer from "./Timer";
import styles from "./index.module.css";
import ProgressBar from "./ProgressBar";
import { useChatContext } from "../../context/ChatContext";
import { getUserData } from "../../services/applicationFormApi";

const VideoRecording = ({
  handleStopRecording,
  seconds,
  handleSeconds,
  minutes,
  handleMinutes,
  hours,
  handleHours,
}) => {
  const webcamRef = useRef(null);
  const { interviewPercentage, setInterviewPercentage } = useChatContext();

  const getUserDetails = async (userId) => {
    const resp = await getUserData(userId);

    setInterviewPercentage(resp?.data?.state_percentage);
    console.log("PERCENTAGE", resp?.data?.state_percentage);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    getUserDetails(storedUserId);
  }, []);

  return (
    <div style={{textAlign: "center", margin: "0px 30px 30px 30px" }}>
      <div
        style={{
          width: "100%",
          height: "135px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Webcam ref={webcamRef} />
      </div>
      <Timer
        seconds={seconds}
        handleSeconds={handleSeconds}
        minutes={minutes}
        handleMinutes={handleMinutes}
        hours={hours}
        handleHours={handleHours}
      />
      <div>
        <div className={styles.interviewPerLabel}>
          Interview completion percentage
        </div>
        <ProgressBar interviewPercentage={interviewPercentage} />
      </div>

      <div>
        <button className={styles.endTestBtn} onClick={handleStopRecording}>
          End Test
        </button>
      </div>

      {/* Screen Share Preview */}
      {/* <div
        style={{
          marginTop: "20px",
          width: "240px",
          height: "135px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video ref={screenVideo} controls width="400"></video>
      </div> */}

      {/* User Video Preview */}
      {/* <div
        style={{
          marginTop: "20px",
          width: "240px",
          height: "135px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video ref={userVideo} controls width="400"></video>
      </div> */}
    </div>
  );
};

export default VideoRecording;
