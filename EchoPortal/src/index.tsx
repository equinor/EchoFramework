import { PanelHandler } from '@equinor/echo-core';
import { mainMenu, searchPanel } from '@equinor/echo-framework';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './theme/theme.css';

PanelHandler.registerCorePanels(searchPanel, mainMenu);

ReactDOM.render(<App />, document.getElementById('root'));
