import {
    Bubble,
    ScrollView,
    Typing,
    //@ts-ignore
} from "chatui";
// import axios from "axios";
import React, {
    FC,
    ReactElement, useEffect, useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatMessageItemPropType } from "../../types";
import { Box, Button } from "@chakra-ui/react";
import styles from './index.module.css'
import profileImage from '../../assets/icons/candidateProfile.png';
import iviIcon from '../../assets/images/profileAI.png';
import Image from "next/image";

const ChatMessageItem: FC<ChatMessageItemPropType> = ({
    message,
    onSend,
}) => {

    const { content, type } = message;
    const [profilePic, setProfilePic] = useState(profileImage.src)

    const disableCopyPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log('Copy-paste actions are disabled!');
    };

    useEffect(() => {
        const profile = localStorage.getItem('userProfile') || profileImage.src
        setProfilePic(profile);
    }, [profilePic]);

    switch (type) {
        case "loader":
            return <div className={styles.loadingProfileContainer}>
                <span className={styles.profileContainer}>
                    <img src={iviIcon.src} alt='profile' className={styles.profileImage} />
                </span>
                <div className={styles.loadingContainer}>
                    <Typing />
                </div>
            </div>;
        case "text":
            const messageContent = content?.data?.message;
            if (content?.data?.position === 'left') {
                return (
                    <div
                        className={`${styles.speechBubbleContainer}`}
                        onCopy={disableCopyPaste}
                        onCut={disableCopyPaste}
                    >
                        {/* {messageContent?.map((text, index) => ( */}
                        <Box
                            key={uuidv4()}
                            // type="text"
                            style={{
                                textAlign: 'left',
                                position: "relative",
                                backgroundColor: '#192890',
                                // minWidth: '175px',
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#E5E5E5",
                                width: "100%",
                            }}
                        >
                            <Box sx={{ fontSize: "12px", fontWeight: 400, color: "#E5E5E5", opacity: 0.7 }} >AI</Box>
                            {messageContent}
                        </Box>
                        {/* // ))} */}
                    </div>
                );
            } else {
                return (
                    <div
                        className={`${styles.speechBubbleContainer1}`}
                        onCopy={disableCopyPaste}
                        onCut={disableCopyPaste}
                    >
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'flex-start' }}>
                            <Box  >
                                <img src={profilePic} className={styles.userImage} alt="profile" />
                            </Box>

                            <Box
                                style={{
                                    textAlign: 'left',
                                    backgroundColor: '#192890',
                                    width: '345px',
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    color: '#E5E5E5',
                                }}
                            >
                                <Box sx={{ fontSize: "12px", fontWeight: 400, color: "#E5E5E5", opacity: 0.7 }} >You</Box>
                                {messageContent}
                            </Box>
                        </div>
                    </div>
                );
            }
        default:
            return (
                <ScrollView
                    data={[]}
                    // @ts-ignore
                    renderItem={(item): ReactElement => <Button label={item.text} />}
                />
            );
    }
};

export default ChatMessageItem;
