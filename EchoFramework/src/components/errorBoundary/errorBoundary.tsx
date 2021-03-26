import React, { ErrorInfo, ReactNode } from 'react';
import Error from './error';

interface Props {
    children?: React.ReactNode;
}

type State = {
    error: Error;
    errorInfo: ErrorInfo;
}

/**
 * @link https://reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: undefined!,
            errorInfo: undefined!
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error,
            errorInfo
        });
    }

    render(): JSX.Element | ReactNode {
        return this.state.error ? <Error error={this.state.error} errorInfo={this.state.errorInfo} /> : this.props.children;
    }
}

export default ErrorBoundary;
