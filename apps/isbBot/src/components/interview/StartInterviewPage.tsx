import React, { useEffect } from 'react'
import { WelcomeScreen } from '../welcomeScreen/WelcomeScreen'

const StartInterviewPage = ({ handleInterviewStart }:
  { handleInterviewStart: () => void }) => {
  useEffect(() => {
    const messages = localStorage.getItem("conversation")
    if (!messages) {
      localStorage.setItem("conversation", "[]")
    }
  }, []);
  return (
    <WelcomeScreen
      handleInterviewStart={handleInterviewStart}
      
    />
  )
}

export default StartInterviewPage