import Image from 'next/image';
import React, { useState } from 'react'
import StarRating from '../../UiComponents/StarRating';
import style from './index.module.css'
import chatEndIcon1 from '../../assets/images/chatEndIcon1.png'
import chatEndIcon2 from '../../assets/images/chatEndIcon2.png'
import { useLocalization } from '../../hooks/useLocatization';

const RatingScreen = (props: any) => {
        const {sendMessage}=props
    const [rated, setRated] = useState(false)
    const t = useLocalization();

    const handleSend=(rating:string)=>{
        sendMessage(rating)
    }

    return (
        <div className={style.RatingScreenContainer}>
            <div>
                {!rated ? <Image src={chatEndIcon1.src} alt='img' width={200} height={200} /> : <Image src={chatEndIcon2.src} alt='img' width={130} height={130} />}
            </div>
            <div className={style.message}>{rated ?

                <div>
                    <div className={style.mainText}>{t("label.thankyou")}</div>
                    <div className={style.subText}>{t("message.thankyou_text")}</div>
                </div> :

                <div>
                    <div className={style.mainText}>{t("message.experience_text")}</div>
                    <div className={style.subText}>
                    {t("message.feedback_text")}
                    </div>
                </div>}</div>
            <div className={style.ratingStarBox}>
                <StarRating
                    count={5}
                    onChange={(number: number) => {
                        handleSend(number.toString())
                        setRated(true)
                    }}
                    size={30}
                />
            </div>
        </div>

    )
}

export default RatingScreen