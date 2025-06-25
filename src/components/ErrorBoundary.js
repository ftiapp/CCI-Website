import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You can also log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary p-4 m-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-prompt text-red-700 mb-2">เกิดข้อผิดพลาดในการแสดงผล</h2>
          <p className="text-red-600 mb-4">กรุณารีเฟรชหน้าเว็บหรือติดต่อผู้ดูแลระบบ</p>
          <details className="bg-white p-2 rounded border border-red-100">
            <summary className="cursor-pointer text-sm text-gray-600">รายละเอียดข้อผิดพลาด (สำหรับผู้พัฒนา)</summary>
            <pre className="mt-2 text-xs text-gray-700 overflow-auto max-h-40">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-prompt py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            รีเฟรชหน้า
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
