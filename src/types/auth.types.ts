import { DOCTOR_SPECIALIZATION, Role } from "@/constants/common"

export interface IRegisterRequestDTO {
  email: string
  password: string
  role: Role
  patient: {
    first_name: string
    last_name: string
    email: string
    contact_no: string
    nic: string
    birth_date: Date
    gender: string
    street: string
    city: string
    province: string
  } | null
  doctor: {
    first_name: string
    last_name: string
    email: string
    contact_no: string
    nic: string
    gender: string
    street: string
    city: string
    province: string
    sessionTime: number
    specialty: DOCTOR_SPECIALIZATION
    hospital: string
    consultationFee: number
    languagesSpoken: string
    slmcRegistrationNumber: string
    yearsOfExperience: number
    isActive: false
    from: string
    to: string
  } | null
}
