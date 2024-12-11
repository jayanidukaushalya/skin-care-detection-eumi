import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Dispatch, SetStateAction } from "react"

const renderPaginationItems = (
  totalPages: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
) => {
  const items = []
  const maxVisiblePages = 5

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
  } else {
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => setCurrentPage(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    )

    if (currentPage > 3) {
      items.push(<PaginationEllipsis key="ellipsis-start" />)
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (currentPage < totalPages - 2) {
      items.push(<PaginationEllipsis key="ellipsis-end" />)
    }

    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          href="#"
          onClick={() => setCurrentPage(totalPages)}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    )
  }

  return items
}

export default renderPaginationItems
