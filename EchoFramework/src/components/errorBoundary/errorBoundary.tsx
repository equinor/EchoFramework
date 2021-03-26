import React, { ErrorInfo, ReactNode } from 'react';
import Error from './error';

interface Props {
    children?: React.ReactNode;
}

type State = {
    error: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: undefined!
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { error: error };
    }
    
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {}

    render(): JSX.Element | ReactNode {
        return this.state.error ? <Error error={this.state.error} /> : this.props.children;
    }
}

export default ErrorBoundary;
