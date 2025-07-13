import Image from "next/image";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import backgroundImage from "../../assets/images/backgroundImage1.png";
import ReactCarousel from "../../components/carousel";

import application_process from "../../assets/images/applicationJourney.png";
import warningSvg from "../../assets/svg/warning.svg";
import admission_process from "../../assets/images/admission_process.png";
import { Modal } from "antd";
import InstructionsHeader from "../instructions/InstructionsHeader";
import contactsvg from "../../assets/svg/contact.svg";
import { instructionData } from "../../utils/instructionData";
import InstructionLists from "../instructions/InstructionLists";
import { IoWarningOutline } from "react-icons/io5";
import reminderIcon from '../../assets/svg/reminderIcon.svg'
import loginBg from '../../assets/images/loginBg.png'
import { Box, Show } from "@chakra-ui/react";
import applicationSteps from '../../assets/images/applicationSteps.png'
import applicationProcess from '../../assets/images/applicationProcess.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import isbSliderImg1 from '../../assets/images/isbSliderImg1.png'
import isbSliderImg2 from '../../assets/images/isbSliderImg2.png'
import rightArrow from '../../assets/svg/rightArrow.svg'
import leftArrow from '../../assets/svg/leftArrow.svg'
import RemainingTimeForApplication from "../ui-components/RemainingTimeForApplication";
import SignInInstructionPopup from "./SignInInstructionPopup";
import ForAnyEnquery from "../ui-components/ForAnyEnquery";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2.1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

interface CarouseCardHeaderProps {
  knowmore?: boolean;
  handleKnowMore?: () => void;
  text?: string;
}

const CarouseCardHeader: React.FC<CarouseCardHeaderProps> = ({
  knowmore = false,
  handleKnowMore,
  text,
}) => {
  const container: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    paddingBlock: "10px 18px",
    alignItems: "center",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "Roboto-bold",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "31.92px",
    textAlign: "left",
    padding: "0",
    margin: "0",
    color: "#2B4078",
  };

  const knowMoreButtonStyle: CSSProperties = {
    fontFamily: "Roboto-bold",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    lineHeight: "21.28px",
    textAlign: "right",
    color: "#2B4078",
    padding: "0",
    margin: "0 !important", // Apply !important within a string
  };

  return (
    <div style={container}>
      <p style={titleStyle}>{text}</p>
      {knowmore && (
        <button style={knowMoreButtonStyle} onClick={handleKnowMore}>
          Know More
        </button>
      )}
    </div>
  );
};

const LeftSide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instructionOpen, setInstructionOpen] = useState(false);
  const windowHeight = document?.documentElement?.clientHeight;
  const sliderRef = useRef(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      // Calculate maximum height of carouseCards
      const cards = document.querySelectorAll(`.${styles.carouseCard}`);
      let max = 0;
      cards.forEach(card => {
        const height = (card as HTMLElement).offsetHeight;
        if (height > max) {
          max = height;
        }
      });
      // Set the maximum height

      console.log(max)
      setMaxHeight(max);
    }, 200)
  }, []);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Move slider to the previous slide
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // Move slider to the next slide
    }
  };


  return (
    <Box className={styles.signInBackground} position={{ base: windowHeight <= 900 ? "relative" : "absolute", lg: "relative" }} bottom={{ base: "0px" }}>
      <Box position="relative" zIndex={10} mt='36px' >
        <SignInInstructionPopup isOpen={instructionOpen} onClose={() => setInstructionOpen(false)} />

        <Box
          position={'absolute'}
          zIndex={20}
          top={{ base: '35%', md: '35%' }}
          right={{ base: "6px", md: '12px' }}
          cursor={'pointer'}
          width={{ base: "24px", md: '40px' }}
          onClick={handleNext}
        >
          <img src={leftArrow.src} alt='icon' />
        </Box>
        <Box
          position={'absolute'}
          zIndex={20}
          top={{ base: '35%', md: '35%' }}
          left={{ base: "6px", md: '12px' }}
          cursor={'pointer'}
          width={{ base: "24px", md: '40px' }}

          onClick={handlePrev}
        >
          <img src={rightArrow.src} alt='icon' />
        </Box>
        <Slider ref={sliderRef} {...settings} style={{ cursor: "pointer" }}>
          {[isbSliderImg1, isbSliderImg2, isbSliderImg1, isbSliderImg2]?.map((image, index) => (
            <Box
              key={index}
              pl="14px"
              height={{ base: '114px', md: "230px" }}
              width={{ base: '200px', md: "400px" }}
              overflow={'hidden'}
            >
              <img
                src={typeof image === 'string' ? image : image.src}
                alt={`Slide image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Show above="lg">
        <Box mt='54px'>
          <ReactCarousel>
            <Box
              bg='#FFFFFF'
              p='32px 40px 16px 40px'
              width={'480px'}
              borderRadius={'8px'}
              m='auto'
              mb='32px'
            >
              <Box
                fontSize={'24px'}
                fontWeight={600}
                color='#0F0F0F'
              >
                The Admission Process
              </Box>
              <Box
                fontSize={'14px'}
                color={'#7D7D7D'}
                mt='12px'
              >
                We assure a quick admission
              </Box>
              <Box mt='19px' >
                <Image src={applicationSteps} alt="img" height={184} width={157} />
              </Box>
            </Box>
            <Box
              bg='#FFFFFF'
              p='32px 40px 16px 40px'
              width={'480px'}
              borderRadius={'8px'}
              m='auto'
              mb='32px'
            >
              <Box
                fontSize={'24px'}
                fontWeight={600}
                color='#0F0F0F'
              >
                The application journey
              </Box>
              <Box
                fontSize={'14px'}
                color={'#7D7D7D'}
                mt='12px'
              >
                Complete your application journey in 4 easy steps
              </Box>
              <Box mt='19px' >
                <Image src={applicationProcess} alt="img" height={171} width={324} />
              </Box>
            </Box>

          </ReactCarousel>
        </Box>

        <Box
          color={'#FFFFFF'}
          fontSize={'16px'}
          lineHeight={'28px'}
          zIndex={10}
          position={'relative'}
          width={'620px'}
          m='auto'
          textAlign={'center'}
          mt='25px'
        >
          Every step gets autosaved. In case you get logged out, you will be able to continue your application from where you left off.
        </Box>
        <Box
          color={'#FFDF0C'}
          fontSize={'16px'}
          lineHeight={'28px'}
          zIndex={10}
          position={'relative'}
          textAlign={'center'}
          mt='7px'
          cursor={'pointer'}
          mb='32px'
          onClick={() => setInstructionOpen(true)}
        >
          Know more
        </Box>
      </Show>
      <Show below="lg">
        <Box
          m='auto'
          mt='22px'
          mb='66px'
          display={'flex'}
          flexDirection={'column'}
          mx={{ base: '16px', sm: 'auto', lg: '40px' }}
          maxWidth={'450px'}
        >


          <Box
            display={'flex'}

            p={{ base: "10px", lg: '12px 16px' }}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderRadius={'8px'}
            backgroundColor={'#F6F8FB'}



            // mx={{ base: '16px', sm: 'auto', lg: '40px' }}
            flexWrap={'wrap'}
          >
            <RemainingTimeForApplication />

          </Box>
          <ForAnyEnquery textColor={'#FFFFFF'} emailColor={'#DCDCDC'} />
        </Box>
      </Show>
    </Box >
  );
};

export default LeftSide;
