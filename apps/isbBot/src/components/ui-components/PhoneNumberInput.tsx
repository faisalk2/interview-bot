import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ErrorMessage from "./ErrorMessage";
import styles from './index.module.css'
interface IPhoneNumberInput {
  value: string,
  onchange: (e: string) => void,
  errorMessage?: string,
  handleKeyChange?: (arg: any) => void,
  disabled?: boolean
}

const PhoneNumberInput = ({ value, onchange, errorMessage = "", handleKeyChange = () => { }, disabled = false }: IPhoneNumberInput) => {
  return (
    <>
      <div style={{
        border: `1px solid ${errorMessage?.length > 0 ? "red" : "#D5DAD1"}`,
        padding: '8px',
        borderRadius: "7px",
        backgroundColor: disabled ? "#ECF0F5" : '#FFFFFF',
        width: '100%'
      }}
        className={styles.phoneInputContainer}
      >
        <PhoneInput
          placeholder="Mobile Number"
          defaultCountry="IN"
          value={value}
          onChange={onchange}
          onKeyUp={handleKeyChange}
          disabled={disabled}
          international={false} // ✅ Makes country code dropdown-only
          countryCallingCodeEditable={false} // ✅ Prevents user editing +91
        />
      </div>
      <ErrorMessage text={errorMessage} />
    </>
  );
};

export default PhoneNumberInput;
