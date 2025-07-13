import React from 'react';
import styles from './index.module.css'
const ProgressBar = ({ interviewPercentage }:{interviewPercentage:number}) => {
    console.log("INTERVIEW", interviewPercentage)
    return (
        <div className={styles.progressContainer} >
            <div className={styles.progressBar} style={{ width: `${interviewPercentage}%` }}>
                <div className={styles.progressText}  >{interviewPercentage}%</div>
            </div>
        </div>
    );
};

export default ProgressBar; 