import '@equinor/echo-components/dist/index';
import EchoCore from '@equinor/echo-core';
import { EchoContent, mainMenu, searchPanel } from '@equinor/echo-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import ModuleLoader from './components/moduleLoader';

const Echo: React.FC = (): JSX.Element => {
    const isAuthenticated = EchoCore.useEchoSetup({
        leftPanel: searchPanel,
        rightPanel: mainMenu
    });

    return (
        <>
            {isAuthenticated && (
                <BrowserRouter>
                    <EchoContent>
                        <Route exact path={'/'} component={ModuleLoader} />
                    </EchoContent>
                    <Route render={(): JSX.Element => <Redirect to="/" />} />
                </BrowserRouter>
            )}
        </>
    );
};

if (!(window !== window.parent && !window.opener)) {
    ReactDOM.render(<Echo />, document.getElementById('root'));
}
