import { LoadingModuleOptions } from '@equinor/echo-base';
import '@equinor/echo-components/dist/index';
import EchoCore, { createEchoAppModuleApi } from '@equinor/echo-core';
import { EchoRouter, mainMenu, Mediator, searchPanel } from '@equinor/echo-framework';
import { Icon } from '@equinor/eds-core-react';
import * as Icons from '@equinor/eds-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { EchoApp } from './app';

const useEdsIcon = (): void => {
    Icon.add({
        ...Icons
    });
};

const Echo: React.FC = (): JSX.Element => {
    const isAuthenticated = EchoCore.useEchoSetup({
        leftPanel: searchPanel,
        rightPanel: mainMenu
    });
    useEdsIcon();
    const moduleOptions: LoadingModuleOptions = {
        createApi: createEchoAppModuleApi(),
        dependencies: {
            react: require('react'),
            'react-dom': require('react-dom'),
            '@equinor/echo-core': require('@equinor/echo-core'),
            '@equinor/echo-framework': require('@equinor/echo-framework')
        },
        fetchModules: () => {
            return new Promise((resolve, rejects) => {
                fetch('./echoModuleManifest.json').then((response) => {
                    response.json().then((manifests) => {
                        resolve(manifests);
                    });
                });
            });
        }
    };

    return (
        <>
            {isAuthenticated && (
                <EchoRouter>
                    <Mediator options={moduleOptions} />
                    <EchoApp />
                </EchoRouter>
            )}
        </>
    );
};

if (!(window !== window.parent && !window.opener)) {
    ReactDOM.render(<Echo />, document.getElementById('root'));
}
