import { useAppLinks } from '@equinor/echo-core';
import React from 'react';
import style from './AppLinks.module.css';
import LinkButton from './linkButton/linkButton';

interface AppLinksProps {
    isHome?: boolean;
}

const AppLinks: React.FC<AppLinksProps> = ({ isHome }: AppLinksProps) => {
    const appLinks = useAppLinks(isHome);
    return (
        <div className={style.AppBar}>
            {appLinks.map((appLink, index) => (
                <LinkButton key={appLink.name + index} appLink={appLink} />
            ))}
        </div>
    );
};

export default AppLinks;
