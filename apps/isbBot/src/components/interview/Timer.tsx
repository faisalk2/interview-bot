import React, { useEffect, useRef } from 'react';
import styles from './index.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';
import { postUserData } from '../../services/applicationFormApi';
import { PiTimerLight } from "react-icons/pi";

function Timer({ seconds,
  handleSeconds,
  minutes,
  handleMinutes,
  hours,
  handleHours,
  isTimerStop }: any) {

  const router = useRouter();
  const { candidate_id } = router.query;

  function isEven(number: number) {
    return number % 2 === 0;
  }

  // useEffect(() => {
  //   if (isTimerStop) return
  //   const interval = setInterval(() => {
  //     if (hours === 0 && minutes === 0 && seconds === 0) {
  //       clearInterval(interval);
  //       return;
  //     }

  //     if (seconds > 0) {
  //       handleSeconds((prevSeconds: number) => prevSeconds - 1);
  //     } else {
  //       if (minutes > 0) {
  //         handleMinutes((prevMinutes: number) => prevMinutes - 1);
  //         handleSeconds(59);
  //       } else {
  //         if (hours > 0) {
  //           handleHours((prevHours: number) => prevHours - 1);
  //           handleMinutes(59);
  //           handleSeconds(59);
  //         }
  //       }
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [hours, minutes, seconds, isTimerStop]);


  const getAudioUrl = async (text: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_INTERVIEW_BACKEND_BASE_URL}/api/ai/text-speech/`, { input: text, voice: 'nova' });

      return response?.data;
    } catch (e) {
      console.log('error while calling t2s api', e)
    }
  }

  const handleEndIndication = async (message: string) => {

    const resp = await getAudioUrl(message);
    console.log('audio url', resp);

    // Create a new Audio object with the URL
    const audio = new Audio(resp?.detail);
    await audio.play();
  }

  // useEffect(() => {

  //   if (isEven(minutes)) {
  //     handleTimer()
  //   }

  // }, [minutes]);

  // useEffect(() => {
  //   // Check if 10 minutes are remaining
  //   if (hours === 0 && minutes === 10 && seconds === 4) {
  //     const message = 'Only 10 minutes remain. Please begin concluding your response to ensure you finish on time. Stay focused and concise'
  //     handleEndIndication(message)
  //   }

  //   if (hours === 0 && minutes === 20 && seconds === 4) {
  //     const message = 'Only 20 minutes remain. Please begin concluding your response to ensure you finish on time. Stay focused and concise'
  //     handleEndIndication(message)
  //   }
  // }, [minutes, seconds, hours]);


  return (
    <div className={styles.clock} style={{ backgroundColor: '#DAE3FF', borderRadius: "7px" }}  >
      {/* Time Elapsed */}
      <span style={{
        fontSize: "14px",
        fontWeight: 700,
        display: 'flex',
        borderRadius: "4px",
        justifyContent: "space-around",
        alignItems: "end",
      }}>
        {/* <img src={timer.src} alt='icon' /> */}
        <PiTimerLight size={18} color="#192890" />
        <div style={{ marginTop: '5px' }}>
          <span style={{ color: "#192890", marginLeft: "10px" }}>
            {String(hours).padStart(2, '0')}:
          </span>
          <span style={{ color: "#192890" }}>
            {String(minutes).padStart(2, '0')}:
          </span>
          <span style={{ color: "#192890" }}>
            {String(seconds).padStart(2, '0')}
          </span>
        </div>
      </span>
    </div>


  );
}

export default Timer;
