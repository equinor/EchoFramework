import React from 'react';
import { FooterLogo } from '../../icons/equinor-logo';
import style from './footer.module.css';

export enum FooterType {
    normal = 'normal',
    termOfService = 'tos'
}

interface FooterProps {
    footerType?: FooterType;
}

export const Footer: React.FC<FooterProps> = ({ footerType }: FooterProps) => {
    const tosFooter = footerType === FooterType.termOfService;

    return (
        <footer className={`${style.echoFooter} ${tosFooter ? style.tosFooter : ''}`}>
            <p className={style.footerDisclaimer}>
                All information is proprietary of Equinor: © {new Date().getFullYear()} Equinor ASA
            </p>
            <div className={style.footerLogo}>
                <FooterLogo />
            </div>
        </footer>
    );
};
