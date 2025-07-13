import React, { useEffect, useState } from 'react'

import styles from './payment.module.css';
import ButtonFill from '../ui-components/ButtonFill';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import AskToEditApplicationPopUp from './AskToEditApplicationPopUp';
import PromoCode from './PromoCode';

const promoCodes = [
  'p2ivi0301', 'p2ivi0302', 'p2ivi0303', 'p2ivi0304',
  'p2ivi0305', 'p2ivi0306', 'p2ivi0307', 'p2ivi0308',
  'p2ivi0309', 'p2ivi0310', 'p2ivi0311', 'p2ivi0312',
  'p2ivi0313', 'p2ivi0314', 'p2ivi0315', 'p2ivi0316',
  'p2ivi0317', 'p2ivi0318', 'p2ivi0319', 'p2ivi0320',
  'p2ivi0321', 'p2ivi0322', 'p2ivi0323', 'p2ivi0324',
  'p2ivi0325', "p2ivi0326", "p2ivi0327", "p2ivi0328",
  "p2ivi0329", "p2ivi0330", "p2ivi0331", "p2ivi0332",
  "p2ivi0333", "p2ivi0334", "p2ivi0335", "p2ivi0336",
  "p2ivi0337", "p2ivi0338", "p2ivi0339", "p2ivi0340",
  "p2ivi0341", "p2ivi0342", "p2ivi0343", "p2ivi0344",
  "p2ivi0345", "p2ivi0346", "p2ivi0347", "p2ivi0348",
  "p2ivi0349", "p2ivi0350", "p2ivi0051", "p2ivi0052",
  "p2ivi0053", "p2ivi0054", "p2ivi0055", "p2ivi0056",
  "p2ivi0057", "p2ivi0058", "p2ivi0059", "p2ivi0060",
  "p2ivi0061", "p2ivi0062", "p2ivi0063", "p2ivi0064", "p2ivi0065",
  "p2ivi0066", "p2ivi0067", "p2ivi0068", "p2ivi0069", "p2ivi0070",
  "p2ivi0071", "p2ivi0072", "p2ivi0073", "p2ivi0074", "p2ivi0075",
  "p2ivi0076", "p2ivi0077", "p2ivi0078", "p2ivi0079", "p2ivi0080",
  "p2ivi0081", "p2ivi0082", "p2ivi0083", "p2ivi0084", "p2ivi0085",
  "p2ivi0086", "p2ivi0087", "p2ivi0088", "p2ivi0089", "p2ivi0090",
  "p2ivi0091", "p2ivi0092", "p2ivi0093", "p2ivi0094", "p2ivi0095",
  "p2ivi0096", "p2ivi0097", "p2ivi0098", "p2ivi0099", "p2ivi0100",
  "p2ivi0101", "p2ivi0102", "p2ivi0103", "p2ivi0104", "p2ivi0105",
  "p2ivi0106", "p2ivi0107", "p2ivi0108", "p2ivi0109", "p2ivi0110",
  "p2ivi0111", "p2ivi0112", "p2ivi0113", "p2ivi0114", "p2ivi0115",
  "p2ivi0116", "p2ivi0117", "p2ivi0118", "p2ivi0119", "p2ivi0120",
  "p2ivi0121", "p2ivi0122", "p2ivi0123", "p2ivi0124", "p2ivi0125",
  "p2ivi0126", "p2ivi0127", "p2ivi0128", "p2ivi0129", "p2ivi0130",
  "p2ivi0131", "p2ivi0132", "p2ivi0133", "p2ivi0134", "p2ivi0135",
  "p2ivi0136", "p2ivi0137", "p2ivi0138", "p2ivi0139", "p2ivi0140",
  "p2ivi0141", "p2ivi0142", "p2ivi0143", "p2ivi0144", "p2ivi0145",
  "p2ivi0146", "p2ivi0147", "p2ivi0148", "p2ivi0149", "p2ivi0150"
]

