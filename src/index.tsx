import { PanelHandler } from '@equinor/echo-core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mainMenu, searchPanel } from './coreApplication/EchoContentPanels';
import './theme/theme.css';

PanelHandler.registerCorePanels(searchPanel, mainMenu);

ReactDOM.render(<App />, document.getElementById('root'));
