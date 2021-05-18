import React from 'react';
import { AppLinks } from '../../appLinks';
import style from './applicationList.module.css';

const ApplicationList: React.FC = () => {
    return (
        <div className={style.applicationListContainer}>
            <div className={style.applicationButtonGroup}>
                <h4>Echo Applications</h4>
                <AppLinks />
            </div>
        </div>
    );
};

export default ApplicationList;
