import React, { useEffect, useState } from 'react';
import styles from "./index.module.css"

function FileUploadButton() {
  const [progress, setProgress] = useState(0);

  const handleFileUpload = () => {
    simulateUploadProgress();
  };

  const simulateUploadProgress = () => {
    // Simulate file upload progress
    let interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Increment progress until it reaches 100
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(interval); // Stop simulation when progress reaches 100
          return prevProgress;
        }
      });
    }, 1000); // Interval to update progress (in milliseconds), adjust as needed
  };

  useEffect(() => {
   simulateUploadProgress()
  },[])

  return (
   <div className={styles.wrapper}>
      <button className={`${styles.btn} ${styles["btn-2"]}`} >
      <p>uploading... {progress + `%`}</p>
    </button>
   </div>
  );
}

export default FileUploadButton;
