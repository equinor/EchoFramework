import { Icon } from '@equinor/echo-components';
import { AppLink, useInternalLink } from '@equinor/echo-core';
import React from 'react';
import { themeConst } from '../../../theme/themeConst';
import style from './internalLinkButton.module.css';

export interface LinkButtonProps {
    appLink: AppLink;
}

const LinkButton: React.FC<LinkButtonProps> = ({ appLink }: LinkButtonProps) => {
    const { name, path, icon, isVisible } = appLink;
    const link = useInternalLink();

    if (isVisible ? isVisible() : true) {
        return (
            <button
                className={style.echoButton}
                onClick={(): void => {
                    link(path, appLink);
                }}
                tabIndex={0}
            >
                {icon && <Icon color={themeConst.asBuilt} name={icon} title={name} />}
                <span>{name}</span>
            </button>
        );
    }

    return <></>;
};

export default LinkButton;
