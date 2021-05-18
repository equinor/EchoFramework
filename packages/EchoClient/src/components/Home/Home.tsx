import { AppLinks, EchoLogo, Footer } from '@equinor/echo-framework';
import React from 'react';
import placeholderHomeImage from '../../images/frontpage-brand-placeholder.jpg';
import style from './home.module.css';

export const Home: React.FC = () => (
    <>
        <div className={style.wrapper}>
            <div>
                <EchoLogo />
            </div>
            <div>
                <h1 className={style.heading}>Echo Client </h1>
            </div>
        </div>
        <AppLinks isHome={true} />
        <div className={style.brandSliderContainer}>
            <img src={placeholderHomeImage} alt="Application Echo on tablet" />
        </div>
        <Footer />
    </>
);
