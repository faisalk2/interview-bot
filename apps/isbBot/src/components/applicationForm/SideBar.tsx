import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import isbIcon from '../../assets/icons/isbWhiteIcon.svg'
import sideBarImg from '../../assets/images/sideBarImage.png'
import forwordArrowIcon from '../../assets/icons/forwordArrowIcon.svg'
import emailBGImage from '../../assets/images/emailBGImg.png'
import emailIcon from '../../assets/images/emailIcon.png'
import FormStepper from './FormStepper'
import LogoutBtn from '../ui-components/LogoutBtn'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import GetHelp from './GetHelp'
import { Box } from '@chakra-ui/react'

const SideBar = ({ activeTab, handleStepperTab }: { activeTab: number, handleStepperTab?: (value: number) => void }) => {
  const router = useRouter()


  const handleLogout = () => {
    localStorage.clear();
    toast.success('sign out successful')
    router.push('/sign-in')
  }

  return (
    <div className={styles.sideBar} >
      <div className={styles.sideBarImage}>
        <FormStepper activeStep={activeTab} setActiveStep={handleStepperTab} />
        <div style={{ position:'fixed',bottom:"20px",left:'20px' }}>
          <Box
          display='flex'
          justifyContent={'center'}
          >
            <LogoutBtn onClick={handleLogout} />
          </Box>
        </div>
      </div>
    </div>
  )
}

export default SideBar