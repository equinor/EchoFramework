import '@equinor/echo-components/dist/index';
import { EchoContent, EchoEventHandler, EchoRoutes } from '@equinor/echo-framework';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './components/home/home';
import { Legend } from './components/legend';

export const EchoApp: React.FC = (): JSX.Element => {
    return (
        <>
            <EchoEventHandler>
                <EchoContent Legend={Legend}>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <EchoRoutes />
                        <Route render={(): JSX.Element => <Redirect to="/" />} />
                    </Switch>
                </EchoContent>
            </EchoEventHandler>
        </>
    );
};
