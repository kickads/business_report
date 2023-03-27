import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline/index.js';

export function SearchBar({ searchData }) {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Email
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          list="years"
          autoComplete="off"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <datalist id="years">
          { searchData.map( field => ( <option value={ field.year } key={ field.year } /> )) }
        </datalist>
      </div>
    </div>
  );
}