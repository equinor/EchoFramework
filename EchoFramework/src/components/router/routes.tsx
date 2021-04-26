import React from 'react';
import { Switch } from 'react-router-dom';
import { EchoRoute } from './echoRoute';
import { LayoutType } from './useLayout';

interface EchoRoute {
    component: React.FC;
    layoutKey: LayoutType;
    url: string;
}

export const EchoRouter: React.FC = () => {
    const routes = useRoutes();
    return (
        <Switch>
            {routes.map(({ url, component, layoutKey }: EchoRoute) => {
                return <EchoRoute key={url} path={url} component={component} layoutKey={layoutKey} />;
            })}
        </Switch>
    );
};
EchoRouter.displayName = 'Routes';
