import EchoCore from '@equinor/echo-core';
import { mainMenu, searchPanel } from '@equinor/echo-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import './theme/theme.css';

const Echo: React.FC = () => {
    const isAuthenticated = EchoCore.useEchoSetup({
        leftPanel: searchPanel,
        rightPanel: mainMenu
    });

    return <>{isAuthenticated ? <h1>hello there</h1> : <h1>OhhNoo</h1>}</>;
};

if (!(window !== window.parent && !window.opener)) {
    ReactDOM.render(<Echo />, document.getElementById('root'));
}
