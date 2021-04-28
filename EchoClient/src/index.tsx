import { LoadingModuleOptions } from '@equinor/echo-base';
import '@equinor/echo-components/dist/index';
import EchoCore, { createEchoAppModuleApi } from '@equinor/echo-core';
import { EchoContent, EchoEventHandler, EchoRouter, mainMenu, Mediator, searchPanel } from '@equinor/echo-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Legend } from './components/legend';

const Echo: React.FC = (): JSX.Element => {
    const isAuthenticated = EchoCore.useEchoSetup({
        leftPanel: searchPanel,
        rightPanel: mainMenu
    });

    const moduleOptions: LoadingModuleOptions = {
        createApi: createEchoAppModuleApi(),
        fetchModules: () => Promise.resolve([])
    };

    return (
        <>
            {isAuthenticated && (
                <BrowserRouter>
                    <Mediator options={moduleOptions} />
                    <EchoEventHandler>
                        <EchoContent Legend={Legend}>
                            <Switch>
                                <EchoRouter />
                                {/* <Route exact path={'/'} component={ModuleLoader} /> */}
                            </Switch>
                            <Route render={(): JSX.Element => <Redirect to="/" />} />
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
