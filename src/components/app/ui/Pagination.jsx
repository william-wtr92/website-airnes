import {useRouter} from "next/router"
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid"

const Pagination = (props) => {
  const {totalPages, currentPage, pathname} = props

  const router = useRouter()

  const handlePageChange = (page) => {
    router.push({
      pathname: pathname,
      query: {page},
    })
  }

  const previousPage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(totalPages, currentPage + 1)

  const pages = [
    1,
    totalPages > 2 ? 2 : null,
    currentPage > 2 && currentPage < totalPages - 1 ? currentPage : "...",
    totalPages > 3 ? totalPages - 1 : null,
    totalPages > 1 ? totalPages : null,
  ].filter(Boolean)

  const handlePageClick = (e, page) => {
    e.preventDefault()

    if (page !== "...") {
      handlePageChange(page)
    }
  }

  return (
    <div className="flex items-center justify-center mt-6">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(previousPage)}
          disabled={currentPage === 1}
          className="px-3 py-2 mx-1 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
        >
          <ArrowLeftIcon className="h-5 w-5"/>
        </button>
      )}
      {pages.map((page, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => handlePageClick(e, page)}
          className={`mx-1 px-3 py-2 bg-white border border-gray-300 text-sm font-medium ${
            currentPage === page
              ? "text-blue-500 border-blue-500"
              : "text-gray-700"
          } rounded-md hover:bg-gray-50`}
        >
          {page}
        </a>
      ))}
      {totalPages - currentPage >= 1 && (
        <button
          onClick={() => handlePageChange(nextPage)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 mx-1 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
        >
          <ArrowRightIcon className="h-5 w-5"/>
        </button>
      )}
    </div>
  )
}

export default Pagination
