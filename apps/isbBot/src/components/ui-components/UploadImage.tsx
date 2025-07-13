import React, { useRef, useState } from "react";
import styles from './index.module.css'
import dummyImg from '../../assets/images/dummyImg.png'
import {
    preSignApiCall,
    getPreSignApi
} from "../../services/applicationFormApi";
import PercentageButton from "./PercentageButton";
import { ApplicationDetailsErrorType } from "../../types/application-type/applicationInterface";
import toast from "react-hot-toast";

const ImageUpload = ({
    onChange,
    value,
    error,
    handleError
}: {
    onChange: (arg: string) => void,
    value: string,
    error: ApplicationDetailsErrorType,
    handleError: (arg: ApplicationDetailsErrorType) => void
}) => {
    const ImageInputRef = useRef<any>(null);
    const [imgFile, setImgFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)

    const handleSelectImageClick = () => {
        ImageInputRef?.current?.click();
    };

    async function readImage(file: File) {
        if (file) {
            const fileSize = file?.size; // size in bytes
            let fileSizeInKB = fileSize / 1024; // size in KB
            fileSizeInKB = Math.round(fileSizeInKB)

            const image = document.createElement('img');

            image.onload = async function () {
                const width = image?.width; // image width
                const height = image?.height; // image height
                // Convert width and height to cm (assuming 96 dpi)
                let widthInCm = width * 2.54 / 96; // 1 inch = 2.54 cm
                let heightInCm = height * 2.54 / 96;
                widthInCm = parseFloat(widthInCm.toFixed(1))
                heightInCm = parseFloat(heightInCm.toFixed(1))
                console.log('fileSizeInKB', fileSizeInKB)
                console.log('Image Dimensions:', widthInCm, 'cm x', heightInCm, 'cm');

                setUploading(true)
                setImgFile(file);
                try {
                    // will get all urls to upload image on aws
                    const data = await getPreSignApi()
                    console.log(".....", data)
                    // @ts-ignore
                    const resp = await preSignApiCall(data?.presigned_url, file, file?.type, setProgress)
                    if (error?.profileImage) {
                        // @ts-ignore
                        handleError((pre: ApplicationDetailsErrorType) => {
                            return { ...pre, profileImage: '' }
                        })
                    }
                    onChange(data?.s3_location);
                    setUploading(false)
                    setProgress(0)
                } catch (error) {
                    // @ts-ignore
                    handleError((pre: ApplicationDetailsErrorType) => {
                        return { ...pre, profileImage: 'Upload failed. Please try again.' }
                    })
                    setUploading(false)
                }
            }
            image.src = URL.createObjectURL(file);
        }
    }

    return (
        <>
            <div
                className={styles.imgInputContainer}
                style={{ border: error?.profileImage ? '1.5px dashed red' : '' }}
            >
                <input
                    type="file"
                    accept="image/jpeg"
                    ref={ImageInputRef}
                    onChange={(event) => {
                        if (event?.target.files && event.target.files.length > 0) {
                            const file = event.target.files[0];
                            const fileType = file.type;
                            if (fileType.includes('jpeg')) {
                                readImage(event.target.files[0]);
                                ImageInputRef.current.value = '';
                            } else {
                                toast.error("Invalid file type. Please select jpeg image.");
                                ImageInputRef.current.value = '';
                            }
                        }

                    }}
                    style={{ display: "none" }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div >
                        <img src={value ? value : dummyImg.src} width={'66px'} alt="img" />
                    </div>
                    <div>
                        {uploading ?
                            <PercentageButton progress={progress} width='220px' /> :
                            <button
                                style={{
                                    padding: "7px 12px", maxWidth: "180px", width: "100%",
                                    borderRadius: "8px", background: "#FFFFFF", color: "#245BFF", border: '1px solid #245BFF'
                                }}
                                onClick={handleSelectImageClick}
                            >
                                {value ? 'Change' : 'Upload Profile Photo'}
                            </button>}
                        {
                            ((!error?.profileImage && imgFile && imgFile?.name) || value) && <div
                                style={{
                                    color: '#333F51',
                                    fontFamily: "Roboto-regular",
                                    fontSize: '12px',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    marginTop: '12px'
                                }}
                            >
                                {imgFile?.name ? imgFile?.name : 'Profile-Image'}
                            </div>
                        }
                        {error?.profileImage && <div
                            style={{
                                color: '#EE574D',
                                fontFamily: "Roboto-regular",
                                fontSize: '12px',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                marginTop: '12px'
                            }}
                        >
                            {error?.profileImage}</div>
                        }
                    </div>
                </div>

            </div>
        </>
    );
};

export default ImageUpload;
