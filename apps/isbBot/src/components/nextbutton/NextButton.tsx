import React from 'react'
import { GoArrowRight } from "react-icons/go";
import styles from "./index.module.css"

const NextButton = ({ name = "Next", handleActiveTab, disabled = false }: { name?: string, disabled?: boolean, handleActiveTab: (value?: number) => void }) => {
  return (
    <button className={styles.nextButton} disabled={disabled} onClick={() => {
      handleActiveTab()
    }}>{name} <GoArrowRight size={24} /></button>
  )
}

export default NextButton