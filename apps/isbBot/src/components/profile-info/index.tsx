import Image from 'next/image'
import React from 'react'
import dummyImage from '../../assets/images/profileImage.png'
import { CapitalizeText } from '../../hooks/CapitalizeText'
import style from './index.module.css'

import StarRating from '../../UiComponents/StarRating'
const RenderProfileInto = ({ profileImage, name, rating, designation }: any) => {
  const image = profileImage ? profileImage : dummyImage?.src
  return (
    <div className={style.profileContainer}>
      <div  >

        <Image className={style.profileImage} src={image} height={90} width={90} alt='profile' />

      </div>
      <div className={style.name}>
        {name.toUpperCase()}
      </div>
      <div className={style.ProfileRating}>
        <StarRating
          value={rating}
          isEdit={false}
          count={5}
        />
      </div>
      <div className={style.designation}>{CapitalizeText(designation)}</div>
    </div>
  )
}

export default RenderProfileInto