import { LucideTrash } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Donation {
  id: number;
  cause: string;
  amount: string;
  dateTime: string;
  transactionId: string;
  paymentMethod: string;
}

const rowsPerPage = 8;

export default function DonationHistory() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [donations, setDonations] = useState<Donation[]>([
    { id: 1, cause: "Send Children to School", amount: "₦100,000", dateTime: "01 - 05 - 2025 10:00 AM", transactionId: "#873882", paymentMethod: "Card" },
    { id: 2, cause: "Provide Books for Students", amount: "₦50,000", dateTime: "02 - 05 - 2025 11:00 AM", transactionId: "#873883", paymentMethod: "Crypto" },
    { id: 3, cause: "Build a New School", amount: "₦250,000", dateTime: "03 - 05 - 2025 12:00 PM", transactionId: "#873884", paymentMethod: "Card" },
    { id: 4, cause: "Scholarships for Girls", amount: "₦150,000", dateTime: "04 - 05 - 2025 10:00 AM", transactionId: "#873885", paymentMethod: "Crypto" },
    { id: 5, cause: "Donate to the Homeless Shelter", amount: "₦200,000", dateTime: "05 - 05 - 2025 11:00 AM", transactionId: "#873886", paymentMethod: "Card" },
    { id: 6, cause: "Food for Orphanages", amount: "₦180,000", dateTime: "06 - 05 - 2025   12 : 00 PM", transactionId: "#873887", paymentMethod: "Crypto" },
    { id: 7, cause: "Support Local Farmers", amount: "₦50,000", dateTime: "07 - 05 - 2025   10 : 00 AM", transactionId: "#873888", paymentMethod: "Card" },
    { id: 8, cause: "Clean Water for Rural Areas", amount: "₦300,000", dateTime: "08 - 05 - 2025   11 : 00 AM", transactionId: "#873889", paymentMethod: "Crypto" },
    { id: 9, cause: "Empower Women in Tech", amount: "₦120,000", dateTime: "09 - 05 - 2025   12 : 00 PM", transactionId: "#873890", paymentMethod: "Card" },
    { id: 10, cause: "Medical Aid for Children", amount: "₦180,000", dateTime: "10 - 05 - 2025   10 : 00 AM", transactionId: "#873891", paymentMethod: "Crypto" },
    { id: 11, cause: "New Classroom Desks", amount: "₦80,000", dateTime: "11 - 05 - 2025   11 : 00 AM", transactionId: "#873892", paymentMethod: "Card" },
    { id: 12, cause: "Solar Panels for Schools", amount: "₦400,000", dateTime: "12 - 05 - 2025   12 : 00 PM", transactionId: "#873893", paymentMethod: "Crypto" },
    { id: 13, cause: "University Scholarships", amount: "₦500,000", dateTime: "13 - 05 - 2025   10 : 00 AM", transactionId: "#873894", paymentMethod: "Card" },
    { id: 14, cause: "Rural Teacher Salaries", amount: "₦250,000", dateTime: "14 - 05 - 2025   11 : 00 AM", transactionId: "#873895", paymentMethod: "Crypto" },
    { id: 15, cause: "School Lunch Program", amount: "₦75,000", dateTime: "15 - 05 - 2025   12 : 00 PM", transactionId: "#873896", paymentMethod: "Card" },
    { id: 16, cause: "Library Renovation", amount: "₦300,000", dateTime: "16 - 05 - 2025   10 : 00 AM", transactionId: "#873897", paymentMethod: "Crypto" },
    { id: 17, cause: "STEM Programs for Girls", amount: "₦90,000", dateTime: "17 - 05 - 2025   11 : 00 AM", transactionId: "#873898", paymentMethod: "Card" },
    { id: 18, cause: "Tech Equipment for Schools", amount: "₦200,000", dateTime: "18 - 05 - 2025   12 : 00 PM", transactionId: "#873899", paymentMethod: "Crypto" },
    { id: 19, cause: "Support for Disabled Students", amount: "₦180,000", dateTime: "19 - 05 - 2025   10 : 00 AM", transactionId: "#873900", paymentMethod: "Card" },
    { id: 20, cause: "School Bus for Rural Kids", amount: "₦350,000", dateTime: "20 - 05 - 2025   11 : 00 AM", transactionId: "#873901", paymentMethod: "Crypto" },
    { id: 21, cause: "After-School Programs", amount: "₦130,000", dateTime: "21 - 05 - 2025   12 : 00 PM", transactionId: "#873902", paymentMethod: "Card" },
    { id: 22, cause: "Refurbish Old Schools", amount: "₦275,000", dateTime: "22 - 05 - 2025   10 : 00 AM", transactionId: "#873903", paymentMethod: "Crypto" },
    { id: 23, cause: "Educational Workshops", amount: "₦110,000", dateTime: "23 - 05 - 2025   11 : 00 AM", transactionId: "#873904", paymentMethod: "Card" },
    { id: 24, cause: "Literacy Program for Adults", amount: "₦150,000", dateTime: "24 - 05 - 2025   12 : 00 PM", transactionId: "#873905", paymentMethod: "Crypto" },
    { id: 25, cause: "Donate School Uniforms", amount: "₦50,000", dateTime: "25 - 05 - 2025   10 : 00 AM", transactionId: "#873906", paymentMethod: "Card" },
    { id: 26, cause: "Science Lab for Schools", amount: "₦220,000", dateTime: "26 - 05 - 2025   11 : 00 AM", transactionId: "#873907", paymentMethod: "Crypto" },
    { id: 27, cause: "Digital Learning Materials", amount: "₦170,000", dateTime: "27 - 05 - 2025   12 : 00 PM", transactionId: "#873908", paymentMethod: "Card" },
    { id: 28, cause: "Mobile Libraries", amount: "₦130,000", dateTime: "28 - 05 - 2025   10 : 00 AM", transactionId: "#873909", paymentMethod: "Crypto" },
    { id: 29, cause: "Coding Bootcamp for Kids", amount: "₦210,000", dateTime: "29 - 05 - 2025   11 : 00 AM", transactionId: "#873910", paymentMethod: "Card" },
    { id: 30, cause: "Eco-Friendly Schools", amount: "₦280,000", dateTime: "30 - 05 - 2025   12 : 00 PM", transactionId: "#873911", paymentMethod: "Crypto" },
    { id: 31, cause: "Tutoring for Orphans", amount: "₦100,000", dateTime: "31 - 05 - 2025   10 : 00 AM", transactionId: "#873912", paymentMethod: "Card" },
    { id: 32, cause: "Mental Health Support for Students", amount: "₦190,000", dateTime: "01 - 06 - 2025   11 : 00 AM", transactionId: "#873913", paymentMethod: "Crypto" },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : donations.map((donation) => donation.id));
  };

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      if (window.confirm("Are you sure you want to delete the selected donation(s)?")) {
        setDonations((prev) => prev.filter(donation => !selectedRows.includes(donation.id)));
        setSelectedRows([]);
        setSelectAll(false);
      }
    }
  };

  // Apply filtering based on search query and date range
  const filteredDonations = donations.filter((donation) => {
    const donationDate = new Date(donation.dateTime.split(' ')[0]);
    
    // Filter by date range
    if (startDate && donationDate < startDate) return false;
    if (endDate && donationDate > endDate) return false;

    // Filter by search query (case-insensitive)
    if (searchQuery && !donation.cause.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredDonations.length / rowsPerPage);

  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-6 py-4 w-full bg-[#FAFCFF]">
      <div className="flex justify-between text-2xl font-semibold">
        <div>
          <span className="text-gray-500 pr-10">Activity Overview</span>
          <span className="text-black"> &gt; <span className='pl-6'> Donation History</span></span>
        </div>
        <div>
            <Image 
                src="/UserProfile/refresh.svg" 
                className='w-6 h-6 cursor-pointer' 
                alt='refresh' 
                width={20} 
                height={20} 
                onClick={() => window.location.reload()}
            />
        </div>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div>
          <form>
            <input
              type='search'
              placeholder='Search for history'
              className="border border-gray-300 px-3 py-2 rounded-md outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className='flex items-center gap-4'>
          <div className="flex items-center border border-gray-300 px-3 py-2 rounded-md">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="outline-none"
            />
            <span className="mx-2">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              placeholderText="End Date"
              className="outline-none"
            />
          </div>

          <div className="cursor-pointer text-red-500 hover:text-red-700" onClick={handleDelete}>
            <LucideTrash />
          </div>
        </div>
      </div>

      <div className='mt-6 overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='p-5'>
                <input type='checkbox' checked={selectAll} onChange={toggleSelectAll} />
              </th>
              <th className='p-3 text-left'>Causes List</th>
              <th className='p-3 text-left'>Amount Donated</th>
              <th className='p-3 text-left'>Date & Time</th>
              <th className='p-3 text-left'>Transaction ID</th>
              <th className='p-3 text-left'>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDonations.map((donation) => (
              <tr key={donation.id} className='hover:bg-gray-100'>
                <td className='p-5 text-center'>
                  <input
                    type='checkbox'
                    checked={selectedRows.includes(donation.id)}
                    onChange={() => toggleRowSelection(donation.id)}
                  />
                </td>
                <td className='p-3'>{donation.cause}</td>
                <td className='p-3'>{donation.amount}</td>
                <td className='p-3'>{donation.dateTime}</td>
                <td className='p-3'>{donation.transactionId}</td>
                <td className='p-3'>{donation.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-start mt-4 space-x-2'>
        <button className='px-3 py-1 border rounded-md' onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : ''}`} onClick={() => changePage(index + 1)}>{index + 1}</button>
        ))}
        <button className='px-3 py-1 border rounded-md' onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
      </div>
    </div>
  );
}
