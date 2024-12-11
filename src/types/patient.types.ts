import { IBaseParamsResponseDTO } from "./index.types"

export interface IPatientResponseDTO extends IBaseParamsResponseDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  contact_no: string
  nic: string
  profilePictureUrl: string
  birth_date: string
  gender: string
  street: string
  city: string
  province: string
}
