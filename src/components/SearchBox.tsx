import React, { ChangeEvent, forwardRef, KeyboardEvent } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ value, onChange, onSearch, placeholder = "Search contacts..." }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch();
      }
    };

    return (
      <div className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            ref={ref}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
          />
        </div>
        <button
          type="button"
          onClick={onSearch}
          className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
    );
  }
);

// Add display name for debugging purposes
SearchBox.displayName = "SearchBox";

export default SearchBox;