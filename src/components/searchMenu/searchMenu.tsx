import React from 'react';
import style from './searchMenu.module.css';
const SearchMenu: React.FC = () => (
    <div className={style.panel}>
        <h3>SearchMenu</h3>
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

export default SearchMenu;
