import { useDropzone, Accept, FileRejection, DropEvent } from "react-dropzone";

import { useCallback, useRef, CSSProperties } from "react";
import toast from "react-hot-toast";
import PercentageButton from "../ui-components/PercentageButton";
import { FaFilePdf } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
interface DragDropFileProps {
  uploadedUrl: string,
  value: File | null | undefined;
  onChange: (file: File) => void;
  errorMessage?: string;
  progress: number,
  isUploading: boolean,
  genericName: string,
  btnText?: string,
  loadingText?: string,
  percentageBtnWidth?: string,
  showPercentage: boolean
}


const DragDropFile = ({
  value,
  onChange,
  errorMessage,
  progress,
  isUploading,
  genericName,
  uploadedUrl,
  btnText = 'Upload',
  loadingText = 'Uploading',
  percentageBtnWidth = '220px',
  showPercentage
}: DragDropFileProps) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      if (acceptedFiles.length !== 0) {
        onChange(acceptedFiles[0]);
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
      if (fileRejections.length !== 0) {
        toast.error("Please select a PDF");
      }
    },
    [onChange]
  );

  // Define the accept type
  const acceptTypes: Accept = {
    accept: ["application/pdf"],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: acceptTypes,
    noClick: true,
  });

  const containerStyle: CSSProperties = {
    border: `1.5px dashed ${errorMessage ? "#d74848" : "#95A9B4"}`,
    borderRadius: '8px',
    padding: "24px",
    width: "500px",
    minHeight: "186px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: '#F4F8FA'
  }

  const orTextStyle: CSSProperties = {
    color: "rgba(51, 63, 81, 0.70)",
    fontFamily: 'Roboto-medium',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
  };


  const instructionTitle: CSSProperties = {
    color: 'rgba(51, 63, 81, 0.70)',
    fontFamily: 'Roboto-regular',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px' // 171.429%
  }

  const fileNameStyle: CSSProperties = {
    color: 'var(--Text, #333F51)',
    fontFamily: 'Roboto-regular',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: 'normal',
    textDecorationLine: 'underline',
    textAlign: "left",
    maxWidth: "231px",
    width: "100%",
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        style={containerStyle}
      >
        {isDragActive && <p>Drop File Here</p>}
        <input
          {...getInputProps()}
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
        />
        {((!isDragActive && !value) && !uploadedUrl) && (
          <>
            <p
              style={{
                fontFamily: "Roboto-regular",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                textDecoration: "underline",
                color: "#333F51",
              }}
            >
              Drag & Drop file here
            </p>
            <p style={orTextStyle}>or</p>
            {isUploading ? <PercentageButton showPercentage={showPercentage} loadingText={loadingText} progress={progress} width={percentageBtnWidth} /> :
              <button
                onClick={handleButtonClick}
                style={{
                  padding: "7px 18px",
                  maxWidth: "230px",
                  width: "100%",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  color: "#245BFF",
                  border: '1px solid #245BFF',
                  fontSize: '16px',
                  fontWeight: 400
                }}>
                {btnText}
              </button>}

            {errorMessage && <div
              style={{
                color: '#EE574D',
                fontFamily: "Roboto-regular",
                fontSize: '12px',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 'normal',
                textAlign: 'left'
              }}
            >
              {errorMessage}</div>
            }
          </>
        )}

        {
          ((!isDragActive && value) || uploadedUrl) && (
            <>
              <p style={orTextStyle}><FaCheckCircle color="#2CAE2A" size={24} /></p>
              {errorMessage ? <div
                style={{
                  color: '#EE574D',
                  fontFamily: "Roboto-regular",
                  fontSize: '12px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  textAlign: 'left'
                }}
              >
                {errorMessage}</div> : <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={fileNameStyle} >
                  {value && value?.name ? value?.name : genericName}</a><span></span>
              </div>
              }
              {isUploading ?
                <PercentageButton
                  showPercentage={showPercentage}
                  loadingText={loadingText}
                  progress={progress}
                  width={percentageBtnWidth}
                /> :
                <button
                  onClick={handleButtonClick}
                  style={{
                    padding: "7px 18px",
                    maxWidth: "231px",
                    width: "100%",
                    borderRadius: "8px",
                    background: "#50B089",
                    color: "#fff",
                    fontSize: '16px',
                    fontWeight: 400
                  }}>Change</button>}
            </>
          )
        }
      </div>
    </>
  );
};

export default DragDropFile;
