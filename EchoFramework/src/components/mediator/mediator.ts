import { EchoModulesLoading, LoadingModuleOptions, startLoadingModules } from '@equinor/echo-base';
import { initializeModules } from '@equinor/echo-core';
import React, { useEffect } from 'react';

export interface MediatorProps {
    options: LoadingModuleOptions;
}

export interface AppLoading {}

export const Mediator: React.FC<MediatorProps> = ({ options }) => {
    useEffect(() => {
        const { connect, disconnect } = startLoadingModules(options);
        const notifier: EchoModulesLoading = (error, modules, loaded) => {
            initializeModules(loaded, error, modules);
        };
        connect(notifier);
        return () => disconnect(notifier);
    }, []);
    return null;
};
