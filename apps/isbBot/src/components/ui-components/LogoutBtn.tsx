import React from 'react'
import logoutIcon from '../../assets/icons/logout.svg'
import styles from './index.module.css'
import Image from 'next/image'
const LogoutBtn = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={styles.signoutBtn}
            style={{
                border: "1px solid #E8ECEF",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                padding: '4px',
                // margin: 'auto'
            }}>
            <span style={{ paddingRight: '8px', display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                <Image src={logoutIcon} alt='icon' width={24} height={24} />
            </span>
            <span style={{
                marginRight: "10px",
                color: '#EE574D',
                fontFamily: "Roboto-regular",
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',

            }}>Sign Out</span>
        </button>
    )
}

export default LogoutBtn