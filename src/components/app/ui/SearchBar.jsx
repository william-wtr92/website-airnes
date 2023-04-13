import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const SearchBar = (props) => {
  const { section } = props

  return (
    <>
      <label
        htmlFor="searchBar"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <input
          type="search"
          id="searchBar"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder={`Search for a ${section}`}
        />
      </div>
    </>
  )
}

export default SearchBar
