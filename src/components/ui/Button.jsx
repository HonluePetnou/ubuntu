import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-yellow-400 text-green-900 hover:bg-yellow-300 focus:ring-yellow-500',
    secondary: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 focus:ring-yellow-500'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg'
  };
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;