import { BaseError } from '@equinor/echo-core';
import React, { ErrorInfo, ReactNode } from 'react';
import Error from './error';

interface Props {
    children?: ReactNode;
    logError?: (error: Error) => void;
}

type State = {
    error: Error | any;
    errorInfo: ErrorInfo | any;
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
        if (this.props.logError) this.logError();
    }

    private logError() {
        const error = this.createError();
        this.props.logError!(error);
    }

    private createError(): Error {
        const { error, errorInfo } = this.state;
        const _error = new BaseError(error.message, error);
        _error.addProperties(errorInfo);
        return _error;
    }

    render(): JSX.Element | ReactNode {
        const { error, errorInfo } = this.state;
        return error ? <Error error={error} errorInfo={errorInfo} /> : this.props.children;
    }
}

export default ErrorBoundary;
