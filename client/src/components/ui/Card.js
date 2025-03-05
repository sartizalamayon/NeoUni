// src/components/ui/Card.js

import React from 'react';

export default function Card({ 
  children, 
  title, 
  className = '', 
  headerAction,
  noPadding = false
}) {
  return (
    <div className={`bg-white dark:bg-[#2d2d42] rounded-lg shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
}