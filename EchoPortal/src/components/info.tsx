import EchoCore, { useInitial } from '@equinor/echo-core';
import React from 'react';
import style from './info.module.css';

const Info: React.FC = () => {
    useInitial(() => {
        EchoCore.registerPanels();
    });

    return (
        <div className={style.panel}>
            <h1>Echo Framework Demo</h1>
            <h3>PageMenu</h3>
            <p>
                process.env.PRODUCTION: <b>{process.env.PRODUCTION?.toString()}</b>
            </p>
            <p>
                process.env.NAME: <b>{process.env.NAME}</b>
            </p>
            <p>
                process.env.VERSION: <b>{process.env.VERSION}</b>
            </p>
        </div>
    );
};

export default Info;
