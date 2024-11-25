import { IconSearch } from '@tabler/icons-react';
import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ATMSearchBar: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        placeholder="Search..."
        className="px-5 py-3 transition-all border border-gray-300 shadow-lg outline-none w-60 input focus:border-2 rounded-xl focus:w-64"
        name="search"
        type="search"
        value={value} // Controlled input
        onChange={onChange} // Handle change event
      />
    </div>
  );
};

export default ATMSearchBar;