const Payment = ({ personalDetails, handleActiveTab }: any) => {
  const router = useRouter();
  const { paymentstatus } = router.query;
  const [isOpen, setIsOpen] = useState(false)
  const [codeAppliedSuccess, setCodeAppliedSuccess] = useState(false)
  const paymentDetails = [{ name: 'Application Fee', amount: '835 INR' }, { name: 'GST 18%', amount: '150 INR' }, { name: 'CCAvenue Processing Fee', amount: '15 INR' }]

  const renderCCAvenueGateway = async (data: any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/v2/ccavRequestHandler/`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        merchant_id: `${process.env.NEXT_PUBLIC_MERCHANT_ID}`,
        order_id: data.notes.receipt,
        currency: "INR",
        amount: data.amount,
        redirect_url: `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/v2/ccavResponseHandler/`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/application?paymentStatus=cancel`,
        language: "EN",
        billing_name: `${personalDetails.firstName ?? ''} ${personalDetails.lastName ?? ''}`,
        billing_address: ``,
        billing_city: personalDetails.city ?? '',
        billing_state: personalDetails.state ?? '',
        billing_zip: personalDetails.pinCode,
        billing_country: personalDetails.country,
        billing_tel: personalDetails?.phone ?? '',
        billing_email: personalDetails?.email ?? '',
        delivery_name: `${personalDetails.firstName ?? ''} ${personalDetails.lastName ?? ''}`,
        delivery_address: "",
        delivery_city: personalDetails.city ?? '',
        delivery_state: personalDetails.state ?? '',
        delivery_zip: personalDetails.pinCode,
        delivery_country: personalDetails.country,
        delivery_tel: personalDetails?.phone ?? '',
        merchant_param1: "ivi-application-fee",
        merchant_param2: "",
        merchant_param3: "",
        merchant_param4: "",
        merchant_param5: "",
        promo_code: "",
        customer_identifier: localStorage.getItem("userId") ?? "",
      }),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      console.log("RESPONSE", response)
      const htmlContent = await response.text();
      document.write(htmlContent);
      document.close();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    const id = uuid()
    const data = {
      notes: { receipt: id },
      amount: 1000,
    };
    localStorage.setItem("orderId", id)
    console.log("DATA>>>>>", data)
    renderCCAvenueGateway(data);
  };

  const handlePromoCode = (text: string) => {
    const id = uuid()
    if (promoCodes.includes(text)) {
      setCodeAppliedSuccess(true)
      localStorage.setItem("orderId", id)
      toast.success('Coupon code applied successfully 🎉')
      setTimeout(() => {
        router.push('/application-submitted')
      }, 5000)
    } else {
      toast.error('Please enter a valid coupon code!')
    }
  }

  const handleEnter = (e: any, text: string) => {
    if (e.keyCode === 13) {
      handlePromoCode(text)
    }
  }

  useEffect(() => {
    if (paymentstatus) {
      toast.error("Payment Failed. Please try again")
    }
  }, [paymentstatus])

  return (
    <>
      <AskToEditApplicationPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} handlePayment={handleClick} handleActiveTab={handleActiveTab} />
      <div className={styles.paymentDetailsCard}>
        <div className={styles.paymentDetailsText} style={{ paddingTop: "10px", paddingBottom: "20px" }}>
          Payment Details
        </div>
        {/* <div className={styles.ivi}>ivi</div>
        <div className={styles.IVentureImmersive}>I-Venture Immersive</div> */}
        <div className={styles.subText}>
          IVI Application Fee
        </div>
        <PromoCode handleEnter={handleEnter} onChange={(value) => handlePromoCode(value)} codeAppliedSuccess={codeAppliedSuccess} />
        {codeAppliedSuccess ? <div>
          <h2 style={{ color: "#999FA8", textAlign: "center", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} >You do not need to pay the fees now! <span style={{ marginTop: "-8px" }}> 🎉</span></h2>
        </div> : <div style={{ marginTop: "15px" }} >
          {
            paymentDetails.map((item) => {
              return <div key={item.name} className={styles.amountDetails}>
                <div>
                  {item?.name}
                </div>
                <div>
                  {item?.amount}
                </div>
              </div>
            })
          }
          <div className={styles.subTotal}>
            <div>Sub Total</div>
            <div>1000 INR</div>
          </div>
          <div style={{ marginTop: "60px" }}>
            <ButtonFill onClick={() => setIsOpen(true)} >Pay Now</ButtonFill>
          </div>
        </div>}
      </div>
    </>
  )
}

export default Payment