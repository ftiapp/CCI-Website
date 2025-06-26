'use client';

import { cn } from '@/lib/utils';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-2 font-prompt text-beige-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-2 border rounded-md font-prompt focus:outline-none focus:ring-2",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
            : "border-earth-200 focus:border-deeplake-500 focus:ring-deeplake-200",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
