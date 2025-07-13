import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

interface iInstructionsHeader {
  title: string;
  icon: string;
}

const InstructionsHeader: React.FC<iInstructionsHeader> = ({ title, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.instructionsHeaderIcon}>
        {icon && <Image src={icon} />}
      </div>
      <p  className={styles.instructionsHeaderTitle} >{title}</p>
    </div>
  );
};

export default InstructionsHeader;
