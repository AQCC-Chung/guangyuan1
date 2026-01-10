import React from 'react';
import { Loader2 } from 'lucide-react';

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-card shadow-soft p-4 transition-all duration-200 active:scale-[0.98] ${className}`}
    >
      {children}
    </div>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-full font-medium transition-colors flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-amber-700 shadow-md shadow-amber-500/20",
    secondary: "bg-secondary text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20",
    outline: "border-2 border-primary text-primary bg-transparent",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg w-full"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

// --- Badge ---
interface BadgeProps {
  label: string;
  color?: 'green' | 'amber' | 'gray' | 'red';
}

export const Badge: React.FC<BadgeProps> = ({ label, color = 'gray' }) => {
  const colors = {
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    gray: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {label}
    </span>
  );
};

// --- Skeleton ---
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// --- Circular Progress Ring (Water Drop Metaphor) ---
interface ProgressRingProps {
  current: number;
  total: number;
  label: string;
  subLabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ current, total, label, subLabel }) => {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (current / total) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="#F3F4F6"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-primary"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-primary">{current}</span>
        <span className="text-xs text-gray-400">/ {total} 期</span>
      </div>
      <div className="mt-2 text-center">
        <div className="text-sm font-bold text-gray-800">{label}</div>
        {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
      </div>
    </div>
  );
};

// --- Currency Formatter ---
export const formatCurrency = (amount: number) => {
  return `NT$ ${amount.toLocaleString('zh-TW')}`;
};
