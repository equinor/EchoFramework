import { TextIconButton } from '@equinor/echo-components';
import { AppLink, useInternalLink } from '@equinor/echo-core';
import React from 'react';

export interface LinkButtonProps {
    appLink: AppLink;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ appLink }: LinkButtonProps) => {
    const { name, path, icon, isVisible } = appLink;
    const link = useInternalLink();

    if (isVisible ? isVisible() : true) {
        return (
            <TextIconButton
                onClick={(): void => {
                    link(path, appLink);
                }}
                icon={icon}
                title={name}
            />
        );
    }

    return <></>;
};

export default LinkButton;
