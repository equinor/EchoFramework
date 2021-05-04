import { RouteRegistration, useRoutes } from '@equinor/echo-core';
import React from 'react';
import { EchoRoute } from './echoRoute';
import { useLayout } from './useLayout';

type EchoRouterProps = RouteRegistration;

export const EchoRouter: React.FC = (): JSX.Element => {
    const routes = useRoutes();
    const getLayout = useLayout();
    return (
        <>
            {routes.map(({ path, component, layoutKey, key }: EchoRouterProps) => {
                return <EchoRoute key={key} path={path} component={component} layout={getLayout(layoutKey)} />;
            })}
        </>
    );
};
