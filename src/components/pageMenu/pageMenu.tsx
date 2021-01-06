import React from 'react';
import style from './pageMenu.module.css';

const PageMenu: React.FC = () => (
    <div className={style.panel}>
        <h3>PageMenu</h3>
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

export default PageMenu;
