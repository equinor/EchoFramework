import { BaseError } from '@equinor/echo-core';
import React, { ErrorInfo, ReactNode } from 'react';
import Error from './error';

interface Props {
    children?: ReactNode;
    logError?: (error: BaseError) => void;
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

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
        this.tryLogError();
    }

    private tryLogError() {
        if (this.props.logError) {
            const { logError } = this.props;
            const error = this.createError();
            logError(error);
        }
    }

    private createError(): BaseError {
        const { message } = this.state.error;
        const error = new BaseError(message);
        return error;
    }

    render(): JSX.Element | ReactNode {
        return this.state.error ? <Error error={this.state.error} errorInfo={this.state.errorInfo} /> : this.props.children;
    }
}

export default ErrorBoundary;
