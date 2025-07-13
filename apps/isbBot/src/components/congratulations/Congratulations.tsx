import styles from "./styles.module.css";
import confettiLeft from "../../assets/svg/confettiLeft.svg"
import confettiRight from "../../assets/svg/confettiRight.svg"
import checkLogo from "../../assets/svg/rightcheck.svg";
import Image from "next/image";
import { Box, color } from "@chakra-ui/react";
import confetti from '../../assets/icons/confetti.svg'
const Congratulations = ({ isFormScreen = true }: { isFormScreen?: boolean }) => {
  const anchorStyle = {
    fontFamily: "Roboto-regular",
    textDecoration: "underline",
    color: "#6183b4"
  }
  return (
    <Box
      display={'flex'}
      alignItems={"center"}
      justifyContent={'center'}
      height={'91vh'}

    >


      <div className={styles.container}>
        <div className={styles.congratulationsContainer}>
          <div className={styles.checkLogo}>
            <Image src={confetti} alt="img" />
          </div>
          <p className={styles.title}>Thank you!</p>
          {isFormScreen ? <div className={styles.submissionSuccessText}>
            <p>Your application has been successfully submitted 🎉</p>
            <p>
              Our team will review your application and if shortlisted,
              you will receive an interview link on your email id for your interview. In the meantime, feel free to explore more about our program <a style={anchorStyle} href="https://isb.edu/ivi" target="_blank" rel="noreferrer">
                https://isb.edu/ivi
              </a> and stay tuned for updates.
            </p>
          </div> :
            <div className={styles.submissionSuccessText}>
              <p>You have successfully completed the AI interview for the I - Venture Immersive. 🎉</p>
              <p>
                Our team will review your interview and notify you of the next steps via email soon.
              </p>
              <p>
                If you have any questions or encounter any issues, please don{`'`}t hesitate to contact our support team at <a style={anchorStyle} href="mailto:ivi@isb.edu"> ivi@isb.edu</a>
              </p>
            </div>
          }
        </div>
      </div>
    </Box>
  );
};

export default Congratulations;
