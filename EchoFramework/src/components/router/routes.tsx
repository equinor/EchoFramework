import { RouteRegistration, useRoutes } from '@equinor/echo-core';
import React from 'react';
import { EchoRoute } from './echoRoute';

type EchoRouterProps = RouteRegistration;

export const EchoRouter: React.FC = (): JSX.Element => {
    const routes = useRoutes();
    return (
        <>
            {routes.map(({ path, component, layoutKey, key }: EchoRouterProps) => {
                return <EchoRoute key={key} path={path} component={component} layoutKey={layoutKey} />;
            })}
        </>
    );
};
