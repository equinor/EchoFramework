import { Icon } from '@equinor/echo-components';
import { AppLink, AppLinkOptions, useInternalLink } from '@equinor/echo-core';
import React from 'react';
import { themeConst } from '../../../theme/themeConst';
import { removeSubsetOfKeys } from '../../../utils/appLinkUtils';
import style from './internalLinkButton.module.css';

export interface LinkButtonProps {
    appLink: AppLink;
}

const LinkButton: React.FC<LinkButtonProps> = ({ appLink }: LinkButtonProps) => {
    const { title, uri, icon } = appLink;
    const removeKeys = ['title', 'uri', 'icon'];
    const options: AppLinkOptions = removeSubsetOfKeys(appLink, removeKeys);
    const Link = useInternalLink();

    return (
        <button
            className={style.echoButton}
            onClick={(): void => {
                Link(uri, options);
            }}
            tabIndex={0}
        >
            {icon && <Icon color={themeConst.asBuilt} name={icon} title={title} />}
            <span>{title}</span>
        </button>
    );
};

export default LinkButton;
