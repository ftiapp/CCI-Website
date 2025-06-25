'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchableSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  required = false,
  className = '',
  allowOther = false,
  otherValue = '',
  otherName = '',
  onOtherChange = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dropdownRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const PAGE_SIZE = 10; // จำนวนตัวเลือกที่จะโหลดในแต่ละครั้ง
  
  // Get selected option label
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';
  
  // Load more options when scrolling
  const loadMoreOptions = useCallback(() => {
    if (!hasMore) return;
    
    // เพิ่มการหน่วงเวลาเล็กน้อยเพื่อให้ UI ไม่กระตุก
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = nextPage * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const nextBatch = filteredOptions.slice(startIndex, endIndex);
      
      if (nextBatch.length > 0) {
        setVisibleOptions(prev => [...prev, ...nextBatch]);
        setPage(nextPage);
      }
      
      if (endIndex >= filteredOptions.length) {
        setHasMore(false);
      }
    }, 50); // เพิ่มการหน่วงเวลา 50ms เพื่อให้ UI ตอบสนองได้ดีขึ้น
  }, [filteredOptions, hasMore, page, PAGE_SIZE]);
  
  // Handle scroll event for infinite scrolling
  const handleScroll = useCallback(() => {
    if (!optionsContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = optionsContainerRef.current;
    
    // Load more when user scrolls to bottom (with a 20px threshold)
    if (scrollHeight - scrollTop - clientHeight < 20 && hasMore) {
      loadMoreOptions();
    }
  }, [loadMoreOptions, hasMore]);
  
  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      const filtered = options.filter(option => 
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setVisibleOptions(filtered.slice(0, PAGE_SIZE));
      setPage(0);
      setHasMore(filtered.length > PAGE_SIZE);
    }, 300); // 300ms debounce delay
    
    setDebounceTimeout(newTimeout);
  };
  
  // Handle option selection
  const handleOptionSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
    setSearchTerm('');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Initialize visible options and add scroll event listener
  useEffect(() => {
    if (isOpen && optionsContainerRef.current) {
      optionsContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (optionsContainerRef.current) {
          optionsContainerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [isOpen, handleScroll]);
  
  // กรองข้อมูลซ้ำออกจากตัวเลือก
  const removeDuplicateOptions = useCallback((optionsArray) => {
    // ใช้ Map เพื่อกรองข้อมูลซ้ำโดยใช้ value เป็น key
    return Array.from(
      new Map(optionsArray.map(option => [option.value, option])).values()
    );
  }, []);
  
  // Initialize state when component mounts
  useEffect(() => {
    // กรองข้อมูลซ้ำออกก่อนตั้งค่า state
    const uniqueOptions = removeDuplicateOptions(options);
    setFilteredOptions(uniqueOptions);
    setVisibleOptions(uniqueOptions.slice(0, PAGE_SIZE));
    setPage(0);
    setHasMore(uniqueOptions.length > PAGE_SIZE);
  }, [options, PAGE_SIZE, removeDuplicateOptions]);
  
  // Force update visible options when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // When dropdown opens, make sure options are visible
      setFilteredOptions(options);
      setVisibleOptions(options.slice(0, PAGE_SIZE));
      setPage(0);
      setHasMore(options.length > PAGE_SIZE);
    }
  }, [isOpen, options, PAGE_SIZE]);
  
  // Reset search term when dropdown closes and initialize options when dropdown opens
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setFilteredOptions(options);
      setVisibleOptions(options.slice(0, PAGE_SIZE));
      setPage(0);
      setHasMore(options.length > PAGE_SIZE);
    } else {
      // When dropdown opens, initialize with the first batch of options
      setFilteredOptions(options);
      setVisibleOptions(options.slice(0, PAGE_SIZE));
      setPage(0);
      setHasMore(options.length > PAGE_SIZE);
    }
  }, [isOpen, options, PAGE_SIZE]);
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        {/* Selected value display */}
        <div
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-beige-500 cursor-pointer flex justify-between items-center ${
            error ? 'border-red-500' : 'border-beige-300'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={displayValue ? 'text-earth-800' : 'text-gray-400'}>
            {displayValue || placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-beige-300 rounded-md shadow-lg max-h-80">
            {/* Search input */}
            <div className="sticky top-0 bg-white p-2 border-b border-beige-200 z-10">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-beige-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-beige-500 pl-9"
                  placeholder="ค้นหา..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-2 top-2.5" />
              </div>
            </div>
            
            {/* Options list with infinite scroll */}
            <div 
              ref={optionsContainerRef}
              className="overflow-auto max-h-60 border-t border-beige-100"
            >
              {/* ใช้ Set เพื่อเก็บค่าที่แสดงแล้วเพื่อป้องกันการแสดงซ้ำ */}
              {visibleOptions.length > 0 ? (
                // ใช้ Set เพื่อกรองตัวเลือกที่ซ้ำกันออกไป
                Array.from(new Map(visibleOptions.map(option => [option.value, option])).values())
                  .map((option) => (
                    <div
                      key={`option-${option.value}`}
                      className={`px-3 py-2 cursor-pointer hover:bg-beige-50 ${
                        option.value === value ? 'bg-beige-100 font-medium' : ''
                      }`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      <div className="truncate">{option.label}</div>
                    </div>
                  ))
              ) : (
                <div className="px-3 py-2 text-gray-500">ไม่พบตัวเลือกที่ตรงกับการค้นหา</div>
              )}
              
              {/* Loading indicator */}
              {hasMore && (
                <div className="px-3 py-2 text-center text-sm text-gray-500">
                  กำลังโหลดตัวเลือกเพิ่มเติม...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Other input field */}
      {allowOther && (
        <div className="mt-2">
          <input
            type="text"
            name={otherName}
            value={otherValue}
            onChange={onOtherChange}
            placeholder={placeholder || "โปรดระบุ"}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-beige-500 ${
              error ? 'border-red-500' : 'border-beige-300'
            }`}
          />
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
