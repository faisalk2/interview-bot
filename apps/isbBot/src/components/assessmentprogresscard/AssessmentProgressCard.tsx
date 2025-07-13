import styles from "./assessmentprogresscard.module.css"
import clockSvg from "../../assets/svg/clock.svg"
import qmSvg from "../../assets/svg/qm.svg"
import Image from "next/image"
import { InterviewDataType } from "../../pages/interview-completed"


const AssessmentProgressCard = ({ interviewData, timeSpend }: { interviewData: InterviewDataType, timeSpend: string }) => {
    return (
        <div className={styles.container}  >
            <div>
                <p className={styles.progressCardTitle}>Assessment Completed</p>
                <div
                    className={styles.flexBox}
                    style={{
                        gap: "19px",
                        justifyContent:'center'
                    }}
                >
                    <div >
                        <p className={styles.progressCardLabel}>Time Remaining</p>
                        <div className={styles.ProgressValue}>
                            <div className={styles.icon}>
                                <Image src={clockSvg} alt="clock icon" />
                            </div>
                            <p className={styles.timer}>{timeSpend ?? ""}</p>
                        </div>
                    </div>
                    <div >
                        <p className={styles.progressCardLabel} >Total Questions attended</p>
                        <div className={styles.ProgressValue}>
                            <div className={styles.icon}>
                                <Image src={qmSvg} alt="question mark" />
                            </div>
                            <p className={styles.totaQuestionsAttendValue}><span>{String(interviewData?.attempted).padStart(2, '0') ?? ""}</span>/<span>{String(interviewData?.total).padStart(2, '0')}</span></p>
                        </div>
                    </div>
                    <div >
                        <p className={styles.progressCardLabel}>Total Questions Skipped</p>
                        <div className={styles.ProgressValue}>
                            <div className={styles.icon}>
                                <Image src={qmSvg} alt="question mark" />
                            </div>
                            <p className={styles.totaQuestionsSkipped}><span>{String(interviewData?.skipped).padStart(2, '0')}</span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AssessmentProgressCard