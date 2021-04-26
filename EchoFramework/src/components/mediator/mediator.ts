import React, { useEffect } from 'react';

export interface MediatorProps {
    options: string;
}

export interface AppLoading {}

export const Mediator: React.FC<MediatorProps> = ({ options }) => {
    useEffect(() => {
        const { connect, disconnect } = startLoadingApps(options);
        const notifier: AppLoading = (error, apps, loaded) => {
            initializeModules(!loaded, error, apps);
        };
        connect(notifier);
        return () => disconnect(notifier);
    }, []);
    return null;
};

function startLoadingApps(options: string): { connect: any; disconnect: any } {
    throw new Error('Function not implemented.');
}
function initializeModules(arg0: boolean, error: any, apps: any) {
    throw new Error('Function not implemented.');
}
