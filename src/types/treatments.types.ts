import { IBaseParamsResponseDTO } from "./index.types"

export interface ITreatmentResponseDTO extends IBaseParamsResponseDTO {
  doctorName: string
  status: string
  fee: string
}

export interface ITreatmentsResponseDTO {
  patientId: string
  status: string
  treatmentDateAndTime: string
  treatmentFee: string
  patientName: string
}
