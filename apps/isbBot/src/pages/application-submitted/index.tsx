import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/applicationForm/SideBar";
import Congratulations from "../../components/congratulations/Congratulations";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { createOrder, getUserData, postUserData } from "../../services/applicationFormApi";
import toast from "react-hot-toast";
import MobilePopup from "../../components/ui-components/MobilePopup";
import TopBar from "../../components/applicationForm/TopBar";


const FormSubmitted = () => {
    const router = useRouter()
    const { paymentstatus } = router.query;
    const windowWidth = document?.documentElement?.clientWidth;
    const getUserDetails = async (userId: string) => {

        const resp = await getUserData(userId)
        const orderId = localStorage.getItem("orderId") ?? ""
        if (orderId) {
            const data = {
                id: userId,
                amount: "1000",
                orderid: orderId
            }
            const resp1 = await createOrder(data)
            console.log("RESP>>>>>>>", resp1)
            localStorage.removeItem("orderId")
            const token = localStorage.getItem("userToken") ?? ""
            const request = {
                id: userId,
                navigator_state: 4
            }
            const resp2 = await postUserData(request, token, router)
            console.log("RESP2", resp2)
            return
        }

        if (resp?.data?.navigator_state !== 4) {
            if (resp?.data?.navigator_state == 0) {
                router.push("/application/personal-details")
                return
            }
            else if (resp?.data?.navigator_state == 1) {
                router.push(`/application/academic-details`)
                return
            }
            else if (resp?.data?.navigator_state == 2) {
                router.push(`/application/application-questions`)
                return
            }
            else if (resp?.data?.navigator_state == 3) {
                router.push(`/application/payment`)
                return
            }
            else if (resp?.data?.navigator_state == 5) {
                router.push(`/interview/${userId}`)
                return
            }
            else if (resp?.data?.navigator_state == 6) {
                router.push("/interview-completed")
                return
            }
            else {
                router.push("/sign-in")
                return
            }
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId') ?? ''
        if (!userId) {
            router.push('/sign-in');
        }
        getUserDetails(userId)
    }, [])
    useEffect(() => {
        if (paymentstatus) {
            toast.success("Payment is Successful.")
        }
    }, [paymentstatus])

    return (
        <div className={styles.applicationContainer}>
            {/* <Navbar /> */}
            {windowWidth <= 950 && <MobilePopup />}
            <TopBar/>
            <SideBar activeTab={4} />
            <div className={styles.formContainer}>
                <Congratulations />
            </div>
        </div>
    );
};

export default FormSubmitted;
