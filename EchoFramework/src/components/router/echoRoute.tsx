import { AppComponentProps } from '@equinor/echo-core/dist/types/api';
import { WrappedComponent } from '@equinor/echo-core/dist/types/components';
import React from 'react';
import { Route } from 'react-router-dom';

interface EchoRouteProps {
    component: WrappedComponent<AppComponentProps>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layout: any;
    path: string;
}

export const EchoRoute: React.FC<EchoRouteProps> = ({ component: Component, layout: Layout, path }: EchoRouteProps) => {
    return (
        <Route
            exact={true}
            path={path}
            render={(props): JSX.Element => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
};
