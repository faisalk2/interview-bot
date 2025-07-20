import React, { useState } from "react";
import styles from "./index.module.css";
import Navbar from "../navbar/Navbar";
import { CSSProperties } from "react";
import { any } from "underscore";
import { background } from "@chakra-ui/react";
import InstructionGuideLine from "./InstructionGuideLine";
import LogoutBtn from "../ui-components/LogoutBtn";
import toast from "react-hot-toast";
import { useRouter } from "next/router";


export function GuidelineTable({ tableData }: any) {

    const tableHead = tableData?.map((res: any) => res?.tableHead)

    const tableHeadStyle: CSSProperties = {
        background: "#FFB172",
        height: "54px",
        borderRadius: "8px 8px 0px 0px",
        color: "#fff",
        width: "50%"
    }

    return (
        <table width={"100%"} style={{ borderCollapse: "collapse", marginTop: "18px", marginBottom: "56px" }} >
            <thead>
                <tr>
                    {
                        tableHead && tableHead?.map((title: string, index: number) => (

                            <th key={index} style={{
                                ...tableHeadStyle,
                                borderRadius: index === 0 ? "8px 0px 0px 0px" : "0px 8px 0px 0px"
                            }}  >{title}</th>

                        ))

                    }
                </tr>
            </thead>

            {/* style={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box"
            }} */}
            <tbody>
                <tr   >
                    {
                        tableData && tableData?.map((res: any, index: number) => (

                            <React.Fragment key={index}>
                                <td style={{
                                    height: "100%",
                                    verticalAlign: "top",
                                    paddingTop: "16px",
                                    padding: "10px 15px 10px 15px",
                                    borderWidth: "0px 1px 1px 1px",
                                    background: "#fff",
                                    borderStyle: "solid",
                                    borderColor: "#DEDEDE"
                                }}  >
                                    <span style={{
                                        fontFamily: "Roboto-bold",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        lineHeight: "21.28px",
                                        textAlign: "left",
                                        color: "#2E3B42"
                                    }}  >{res?.tableBodyTitle}</span>

                                    <ul style={{
                                        marginTop: "8px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px"
                                    }} >
                                        {
                                            res?.tableLists && (
                                                res?.tableLists?.map(((text: string) => (
                                                    <li key={text} style={{
                                                        marginLeft: "25px",
                                                        fontFamily: "Roboto-regular",
                                                        fontSize: "16px",
                                                        fontWeight: 400,
                                                        lineHeight: "21.28px",
                                                        textAlign: "left",
                                                        color: "#333F51"
                                                    }}>{text}</li>
                                                )))
                                            )
                                        }
                                    </ul>
                                </td>
                            </React.Fragment>

                        ))
                    }
                </tr>
            </tbody>
        </table >
    );
}

export const WelcomeScreen = ({ handleInterviewStart }: { handleInterviewStart: () => void }) => {
    // using state for check if user check read guidlines checkbox
    const [check, setCheck] = useState<boolean>(false)
    const router = useRouter()
    //css
    const titleText: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: '0px 30px',
        width: "100%",
        fontFamily: "Roboto-regular",
        fontSize: "45px",
        fontWeight: 700,
        lineHeight: "55.86px",
        textAlign: "center",
        WebkitBackgroundClip: "text",
        color: '#192890',
        backgroundClip: "text",
        margin: "0"
    };

    const guidineTextCss: CSSProperties = {
        fontFamily: 'Roboto-regular',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '21.28px',
        textDecoration: 'underline',
        color: "#333F51",
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.success('sign out successful')
        router.push('sign-in')
    }

    return (
        <div className={styles.container}>
            <div style={{ height: '100vh', overflowY: 'scroll', paddingTop: '100px', paddingBottom: '30px' }} >
                <h1 style={titleText}><div>Welcome to AI Assessment</div>
                </h1>
                <InstructionGuideLine check={check} setCheck={setCheck} showCheck={true} />
                <button onClick={handleInterviewStart} className={styles?.submitButton} disabled={!check} >Start The Assessment</button>
            </div>
        </div>
    );
};