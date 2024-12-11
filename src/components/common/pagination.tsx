import renderPaginationItems from "@/lib/pagination-utils"
import { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"
import {
  PaginationContent,
  PaginationItem,
  ShadCnPagination,
} from "../ui/pagination"

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}) => {
  return (
    <ShadCnPagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        </PaginationItem>
        {renderPaginationItems(totalPages, currentPage, setCurrentPage)}
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadCnPagination>
  )
}

export default Pagination
