import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input className={`input-field ${className}`} {...props} />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
