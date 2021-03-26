import { BaseError } from '@equinor/echo-core';
import React, { ErrorInfo, ReactNode } from 'react';
import Error from './error';

interface Props {
    children?: ReactNode;
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
        this.setState({ error, errorInfo });
        this.createBaseError();
    }

    private createBaseError(): void {
        const { message } = this.state.error;
        const baseError = new BaseError(message);
    }

    render(): JSX.Element | ReactNode {
        return this.state.error ? <Error error={this.state.error} errorInfo={this.state.errorInfo} /> : this.props.children;
    }
}

export default ErrorBoundary;
