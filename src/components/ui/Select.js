'use client';

import { cn } from '@/lib/utils';

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  placeholder,
  className = '',
  ...props
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-2 font-prompt text-earth-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full px-4 py-2 border rounded-md font-prompt focus:outline-none focus:ring-2 bg-white",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
            : "border-earth-200 focus:border-beige-500 focus:ring-beige-200",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
