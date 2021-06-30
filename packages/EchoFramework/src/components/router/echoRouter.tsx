import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

interface EchoWrapperProps {
    children: React.ReactNode;
}

export const EchoRouter: React.FC<EchoWrapperProps> = ({ children }: EchoWrapperProps): JSX.Element => {
    return (
        <>
            <Router history={createBrowserHistory()}>{children}</Router>
        </>
    );
};
