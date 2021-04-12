import EchoCore, { useInitial } from '@equinor/echo-core';
import React from 'react';
import style from './loading.module.css';

const Loading: React.FC = () => {
    useInitial(() => {
        EchoCore.registerPanels();
    });

    return (
        <div className={style.panel}>
            <h3>Echo Module Development</h3>
            <h1>Loading Module...</h1>
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

export default Loading;
