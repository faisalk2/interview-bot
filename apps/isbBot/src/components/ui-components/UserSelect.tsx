'use client';
import Image from 'next/image';
import React from 'react';
import Select, { SingleValue } from 'react-select';
import profileDummy from '../../assets/images/profile_image.png'

export type OptionType = {
  label: string;
  value: string;
};

export type PropsType = {
  onChange: (value: string) => void;
  value: string;
  width?: string;
  options?: OptionType[];
  placeholder: string;
  errorMessage?: string;
  paddingY?: string;
  isDisabled?: boolean;
  logo: string;
};

// import CourseProvider from '~/images/courseProvider.png';

const UserSelect = ({
  options,
  onChange,
  placeholder,
  value,
  logo,
}: PropsType) => {
  return (
    <div style={{ padding: '6px 1px',margin:"100px 30px 10px 30px" }}>
      <div
        style={{ padding: "4px", display: "flex",overflow: "hidden", border: '1px solid #E3E7EF', borderRadius: "25px", backgroundColor: "#FFFFFF" }}>
        <div
          style={{
            display: 'flex', justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: "50%",
            border: "1px solid #ccc",
          }}
        >
          
          <img src={logo ? logo : profileDummy.src} alt='profile' width={35} height={30} />
        </div>
        <div style={{ width: "85%" }}>
          <Select
            options={options}
            value={{label:value,value:value} ?? ""}
            placeholder={placeholder}
            isSearchable={false}
            onChange={(e: SingleValue<OptionType>) => {
              if (e) {
                onChange(e?.value);
              }
            }}
            styles={{
              input: (base) => ({
                ...base,
                'input:focus': {
                  boxShadow: 'none',
                },
                width: '500px',
                cursor: 'pointer',
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                cursor: 'pointer',
              }),
              option: (provided) => ({
                ...provided,
                '&:hover': {
                  background: 'lightgray',
                  cursor: 'pointer',
                },
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSelect;
