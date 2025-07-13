/* eslint-disable turbo/no-undeclared-env-vars */
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import LeftSide from '../../components/sign-in/LeftSide'
import Label from '../../components/ui-components/Label'
import InputField from '../../components/ui-components/InputField'
import { MdEdit } from "react-icons/md";
import { isValidMobile, isValidUserRegisteredDetails } from '../../utils/validation'
import OtpInput from '../../components/ui-components/OtpInput'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { CircularProgress, Backdrop } from "@material-ui/core";
import { isUserRegister, OTPVerification, signInUser } from '../../services/signIn'
import RemainingTimeForApplication from '../../components/ui-components/RemainingTimeForApplication'
import ISBLogo from "../../assets/images/isbLogo.png"
import { Box, Button, Show } from '@chakra-ui/react'
import PhoneNumberInput from '../../components/ui-components/PhoneNumberInput'
import { IoIosInformationCircle } from "react-icons/io";
import SignInInstructionPopup from '../../components/sign-in/SignInInstructionPopup'
import ForAnyEnquery from '../../components/ui-components/ForAnyEnquery'
import iviLogo from '../../assets/images/iviLogo1.png'
import SelectTag from '../../components/ui-components/SelectTag'

const getInitialData = () => {
  return {
    firstName: "",
    lastName: "",
    whatDefinesYou: ''
  }
}

const options = [
  {
    label: 'Startup Founder / Co-founder',
    value: 'Startup Founder / Co-founder'
  },
  {
    label: 'Aspiring Entrepreneur',
    value: 'Aspiring Entrepreneur'
  },
]


