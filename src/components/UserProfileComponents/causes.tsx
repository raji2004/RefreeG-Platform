import { PlusIcon, LucideTrash } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Causes() {
  const [causesData, setCausesData] = useState([
    { id: 1, name: "Send Children to School", metrics: "₦100,000", status: "Pending" },
    { id: 2, name: "Provide Books for Students", metrics: "Books", status: "Approved" },
    { id: 3, name: "Build a New School", metrics: "₦250,000", status: "Completed" },
    { id: 4, name: "Scholarships for Girls", metrics: "₦150,000", status: "Pending" },
    { id: 5, name: "Donate to the Homeless Shelter", metrics: "₦200,000", status: "Approved" },
    { id: 6, name: "Food for Orphanages", metrics: "Food", status: "Completed" },
    { id: 7, name: "Support Local Farmers", metrics: "₦50,000", status: "Pending" },
    { id: 8, name: "Clean Water for Rural Areas", metrics: "₦300,000", status: "Approved" },
    { id: 9, name: "Empower Women in Tech", metrics: "₦120,000", status: "Pending" },
    { id: 10, name: "Medical Aid for Children", metrics: "₦180,000", status: "Completed" },
    { id: 11, name: "New Classroom Desks", metrics: "₦80,000", status: "Approved" },
    { id: 12, name: "Solar Panels for Schools", metrics: "₦400,000", status: "Pending" },
    { id: 13, name: "Build a New School", metrics: "₦250,000", status: "Completed" },
    { id: 14, name: "Scholarships for Girls", metrics: "₦150,000", status: "Pending" },
    { id: 15, name: "Donate to the Homeless Shelter", metrics: "₦200,000", status: "Approved" },
    { id: 16, name: "Food for Orphanages", metrics: "Food", status: "Completed" },
    { id: 17, name: "Support Local Farmers", metrics: "₦50,000", status: "Pending" },
    { id: 18, name: "Clean Water for Rural Areas", metrics: "₦300,000", status: "Approved" },
    { id: 19, name: "Empower Women in Tech", metrics: "₦120,000", status: "Pending" },
    { id: 20, name: "Medical Aid for Children", metrics: "₦180,000", status: "Completed" },
    { id: 21, name: "New Classroom Desks", metrics: "₦80,000", status: "Approved" },
    { id: 22, name: "Solar Panels for Schools", metrics: "₦400,000", status: "Pending" },
  
  ]);

  const [selectedCauses, setSelectedCauses] = useState<boolean[]>(new Array(causesData.length).fill(false));
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const causesPerPage = 10; // Limit causes per page

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectedCauses(new Array(causesData.length).fill(isChecked));
  };

  const handleSelectCause = (index: number) => {
    const newSelection = [...selectedCauses];
    newSelection[index] = !newSelection[index];
    setSelectedCauses(newSelection);
  };

  const handleDelete = () => {
    if (!selectedCauses.some((isSelected) => isSelected)) return;
    const confirmDelete = window.confirm("Are you sure you want to delete the selected causes?");
    
    if (confirmDelete) {
      const newCauses = causesData.filter((_, index) => !selectedCauses[index]);
      setCausesData(newCauses);
      setSelectedCauses(new Array(newCauses.length).fill(false));
    }
  };

  // Filter causes by status
  const filteredCauses = causesData.filter((cause) => (selectedStatus === 'All' ? true : cause.status === selectedStatus));

  // Pagination logic
  const indexOfLastCause = currentPage * causesPerPage;
  const indexOfFirstCause = indexOfLastCause - causesPerPage;
  const currentCauses = filteredCauses.slice(indexOfFirstCause, indexOfLastCause);
  const totalPages = Math.ceil(filteredCauses.length / causesPerPage);

  return (
    <div className="mt-1 md:mt-0 px-6 py-4 w-full bg-[#FAFCFF]">
      <div className="text-base md:text-2xl font-semibold">
        <span className="text-gray-500 pr-10">Activity Overview</span>
        <span className="text-black"> &gt; <span className='pl-6'> My Causes</span></span>
      </div>

      <div className="flex flex-col-reverse lg:flex justify-between mt-4">
        <div className="flex gap-6 text-xs lg:text-base md:text-sm  MajorLinker">
          {["All", "Pending", "Approved", "Completed"].map((status) => (
            <div
              key={status}
              className={`cursor-pointer ${selectedStatus === status ? "text-xs lg:text-base md:text-sm font-semibold pb-2 text-blue-600 border-b-4 border-blue-600" : "text-xs lg:text-base md:text-sm text-gray-500"}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status === "All" ? "All Causes" : status}
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center ml-auto text-xs md:text-sm lg:text-base">
          <div className="flex items-center gap-2 cursor-pointer lg:text-base md:text-sm sm:text-xs">
            <PlusIcon className='w-4 h-8' /> Add Cause
          </div>
          <div
            className={`cursor-pointer p-2 rounded ${selectedCauses.some((isSelected) => isSelected) ? "text-red-600 hover:text-red-800" : "text-gray-400 cursor-not-allowed"}`}
            onClick={selectedCauses.some((isSelected) => isSelected) ? handleDelete : undefined}
          >
            <LucideTrash />
          </div>
        </div>
      </div>

      {/* Causes Table */}
      <div className="w-full">
        <table className="text-xs lg:text-base md:text-sm w-full bg-[#FAFCFF] border-collapse">
          <thead>
            <tr className="border-b bg-[#E7EBEF]">
              <th className="p-3 py-4 text-left w-1/12">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedCauses.every((item) => item)}
                />
              </th>
              <th className="text-gray-500 p-3 text-left w-4/12">Causes List </th>
              <th className="text-gray-500 p-3 text-left w-3/12">Metrics</th>
              <th className="text-gray-500 p-3 text-left w-3/12">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentCauses.map((cause, index) => (
              <tr key={cause.id} className="">
                <td className="p-3 w-1/12 bg-[#FAFCFF]">
                  <input
                    type="checkbox"
                    checked={selectedCauses[index]}
                    onChange={() => handleSelectCause(index)}
                  />
                </td>
                <td className="p-3 py-4 w-6/12">{cause.name}</td>
                <td className="p-3 w-3/12">{cause.metrics}</td>
                <td className="p-3 w-1/12">
                  <span
                    className={`${
                      cause.status === "Approved"
                        ? "text-blue-500"
                        : cause.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {cause.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex mt-4 items-center">
        {/* Previous Arrow */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers with Ellipsis */}
        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))
        ) : (
          <>
            {/* Always show first page */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              1
            </button>

            {/* Show second page only if current page is far from the start */}
            {currentPage > 3 && <span className="mx-1 px-2">...</span>}

            {/* Dynamic middle pages */}
            {currentPage > 2 && currentPage < totalPages - 1 && (
              <>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="mx-1 px-3 py-1 rounded bg-gray-200"
                >
                  {currentPage - 1}
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage)}
                  className="mx-1 px-3 py-1 rounded bg-blue-600 text-white"
                >
                  {currentPage}
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="mx-1 px-3 py-1 rounded bg-gray-200"
                >
                  {currentPage + 1}
                </button>
              </>
            )}

            {/* Show ellipsis before last page if current page is far */}
            {currentPage < totalPages - 2 && <span className="mx-1 px-2">...</span>}

            {/* Always show last page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Arrow */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          &gt;
        </button>
      </div>

    </div>
  );
}
