import { LoadingModuleOptions } from '@equinor/echo-base';
import '@equinor/echo-components/dist/index';
import EchoCore, { createEchoAppModuleApi } from '@equinor/echo-core';
import { EchoContent, EchoEventHandler, EchoRouter, mainMenu, Mediator, searchPanel } from '@equinor/echo-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Legend } from './components/legend';

export const Not: React.FC = () => {
    return <h1>Module not found</h1>;
};

const Echo: React.FC = (): JSX.Element => {
    const isAuthenticated = EchoCore.useEchoSetup({
        leftPanel: searchPanel,
        rightPanel: mainMenu
    });

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
                    response.json().then((manifest) => {
                        const modules = [manifest];
                        resolve(modules);
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
                                <Route exact path={'/'} component={Not} />
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
