import * as React from 'react';
import { Route, RouteComponentProps, Switch, SwitchProps } from 'react-router';
import { useGlobalState } from '../hooks';

/**
 * The props used by the PiralRoutes component.
 */
export interface RoutesProps extends SwitchProps {
    /**
     * Sets the component for showing the not found page.
     */
    NotFound: React.ComponentType<RouteComponentProps>;
}

/**
 * The component for defining the exclusive routes to be used.
 */
export const PiralRoutes: React.FC<RoutesProps> = ({ NotFound, ...props }) => {
    const apps = useGlobalState((s) => s.registry.apps);

    return (
        <Switch {...props}>
            {Object.keys(apps).map((url) => (
                <Route exact key={url} path={url} component={apps[url].component} />
            ))}
            <Route component={NotFound} />
        </Switch>
    );
};
PiralRoutes.displayName = 'Routes';
