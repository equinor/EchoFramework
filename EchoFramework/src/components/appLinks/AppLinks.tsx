import { AppLinksFilter, useAppLinks } from '@equinor/echo-core';
import React from 'react';
import style from './AppLinks.module.css';
import LinkButton from './linkButton/linkButton';

interface AppLinksProps {
    filter?: AppLinksFilter;
}

export enum InstallationsWithPanorama {
    JCA = 'JCA'
}

const AppLinks: React.FC<AppLinksProps> = ({ filter }: AppLinksProps) => {
    const appLinks = useAppLinks(filter);
    const apps = Object.keys(appLinks);
    return (
        <div className={style.AppBar}>
            {apps.map((appKey) => {
                const appLink = appLinks[appKey];
                return <LinkButton appLink={appLink} />;
            })}
        </div>
    );
};

export default AppLinks;
