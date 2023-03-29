import React from "react"
import {useRouter} from "next/router"

const Pagination = (props) => {
  const {totalPages, currentPage, pathname, searchQuery} = props

  const router = useRouter()

  const pages = [...Array(totalPages).keys()].map((_, index) => index + 1)

  const handlePageChange = (page) => {
    if (searchQuery) {
      router.push({
        pathname: pathname,
        query: {page, search: searchQuery},
      })
    } else {
      router.push({
        pathname: pathname,
        query: {page},
      })
    }
  }

  return (
    <div className="flex items-center justify-center mt-6">
      {pages.map((page) => (
        <a
          key={page}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(page)
          }}
          className={`mx-1 px-3 py-2 bg-white border border-gray-300 text-sm font-medium ${
            currentPage === page
              ? "text-blue-500 border-blue-500"
              : "text-gray-700"
          } rounded-md hover:bg-gray-50`}
        >
          {page}
        </a>
      ))}
    </div>
  )
}

export default Pagination
