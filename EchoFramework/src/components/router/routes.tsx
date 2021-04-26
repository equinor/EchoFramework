import { RouteRegistration, useRoutes } from '@equinor/echo-core';
import React from 'react';
import { Switch } from 'react-router-dom';
import { EchoRoute } from './echoRoute';

interface EchoRoute {
    component: React.FC;
    layoutKey?: string;
    url: string;
}

export const EchoRouter: React.FC = () => {
    const routes = useRoutes();
    return (
        <Switch>
            {routes.map(({ url, component, layoutKey }: RouteRegistration) => {
                return <EchoRoute key={url} path={url} component={component} layoutKey={layoutKey} />;
            })}
        </Switch>
    );
};
EchoRouter.displayName = 'Routes';
