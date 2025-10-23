import React from 'react';

const Select = ({ 
  label, 
  error, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Sélectionner...', 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const selectClasses = `
    w-full px-4 py-2 border rounded-lg transition-colors
    focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${className}
  `;
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={selectClasses}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'string' ? option : option.value}>
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;