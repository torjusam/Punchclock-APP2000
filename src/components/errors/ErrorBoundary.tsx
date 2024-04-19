/**
 * @file error boundary code
 * @module Error
 * @Author Ask I.P Aspholm
 */

import React, {ErrorInfo, ReactNode} from 'react';

interface ErrorBoundaryProps {
    fallback: ReactNode;
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    public state: State = {
        hasError: false
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;

        }
        return this.props.children;

    }
}

export default ErrorBoundary;