import React from 'react';

const Input = ({ 
  label,
  error,
  helperText,
  required = false,
  className = '',
  ...props 
}) => {
  const inputClasses = `input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;