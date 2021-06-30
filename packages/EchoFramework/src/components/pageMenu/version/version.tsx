import React, { useEffect, useState } from 'react';
import { getApiVersion, getAppVersion } from '../../../services/api/api-version';
import style from './version.module.css';

const Version: React.FC = () => {
    useEffect(() => {
        async function getVersions() {
            const apiVersionResult = await getApiVersion();
            const appVersionResult = await getAppVersion();
            if (apiVersionResult) setApiVersion(apiVersionResult);
            if (appVersionResult) setAppVersion(appVersionResult);
        }
        getVersions();
    }, []);

    const [appVersion, setAppVersion] = useState('');
    const [apiVersion, setApiVersion] = useState('');

    return (
        <div className={style.versionContainer}>
            <div>v{appVersion}</div>
            {navigator.onLine && <div>EchopediaAPI v{apiVersion}</div>}
        </div>
    );
};

export default Version;
