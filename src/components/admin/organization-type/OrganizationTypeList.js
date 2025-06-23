'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function OrganizationTypeList({ organizationTypes, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const itemsPerPage = 10;
  
  // Filter and sort organization types when search term changes
  useEffect(() => {
    const filtered = organizationTypes.filter(type => 
      type.name_th.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.name_en.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort by Thai name (ก-ฮ)
    const sorted = [...filtered].sort((a, b) => a.name_th.localeCompare(b.name_th, 'th'));
    
    setFilteredTypes(sorted);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, organizationTypes]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTypes.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  if (organizationTypes.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 font-prompt">ไม่พบข้อมูลประเภทธุรกิจ</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-earth-500 focus:border-earth-500 sm:text-sm font-prompt"
          placeholder="ค้นหาประเภทธุรกิจ..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-earth-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium font-prompt text-earth-800 uppercase tracking-wider">
                ลำดับ
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium font-prompt text-earth-800 uppercase tracking-wider">
                ชื่อประเภทธุรกิจ (ภาษาไทย)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium font-prompt text-earth-800 uppercase tracking-wider">
                ชื่อประเภทธุรกิจ (ภาษาอังกฤษ)
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium font-prompt text-earth-800 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((type, index) => (
                <tr key={type.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-prompt text-gray-900">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-prompt text-gray-900">
                    {type.name_th}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-prompt text-gray-900">
                    {type.name_en}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(type)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="แก้ไข"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(type.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="ลบ"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm font-prompt text-gray-500">
                  ไม่พบข้อมูลที่ตรงกับการค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-prompt ${currentPage === number
                  ? 'z-10 bg-earth-50 border-earth-500 text-earth-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
