import { ITreatmentsResponseDTO } from "@/types/treatments.types"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const TreatmentHistoryDoctorTable = ({
  treatments,
}: {
  treatments?: ITreatmentsResponseDTO[]
}) => {
  return (
    <div className="border rounded">
      <Table>
        <TableHeader className="select-none">
          <TableRow className="h-14">
            <TableHead className="w-20 text-center">Index</TableHead>
            <TableHead className="text-center">Date And Time</TableHead>
            <TableHead>Patient&apos;s Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-end">Treatment Fee (Rs.)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!treatments?.length && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}

          {treatments?.map((treatment, index) => (
            <TableRow className="h-14" key={treatment.patientId}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">
                {format(treatment.treatmentDateAndTime, "yyyy-MM-dd HH:mm")}
              </TableCell>
              <TableCell>{treatment.patientName}</TableCell>
              <TableCell className="text-center">{treatment.status}</TableCell>
              <TableCell className="text-right">
                {treatment.treatmentFee}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TreatmentHistoryDoctorTable
