import React, { useState } from 'react';
import styles from './stepper.module.css';
import stepperIcon1 from '../../assets/icons/stepperIcon1.svg'
import stepperIcon2 from '../../assets/icons/stepperIcon2.svg'
import stepperIcon3 from '../../assets/icons/stepperIcon3.svg'
import stepperIcon4 from '../../assets/icons/stepperIcon4.svg'
import stepperCompletedIcon from '../../assets/icons/signIcon.svg'
import Image from 'next/image';
import { useRouter } from 'next/router';

const FormStepper = ({ activeStep, setActiveStep  }: { activeStep: number, setActiveStep?: (value: number) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const steps = [
    { content: '1', label: 'Personal Details', icon: stepperIcon3 },
    { content: '2', label: 'Academic Details', icon: stepperIcon2 },
    { content: '3', label: 'Application Question', icon: stepperIcon1 },
    { content: '4', label: 'Payment', icon: stepperIcon4 },
  ];

  return (
    <div className={styles.container} >
      <div className={styles.flexible} >
        {steps?.map((step, index) => {
          return (<React.Fragment key={step.label}>
            {activeStep === index ?
              <div className={styles.circleActiveContainer}>
                <div className={styles.circleActive}>
                  <Image src={step?.icon} alt='icon' />
                </div>
              </div> :
              index > activeStep ? <div
                className={styles.circle}
              >
                {step.content}
              </div> :
                <div
                  className={styles.circleCompleted}
                >
                  <Image src={stepperCompletedIcon} alt='icon' />
                </div>
            }
            {index < steps.length - 1 &&
              <div
                className={`${styles.line} ${index < activeStep ? styles.active : ''}`}
              ></div>}
          </React.Fragment>
          )
        })}
      </div>
      <div >
        {steps?.map((step, index) => (
          <div
            key={index}
            className={styles.stepText}
            style={{
              paddingTop: activeStep === 0 && index === 3 ?
                '0px' : activeStep === 0 && index === 2 ?
                  '0px' : activeStep === 0 && index === 1 ?
                    '0px' : activeStep === 1 && index === 3 ?
                      '7px' : activeStep === 1 && index === 2 ?
                        '14px' : activeStep === 1 && index === 1 ?
                          '4px' : activeStep === 2 && index === 3 ?
                            '10px' : activeStep === 2 && index === 2 ?
                              '8px' : activeStep === 2 && index === 1 ?
                                '1px' : activeStep === 3 && index === 3 ?
                                  '5px' : activeStep === 3 && index === 2 ?
                                    '2px' : activeStep === 4 && index === 1 ?
                                      '1px' : activeStep === 4 && index === 3 ?
                                        '1px' : activeStep === 4 && index === 2 ?
                                          '2px' : activeStep === 4 && index === 1 ?
                                            '1px' : '',
              marginTop: index === 0 && activeStep === 0 ?
                '8px' : index === 0 && activeStep === 1 ?
                  '10px' : index === 0 && activeStep === 2 ?
                    '10px' : index === 0 && activeStep === 3 ?
                      '10px' : index === 0 && activeStep === 4 ?
                        '10px' : '',
              marginBottom: index === steps.length - 1 ?
                '' : activeStep === 0 ? '55px' : activeStep === 1 ?
                  '45px' : activeStep === 2 ?
                    '47px' : activeStep === 3 ? '50px' : activeStep === 4 ? '50px' : '',
            }}
          >
            <div className={styles.stepNumberText}>
              Step {step.content}
            </div>
            <div
              className={styles.stepLabel}
            >{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormStepper;