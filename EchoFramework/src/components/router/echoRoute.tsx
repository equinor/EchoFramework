import React from 'react';
import { Route } from 'react-router-dom';
import { LayoutType, useLayout } from './useLayout';

interface EchoRouteProps {
    component: React.FC<any>;
    layoutKey?: LayoutType;
    customLayout?: React.FC;
    path: string;
}

export const EchoRoute: React.FC<EchoRouteProps> = ({ component: Component, layoutKey, customLayout, ...rest }) => {
    const coreLayout = useLayout(layoutKey);
    const Layout = customLayout ? customLayout : coreLayout;
    return (
        <Route
            exact
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
};
