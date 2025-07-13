import React from 'react'
import  styles from "./index.module.css"
import { iSubList } from '../../utils/instructionData'

interface iInstructionLists{
    data : any
    type? : string
}

    const InstructionLists: React.FC<iInstructionLists> = ({data = [] , type}) => {
    return type ? (
        <div></div>
    ) : (
        <ul className={styles.instructionLists}>
        {
        data?.length >  0 && data.map((res : string, index: number )=> (
            <li key={`${index}-instruction-item`} className={styles.instructionList}>{res}</li>
        ))
        }
    </ul>
    )
    }

export default InstructionLists