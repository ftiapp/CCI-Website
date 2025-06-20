'use client';

import { cn } from '@/lib/utils';

/**
 * RadioGroup Component
 * แสดงกลุ่มตัวเลือกแบบ radio button
 */
export default function RadioGroup({
  label,
  name,
  options = [],
  value,
  onChange,
  required = false,
  error,
  className = '',
  ...props
}) {
  // ฟังก์ชันช่วยเปรียบเทียบค่า value กับ option.value โดยไม่สนใจประเภทข้อมูล
  const isChecked = (optionValue, currentValue) => {
    if (optionValue === currentValue) return true;
    if (optionValue === '' && currentValue === '') return true;
    if (optionValue === null && currentValue === null) return true;
    if (optionValue === undefined && currentValue === undefined) return true;
    
    // แปลงเป็น string เพื่อเปรียบเทียบ
    return String(optionValue) === String(currentValue);
  };

  return (
    <div className="mb-4">
      {label && (
        <div className="block mb-2 font-prompt text-earth-800">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      )}
      <div className={cn("space-y-2", className)} {...props}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-beige-50">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked(option.value, value)}
                onChange={onChange}
                className="w-5 h-5 text-beige-600 border-2 border-earth-300 focus:ring-2 focus:ring-beige-500 focus:ring-offset-2 appearance-none rounded-full"
              />
              {isChecked(option.value, value) && (
                <div className="absolute w-2.5 h-2.5 bg-beige-600 rounded-full pointer-events-none"></div>
              )}
            </div>
            <span className="font-prompt text-earth-800">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500 font-prompt">{error}</p>}
    </div>
  );
}
