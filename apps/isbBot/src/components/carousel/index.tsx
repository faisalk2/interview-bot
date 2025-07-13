import React, { ReactNode } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './index.module.css'
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

type propType = {
    children: ReactNode;
}

const ReactCarousel = ({ children }: propType) => {

    const CustomDot = ({ onClick, ...rest }: any) => {
        const {
            active,
        } = rest;

        return (
            <div
                className={active ? styles.active : styles.inactive}
                onClick={() => onClick()}
            >
            </div>
        );
    };

    return (
        <Carousel
            responsive={responsive}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            customTransition="all .5"
            transitionDuration={500}
            arrows={false}
            customDot={<CustomDot />}
        >
            {children}
        </Carousel>
    )
}

export default ReactCarousel