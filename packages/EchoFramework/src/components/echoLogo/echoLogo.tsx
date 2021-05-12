import React from 'react';
import style from './echoLogo.module.css';

interface Props {
    className?: string;
}

const EchoLogo: React.FC<Props> = ({ className }: Props) => {
    return (
        <span className={`${className} ${style.echoLogo}`}>
            Echo<span className={style.logoSubTitle}>inField</span>
        </span>
    );
};
export default EchoLogo;
