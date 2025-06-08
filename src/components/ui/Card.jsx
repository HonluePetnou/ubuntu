import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '', 
  padding = 'md',
  ...props 
}) => {
  const baseClasses = 'rounded-lg backdrop-blur-sm transition-all duration-300';
  
  const variants = {
    default: 'bg-white/10 border border-white/20',
    glass: 'bg-white/5 border border-white/10',
    solid: 'bg-white shadow-lg border border-gray-200',
    dark: 'bg-gray-800 border border-gray-700 text-white'
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${className}
  `.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;