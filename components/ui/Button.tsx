
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  let baseStyles = 'flex items-center justify-center font-semibold rounded-xl transition-colors duration-200';
  
  // Variant styles
  if (variant === 'primary') {
    baseStyles += ' bg-[#FF6B00] text-white hover:bg-orange-600';
  } else if (variant === 'secondary') {
    baseStyles += ' bg-gray-200 text-gray-800 hover:bg-gray-300';
  } else if (variant === 'outline') {
    baseStyles += ' border border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50';
  }

  // Size styles
  if (size === 'sm') {
    baseStyles += ' px-3 py-1.5 text-sm';
  } else if (size === 'md') {
    baseStyles += ' px-4 py-2 text-base';
  } else if (size === 'lg') {
    baseStyles += ' px-6 py-3 text-lg';
  }

  if (fullWidth) {
    baseStyles += ' w-full';
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
