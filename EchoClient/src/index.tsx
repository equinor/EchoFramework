import EchoCore, { PanelHandler } from '@equinor/echo-core';
import { EchoContent, mainMenu, searchPanel } from '@equinor/echo-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import ModuleLoader from './components/moduleLoader';

PanelHandler.registerCorePanels(searchPanel, mainMenu);

const Echo: React.FC = (): JSX.Element => {
    const isAuthenticated = EchoCore.useEchoSetup({
        leftPanel: searchPanel,
        rightPanel: mainMenu
    });

    return (
        <>
            {isAuthenticated && (
                <EchoContent>
                    <ModuleLoader />
                </EchoContent>
            )}
        </>
    );
};

if (!(window !== window.parent && !window.opener)) {
    ReactDOM.render(<Echo />, document.getElementById('root'));
}
