import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { toastStyle } from './utils';

export default function SearchForm({ 
  searchQuery, 
  setSearchQuery, 
  isSearching, 
  onSearch, 
  searchInputRef 
}) {
  
  // Auto-focus on search input when component mounts
  React.useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={onSearch} className="mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาด้วยรหัสลงทะเบียน (CCI-XXXXXX) หรือ ชื่อ-นามสกุล"
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 font-prompt"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        
        <button
          type="submit"
          disabled={isSearching}
          className="bg-earth-600 hover:bg-earth-700 text-white font-prompt font-medium px-6 py-3 rounded-lg transition-colors"
        >
          {isSearching ? 'กำลังค้นหา...' : 'ค้นหา'}
        </button>
        
      </div>
    </form>
  );
}