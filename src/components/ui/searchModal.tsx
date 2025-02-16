import { FC } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose, searchQuery, setSearchQuery, onSearch }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 md:px-6">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-2 py-1 w-full outline-none"
          placeholder="Search..."
        />
        <button
          onClick={onSearch}
          className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
