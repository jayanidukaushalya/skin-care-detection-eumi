import { DOCTOR_SPECIALIZATION } from "@/constants/common"
import { IBaseParamsResponseDTO } from "./index.types"

export interface IDoctorResponseDTO extends IBaseParamsResponseDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  contact_no: string
  nic: string
  profilePictureUrl: string
  gender: string
  street: string
  city: string
  province: string
  sessionTime: number
  specialty: DOCTOR_SPECIALIZATION
  averageRating: number
  totalRatings: number
  to: string
  from: string
  hospital: string
  numberOfTreatments: string
  consultationFee: number
  languagesSpoken: string
  slmcRegistrationNumber: string
  yearsOfExperience: number
  licenseDocUrl: string | null
  active: boolean
  approved: boolean
}
