import React, { Component } from "react";
import styles from "./main.module.scss";

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
          <h1 className={styles.style}>Something went wrong</h1>
          <p className={styles.pStyle}>Error has occurred.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
