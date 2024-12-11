import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"
import { TableCell, TableRow } from "../ui/table"

const TableLoadingSkelton = (props: { columnLength: number }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index} className="border-[#CBD5E1]">
          {[...Array(props.columnLength)].map((_, index) => (
            <TableCell
              className={cn(index === 0 ? "w-10" : "w-auto")}
              key={index}
            >
              <Skeleton className={cn("h-5", index === 0 ? "w-10" : "w-20")} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default TableLoadingSkelton
