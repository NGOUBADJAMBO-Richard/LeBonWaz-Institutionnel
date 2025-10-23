import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
