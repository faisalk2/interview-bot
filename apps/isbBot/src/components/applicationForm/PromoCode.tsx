import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from './payment.module.css'
import ConfettiExplosion from 'react-confetti-explosion';
import { FaRegCheckCircle } from "react-icons/fa";
const PromoCode = ({ onChange, codeAppliedSuccess,handleEnter }: { onChange: (arg: string) => void, codeAppliedSuccess: boolean,handleEnter:(arg:any,arg2:string)=>void }) => {
  const [code, setCode] = useState('');
  const handleApply = async () => {
    await onChange(code)
    setCode('')
  }
  return (
    <div>
      {/* @ts-ignore */}
      <InputGroup size='md' background={'#FFFFFF'} sx={{ borderRadius: "8px" }}>
        {codeAppliedSuccess ?
          <div style={{ display: "flex", gap: '5px', alignItems: "center", padding: '5px' }}>
            <FaRegCheckCircle size={20} color={'#50B089'} />Coupon applied successfully</div> :
          <Input
            value={code}
            pr='4.5rem'
            placeholder='Enter Coupon Code'
            onChange={(e) => setCode(e.target.value)}
            onKeyUp={(e)=>handleEnter(e,code)}
          />}
        <InputRightElement width='4.5rem'>
          {!codeAppliedSuccess && <Button h='1.75rem' onClick={handleApply}  colorScheme='#2B4078' color={'#FFFFFF'} background={'#2B4078'} variant='solid' size='sm' >
            Apply
          </Button>}
          {codeAppliedSuccess && <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
          />}
        </InputRightElement>
      </InputGroup >
      {!codeAppliedSuccess && <div
        className={styles.promoCodeText}
        style={{ marginLeft: "5px", marginTop: "2px", color: "#999FA8" }}>
        Do you have a coupon code?
      </div>}
    </div>
  )
}

export default PromoCode