import React from 'react';

const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  className = '',
  autoComplete,
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all';
  
  const stateClasses = error
    ? 'border-red-300 focus:ring-red-500'
    : 'border-gray-300';
  
  const disabledClasses = disabled
    ? 'bg-gray-100 cursor-not-allowed'
    : 'bg-white';
  
  const inputClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${icon ? 'pl-10' : ''} ${className}`.trim();

  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        autoComplete={autoComplete}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;