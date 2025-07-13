import React from 'react'
import styles from './index.module.css'
import { BiSolidMessageAltError } from "react-icons/bi";
import { Tooltip } from '@chakra-ui/react';
import TooltipCard from '../recorder/TooltipCard';

const Label = ({ text, points = null, width = '200px' }: { text: string, points?: string | string[] | null, width?: string }) => {
  return (
    <div className={styles.label}>{text}
      {/* @ts-ignore */}
      {points && <Tooltip
        label={
          <ol style={{ marginLeft: "10px", textAlign: "justify", padding: '10px' }}>
            {Array.isArray(points) ? points.map((point, index) => (
              <li key={index}>{point}</li>
            )) : points}
          </ol>
        }
        placement="bottom"
        minWidth={width}
        bg="#5D6F7A"           // Tooltip background (e.g., dark gray)
        color="white"          // Text color
        fontSize="12px"          // 'sm', 'md', 'lg' or custom like '14px'
        fontWeight={400}
        borderRadius="4px"
      >
        <TooltipCard>
          <BiSolidMessageAltError size={16} style={{ cursor: "pointer" }} color='#8896AB' /></TooltipCard>
      </Tooltip>}
    </div>
  )
}

export default Label