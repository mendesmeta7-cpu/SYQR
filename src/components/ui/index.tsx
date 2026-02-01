import React, { forwardRef } from 'react';
import './ui.css';

// --- Card Component ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string; // Allow custom classes
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className = '', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`glass-panel p-6 animate-fade-in ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', fullWidth = false, className = '', ...props }, ref) => {
        // Construct class name
        const variantClass = `btn-${variant}`;
        const widthClass = fullWidth ? 'btn-full' : '';

        return (
            <button
                ref={ref}
                className={`btn ${variantClass} ${widthClass} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

// --- Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, ...props }, ref) => {
        return (
            <div className="form-group">
                <label htmlFor={id} className="form-label">
                    {label}
                </label>
                <input
                    ref={ref}
                    id={id}
                    className={`form-input ${error ? 'border-red' : ''} ${className}`}
                    autoComplete="off"
                    {...props}
                />
                {error && <span className="form-error">{error}</span>}
            </div>
        );
    }
);
Input.displayName = "Input";

// --- Select Component ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, className = '', id, ...props }, ref) => {
        return (
            <div className="form-group">
                <label htmlFor={id} className="form-label">
                    {label}
                </label>
                <div className="select-wrapper relative">
                    <select
                        ref={ref}
                        id={id}
                        className={`form-select ${className}`}
                        {...props}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-navy">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="select-arrow">▼</div>
                </div>
            </div>
        );
    }
);
Select.displayName = "Select";
