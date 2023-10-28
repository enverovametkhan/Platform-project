import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });

    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>Error has occurred.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
