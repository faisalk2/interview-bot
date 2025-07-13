import React from 'react'

const ErrorMessage = ({ text }: { text?: string }) => {

    if (!text) return null

    return (
        <div style={{
            fontFamily: "Roboto-regular",
            textTransform: "capitalize",
            color: 'red',
            fontSize: '11px',
            textAlign: 'left',
            marginTop: '8px'
        }}
        >{text}</div>
    )
}

export default ErrorMessage