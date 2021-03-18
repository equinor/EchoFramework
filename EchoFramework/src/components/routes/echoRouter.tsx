import { useGlobalState } from '@equinor/echo-core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getLayout } from './getLayout';

interface EchoRoute {
    component: React.FC;
    layoutKey: string;
    url: string;
}

function getRoutes(): EchoRoute[] {
    return [] as EchoRoute[];
}

export const EchoRouter: React.FC = () => {
    const routes = useGlobalState((s) => s.routes));
    return (
        <Switch>
            {routes.map(({ url, component, layoutKey }: EchoRoute) => {
                const Layout = getLayout(layoutKey);
                return (
                    <Layout>
                        <Route exact key={url} path={url} component={component} />;
                    </Layout>
                );
            })}
        </Switch>
    );
};
EchoRouter.displayName = 'Routes';
