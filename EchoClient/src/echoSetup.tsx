import { Panel } from '@equinor/echo-core';
import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';

export type AnyComponent<T> = ComponentType<T>;

export interface EchoApp {
    authenticated: boolean;
}

export interface EchoSetupOptions {
    App: AnyComponent<EchoApp>;
    rootElementId: string;
    rootLoadingElementId: string;
    leftPanel: Panel;
    rightPanel: Panel;
    authProviderLogFunc?: (...args: unknown[]) => void;
}

export default async function echoSetup(App: React.FC<{}>, rootElementId: string): Promise<void> {
    if (!(window !== window.parent && !window.opener)) {
        ReactDOM.render(<App />, document.getElementById(rootElementId));
    }
}

function removeElementById(id: string) {
    document.getElementById(id)?.remove();
}
