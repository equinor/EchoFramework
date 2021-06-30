import { setActiveModulePanels, useInitial } from '@equinor/echo-core';
import React from 'react';
import { getKeyFromPath } from '../../utils/eventHandlerUtils';

interface EchoWrapperProps {
    children: React.ReactNode;
    path: string;
}

export const EchoWrapper: React.FC<EchoWrapperProps> = ({ children, path }: EchoWrapperProps): JSX.Element => {
    useInitial(() => {
        setActiveModulePanels(getKeyFromPath(path));
        return (): void => {
            setActiveModulePanels('');
        };
    });
    return <>{children}</>;
};
