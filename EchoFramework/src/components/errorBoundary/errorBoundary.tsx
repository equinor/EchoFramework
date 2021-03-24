import React, { ErrorInfo, ReactNode } from 'react';
import Error from './error';

interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }
    
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {}

    render(): JSX.Element | ReactNode {
        return this.state.hasError ? <Error /> : this.props.children;
    }
}

export default ErrorBoundary;
