import React, { useState } from 'react'
import Menu from '../../assets/icons/menu.svg'
import NavIcon from '../../assets/icons/navIcon.svg'
import ISBLogo from "../../assets/images/isbLogo.png"
import Image from 'next/image'
import styles from './index.module.css'
import { useLocalization } from '../../hooks/useLocatization'
import LanguagePopup from './LanguagePopup'
import logo from "../../assets/svg/iviLogoTopBar.svg"
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const t = useLocalization();
    const bankName = t('label.indian_bank')

    return (
        <div
            className={styles.container}
        >
            <Image src={logo} height={30} alt='logo' />
            <Image src={ISBLogo.src} height={30} width={66} alt='menu' className={styles.menu} />
        </div>
    )
}

export default Navbar