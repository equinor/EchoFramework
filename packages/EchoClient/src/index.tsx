import { LoadingModuleOptions } from '@equinor/echo-base';
import '@equinor/echo-components/dist/index';
import EchoCore, { createEchoAppModuleApi } from '@equinor/echo-core';
import {
    DefaultLayout,
    EchoContent,
    EchoEventHandler,
    EchoRoute,
    EchoRouter,
    mainMenu,
    Mediator,
    searchPanel
} from '@equinor/echo-framework';
import { Icon } from '@equinor/eds-core-react';
import * as Icons from '@equinor/eds-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Legend } from './components/legend';

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
                <BrowserRouter>
                    <Mediator options={moduleOptions} />
                    <EchoEventHandler>
                        <EchoContent Legend={Legend}>
                            <Switch>
                                <EchoRoute path={'/'} component={Home} layout={DefaultLayout} />
                                <EchoRouter />
                                <Route render={(): JSX.Element => <Redirect to="/" />} />
                            </Switch>
                        </EchoContent>
                    </EchoEventHandler>
                </BrowserRouter>
            )}
        </>
    );
};

if (!(window !== window.parent && !window.opener)) {
    ReactDOM.render(<Echo />, document.getElementById('root'));
}
