import React from 'react';

export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
