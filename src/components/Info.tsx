import EchoCore, { useInitial } from '@equinor/echo-core';
import React from 'react';
import style from './Info.module.css';

const Info: React.FC = () => {
    useInitial(() => {
        EchoCore.registerPanels();
    });
    return (
        <div className={style.center}>
            <h1>Echo FrameWork</h1>

            <h3>Environmental variables:</h3>
            <p>
                process.env.PRODUCTION: <b>{process.env.PRODUCTION.toString()}</b>
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