const SignIn = () => {
  const [sessionId, setSessionId] = useState('')
  const windowWidth = document?.documentElement?.clientWidth;
  const windowHeight = document?.documentElement?.clientHeight;

  const [userDetails, setUserDetails] = useState(getInitialData())
  const [userDetailsError, setUserDetailsError] = useState(getInitialData())
  const [instructionOpen, setInstructionOpen] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otp, setOtp] = useState('')
  const router = useRouter()
  const [apiCallStatus, setApiCallStatus] = useState("idle");
  const [timer, setTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isNotRegistered, setIsNotRegistered] = useState(false)

  const handleOtpSend = async () => {
    setApiCallStatus('processing')
    try {
      const resp = await signInUser(phoneNumber)
      if (resp.session_id) {
        setSessionId(resp.session_id);
        setApiCallStatus('idle');
        setTimer(30);
        setTimerRunning(true);
        setShowOtp(true)
      } else {
        setApiCallStatus('error')
        toast.error('something went wrong please try again!')
      }
    } catch (e) {
      console.log("error while calling send otp api", e)
      toast.error('something went wrong please try again!')
    }
  }

  const handleContinue = async () => {
    if (isValidMobile(phoneNumber, setPhoneError)) {
      if (isNotRegistered) {
        if (isValidUserRegisteredDetails(userDetails, setUserDetailsError)) {
          setIsNotRegistered(false)
          setShowOtp(true)
          handleOtpSend()
        }
      } else {
        setApiCallStatus('processing')
        try {

          const resp = await isUserRegister(phoneNumber);
          console.log('resp----------------------', resp)
          if (resp.status == 204) {
            setIsNotRegistered(true)
            setApiCallStatus('idle');
            return
          }
          setUserDetails({
            firstName: resp?.data?.firstname,
            lastName: resp?.data?.lastname,
            whatDefinesYou: resp.data.entrepreneur_type,
          })
          handleOtpSend()
          setApiCallStatus('idle');
        } catch (e) {
          // @ts-ignore
          if (e?.response?.data?.detail === 'No user found') {
            setIsNotRegistered(true)
            setApiCallStatus('idle');
            return
          }
          setApiCallStatus('error')

          toast.error('something went wrong please try again!')
        }
      }
    }
  }

  const resendOTP = () => {
    handleOtpSend()
  };

  const handlePhoneNumber = (value: string) => {
    if (phoneError) setPhoneError('')
    setPhoneNumber(value)
  }

  const handleUserDetails = (key: string, value: string) => {
    // @ts-ignore
    if (userDetailsError[key]) {
      setUserDetailsError((pre) => {
        return {
          ...pre, [key]: ''
        }
      })
    }
    setUserDetails((pre) => {
      return {
        ...pre, [key]: value
      }
    })
  }

  const handleVerifyOtp = async () => {
    const req = {
      session_id: sessionId,
      otp: otp,
      firstname: userDetails.firstName,
      lastname: userDetails.lastName,
      entrepreneur_type: userDetails.whatDefinesYou
    }

    if (otp.length === 6) {
      try {
        setApiCallStatus('processing')
        const resp = await OTPVerification(req);
        localStorage.setItem('userId', resp?.userID)
        localStorage.setItem('userToken', resp?.token)
        setApiCallStatus('idle');
        toast.success('Login successful!')
        if (windowWidth <= 950) {
          router.push('/login-success')
          return
        }
        router.push('/application/personal-details')
      } catch (e) {
        setApiCallStatus('idle');
        // @ts-ignore
        if (e.response.data.detail === 'Invalid OTP') {
          setOtpError('Invalid OTP')
          toast.error('Invalid OTP!')
          return
        }
        console.log('error while calling verify otp', e)
        toast.error('something went wrong please try again!')
      }
    } else {
      setOtpError('Please enter correct OTP!')
    }

  }

  const handleOtp = (value: string) => {
    if (otpError) setOtpError('');
    setOtp(value);
  };

  const handleEdit = () => {
    setOtp('');
    setIsNotRegistered(false)
    setUserDetails(getInitialData())
    setShowOtp(false)
  }

  const handleKeyChange = (e: any) => {
    if (e.keyCode === 13) {
      handleContinue()
    }
  }

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
  }, [timer, timerRunning]);

  return (
    <div>
      {/* {windowWidth <= 950 && <MobilePopup />} */}
      <SignInInstructionPopup isOpen={instructionOpen} onClose={() => setInstructionOpen(false)} />
      {apiCallStatus === "processing" && (
        <Backdrop open={true} style={{ zIndex: 999, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {/* <Navbar /> */}
      <div className={styles.signInLeftContainer}>

        <SignInInstructionPopup isOpen={instructionOpen} onClose={() => setInstructionOpen(false)} />

        <Box position={'relative'} width={{ md: '100vw', lg: '40vw' }}
          sx={{ overflowY: windowHeight >= 700 ? 'visible' : 'scroll', overflowX: 'hidden' }}
        >
          <Box
            m={{ base: "26px 16px", md: '24px 40px' }}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box

              display={'flex'} alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Box
                width={{ base: '60px', md: '92px' }}
                height={{ base: '32px', md: "50px" }}
                display={'flex'}
                alignItems={'center'}
              >

                <img src={ISBLogo.src} alt="img" />
              </Box>
              <Box
                width={{ base: '196px', md: '246px' }}
                height={{ base: '24px', md: "30px" }}
                display={'flex'}
                alignItems={'center'}
              >

                <img src={iviLogo.src} alt="img" style={{ height: "30px" }} />
              </Box>

            </Box>

          </Box>
          {showOtp == false ?
            <Box
              mx={{ base: "16px", lg: '40px' }}
              maxW={'360px'}
            >
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={{ base: '20px', lg: isNotRegistered ? '0px' : '100px' }}
              >
                <Box
                  fontSize={{ base: "24px", lg: '32px' }}
                  color={'#111111'}
                  fontWeight={600}
                >
                  Lets get started
                </Box>
                <Show below='lg'>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    cursor={'pointer'}
                    gap={'5px'}
                    color={'#676F96'}
                    fontSize={'16px'}
                    lineHeight={'19px'}
                    onClick={() => setInstructionOpen(true)}
                  >
                    <IoIosInformationCircle size={16} color='#676F96' /> Know more
                  </Box>
                </Show>
              </Box>
              <Box
                fontSize={'16px'}
                color={'#868686'}
              >
                Enter WhatsApp number
              </Box>
              <Box mt='16px'>
                <PhoneNumberInput
                  errorMessage={phoneError}
                  value={phoneNumber}
                  onchange={(value) =>
                    handlePhoneNumber(value)
                  }
                  handleKeyChange={handleKeyChange}
                  disabled={isNotRegistered}
                />
              </Box>
              {isNotRegistered && <>
                <Box mt='16px'>
                  <Label text="First Name" points='The first name should be the same as in your CV.' />
                  <InputField
                    placeholder="First Name"
                    errorMessage={userDetailsError.firstName}

                    onChange={(value) => {
                      if (!/\d/.test(value)) {
                        handleUserDetails("firstName", value);
                      }
                    }}
                    value={userDetails.firstName}
                  />
                </Box>
                <Box mt='16px'>
                  <Label text="Last Name" />
                  <InputField
                    placeholder="Last Name"
                    errorMessage={userDetailsError.lastName}
                    onChange={(value) => {
                      if (!/\d/.test(value)) {
                        handleUserDetails("lastName", value);
                      }
                    }}
                    value={userDetails.lastName}
                  />
                </Box>
                <Box mt='16px'>
                  <Label text="What Defines You?" />
                  <SelectTag
                    errorMessage={userDetailsError?.whatDefinesYou}
                    onChange={(value) => {
                      if (typeof value === 'string') {
                        handleUserDetails("whatDefinesYou", value);
                      }
                    }}
                    options={options}
                    placeholder="What Defines You?"
                    value={userDetails?.whatDefinesYou}
                  />
                </Box>
              </>}
              {/* @ts-ignore */}
              <Button
                mt='28px'
                size='small'
                color='#FFFFFF'
                bg='#2A41AB'
                p='11px 65px'
                mb={{ base: '120px', md: windowHeight >= 700 ? '120px' : '30px' }}
                onClick={handleContinue}
              >{isNotRegistered ? "Sign Up" : 'Continue'}</Button>
            </Box> :
            <Box
              mx={{ base: "16px", lg: '40px' }}
              maxW={'360px'}
            >
              <Box
                fontSize={{ base: "24px", lg: '32px' }}
                color={'#111111'}
                fontWeight={600}
                mt={{ base: '40px', md: '100px' }}

              >
                OTP Verification
              </Box>
              <Box
                fontSize={'16px'}
                color={'#868686'}
              >
                Please enter the 6-digit code sent to your WhatsApp.
              </Box>
              <Box
                display={'flex'}
                alignItems={'center'}
                fontSize={'16px'}
                lineHeight={'28px'}
                color={'#2A41AB'}
                gap={'12px'}
                mt='8px'
              >
                {phoneNumber} <MdEdit size={18} style={{ cursor: 'pointer' }} onClick={handleEdit} />
              </Box>

              <Box mt='28px'>
                <OtpInput onChange={handleOtp} placeholder='0' value={otp} errorMessage={otpError} />
              </Box>
              {/* resend otp  */}
              <div
                className={styles.otpResentContainer}
              >
                <div>
                  Didn{`'`}t received OTP?
                </div>
                {timer === 0 ?
                  <div
                    className={styles.resendBtn}
                    onClick={resendOTP}
                  >Resend </div> : <div>Resend ({timer} sec)</div>}
              </div>

              <Button
                mt='28px'
                size='small'
                color='#FFFFFF'
                bg='#2A41AB'
                p='11px 65px'
                mb={{ base: '120px', md: windowHeight >= 700 ? '80px' : '30px' }}
                onClick={handleVerifyOtp}
              >Verify</Button>
            </Box>}
          <Show above="lg">
            <Box
              position={windowHeight >= 700 ? 'absolute' : windowHeight >= 650 && !isNotRegistered ? 'absolute' : 'relative'}
              bottom={'10px'}
              left={{ lg: '10px', xl: '40px' }}
              right={{ lg: '10px', xl: '40px' }}
            >
              <Box
                display={'flex'}

                p='12px 16px'
                alignItems={'center'}
                justifyContent={'space-between'}
                borderRadius={'8px'}
                backgroundColor={'#F6F8FB'}
                maxWidth={'450px'}
                flexWrap={'wrap'}
              >
                <RemainingTimeForApplication />

              </Box>
              <ForAnyEnquery />
            </Box>
          </Show>
        </Box>

        <LeftSide />
      </div>
    </div >
  )
}

export default SignIn