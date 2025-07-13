import React from 'react'

import styles from './index.module.css'
import { GuidelineTable } from './WelcomeScreen';

const guidlinesInstruction = [
    "Please take your assessment on a personal desktop or laptop. Avoid using work or school computers, as security settings like firewalls and VPNs may block access to the secure browser.",
    "Make sure your room is well-lit so your face and actions are clearly visible on camera. Cover any glass walls, doors, and windows during the assessment.",
    "Tablets, mobile devices, and laptop touchscreens are strictly prohibited.",
    "Keep your face fully visible—avoid sunglasses, hats, or anything covering your eyes or face. Position your camera at eye level for a clear view throughout the assessment.",
    "Please avoid head coverings that could obscure any part of your face, unless needed for religious or medical reasons.",
    "A stable internet connection of at least 2 Mbps (download/upload) is required for optimal performance. Make sure your device is plugged in or fully charged for a smooth assessment experience.",
    "Your webcam can be internal or external, but camera access must be enabled. Ensure you have a working microphone and speakers, either built-in or external, and verify that audio and microphone are not muted.",
    ]

const guidlineTableData = [
    {
        tableHead: "DO’S",
        tableBodyTitle: "YOU CAN HAVE",
        tableLists: [
            "Approved identification",
            "Prescription eyeglasses",
            "Water in a clear glass/container"
        ]
    },
    {
        tableHead: "DONT’S",
        tableBodyTitle: "YOU CAN'T HAVE",
        tableLists: [
            "Mobile phones",
            "Headphones or headsets (wired or Bluetooth)",
            "Handheld computers or other electronic devices",
            "Pagers",
            "Watches",
            "Wallets",
            "Purses",
            "Bags",
            "Coats",
            "Books",
            "Notes",
            "Any other materials not specifically approved"
        ]
    }
]

const guidineTextCss: any = {
    fontFamily: 'Roboto-regular',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '21.28px',
    textDecoration: 'underline',
    color: "#2E3B42",
};

const InstructionGuideLine = ({ check = false, setCheck = () => { return false }, showCheck = false }: { check?: boolean, setCheck?: (arg: boolean) => void, showCheck?: boolean }) => {
    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <div className={styles.instructionContainer}>
                <p className={styles.instructionTitle}>The assessment is timed. You will have 60 minutes to complete the assessment.</p>
                <span style={guidineTextCss}>
                    Guidelines
                </span>
                <ol className={
                    styles.instructionLists
                }  >
                    {
                        guidlinesInstruction?.map(res => (
                            <li key={res} > <div dangerouslySetInnerHTML={{ __html: res }} /></li>
                        ))
                    }
                </ol>

                <GuidelineTable tableData={guidlineTableData} />
                {showCheck && <div className={styles.guidlineCheckContainer}>
                    <input type="checkbox" style={{ cursor: "pointer" }} checked={check} onChange={(e) => {
                        const checked = e.target.checked;
                        setCheck(checked)

                    }} />
                    <p>I have read and agree to abide by the guidelines.</p>
                </div>}
            </div>
        </div>
    )
}

export default InstructionGuideLine