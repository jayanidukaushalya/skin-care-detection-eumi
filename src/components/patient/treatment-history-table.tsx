import { ITreatmentResponseDTO } from "@/types/treatments.types"
import { formatValue } from "react-currency-input-field"
import TableLoadingSkelton from "../common/table-loading-skelton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const TreatmentHistoryTable = ({
  treatments,
  isFetching,
  currentPage,
  limit,
}: {
  treatments?: ITreatmentResponseDTO[]
  isFetching: boolean
  currentPage: number
  limit: number
}) => {
  return (
    <div className="border rounded">
      <Table>
        <TableHeader className="select-none">
          <TableRow className="h-14">
            <TableHead className="w-20 text-center">Index</TableHead>
            <TableHead className="text-center">Date And Time</TableHead>
            <TableHead>Doctor&apos;s Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-end">Treatment Fee (Rs.)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && <TableLoadingSkelton columnLength={6} />}

          {!isFetching && !treatments?.length && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}

          {!isFetching &&
            treatments?.map((treatment, index) => (
              <TableRow className="h-14" key={treatment.id}>
                <TableCell className="font-medium text-center">
                  {(currentPage - 1) * limit + index + 1}
                </TableCell>
                <TableCell className="text-center">
                  {/* {format(treatment.createdAt, "yyyy-MM-dd hh:mm:ss a")} */}
                </TableCell>
                <TableCell>{treatment.doctorName}</TableCell>
                <TableCell className="text-center">
                  {treatment.status}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue({
                    value: treatment.fee,
                    decimalScale: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TreatmentHistoryTable
