'use client';
import React from 'react';
import Select, { SingleValue } from 'react-select';

type OptionType = {
  label: string,
  value: string
}

export type PropsType = {
  onChange: (value: string | number) => void;
  value: string | number | null;
  width?: string;
  options: OptionType[];
  placeholder: string;
  errorMessage?: string;
  paddingY?: string;
  isDisabled?: boolean;
};

const SelectTag = ({
  options,
  onChange,
  width = '100%',
  value,
  placeholder,
  errorMessage = '',
  paddingY = '',
  isDisabled = false,
}: PropsType) => {
  return (
    <div>
      <Select
        isDisabled={isDisabled}
        options={options}
        value={value ? { label: value, value: value } : null}
        placeholder={placeholder}
        onChange={(e) => {
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
            width,
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: errorMessage ? 'red' : '#E3E7EF',
            paddingTop: paddingY,
            paddingBottom: paddingY,
            borderRadius: '8px',
            backgroundColor: isDisabled ? '#ECF0F5' : '#fff',
            fontSize: '14px',
            fontWeight: 400
          }),
        }}
      />
      {errorMessage && (
        <p style={{
          fontFamily: "Roboto-regular",
          textTransform: "capitalize",
          color: 'red',
          fontSize: '11px',
          textAlign: 'left',
          marginTop: '8px'
        }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default SelectTag;
