'use client';

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Optionally log to an error reporting service
    // console.error('Boundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded p-4 font-prompt">
          <div className="text-red-700 font-semibold mb-1">เกิดข้อผิดพลาดในการโหลดส่วนแสดงผล</div>
          <div className="text-red-600 text-sm">โปรดลองรีเฟรชหน้าอีกครั้ง หรือกลับไปยังแท็บอื่นชั่วคราว</div>
        </div>
      );
    }
    return this.props.children;
  }
}
