import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-500 ${className}`}
      {...props}
    />
  );
}
