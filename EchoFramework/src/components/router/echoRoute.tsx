import { AppComponentProps } from '@equinor/echo-core/dist/types/api';
import { WrappedComponent } from '@equinor/echo-core/dist/types/components';
import React from 'react';
import { Route } from 'react-router-dom';
import { useLayout } from './useLayout';

interface EchoRouteProps {
    component: WrappedComponent<AppComponentProps>;
    layoutKey?: string;
    customLayout?: React.FC;
    path: string;
    key: string;
}

export const EchoRoute: React.FC<EchoRouteProps> = ({
    component: Component,
    layoutKey,
    customLayout,
    path,
    key
}: EchoRouteProps) => {
    const coreLayout = useLayout(layoutKey);
    const Layout = customLayout ? customLayout : coreLayout;
    console.log(path);
    return (
        <Route
            key={key}
            exact={true}
            path={path}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
};
