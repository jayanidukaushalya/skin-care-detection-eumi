import useAuthStore from "@/app/stores/auth.store"
import { fetcher } from "@/configs/api.config"
import { DOCTORS_AVAILABILITY } from "@/constants/common"
import { IDoctorResponseDTO } from "@/types/doctor.types"

export const getDoctor = async (id?: string) => {
  const jwt = useAuthStore.getState().jwt

  const response = await fetcher(`/doctors/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response) throw new Error("No response from server")

  const responseJson = await response.json()

  if (responseJson.error) throw new Error("Json conversion failed")

  if (!response.ok) {
    throw new Error(responseJson.message)
  }

  return responseJson as IDoctorResponseDTO
}

export const getDoctors = async (available?: DOCTORS_AVAILABILITY) => {
  const jwt = useAuthStore.getState().jwt

  const response = await fetcher(`/doctors?available=${available}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response) throw new Error("No response from server")

  const responseJson = await response.json()

  if (responseJson.error) throw new Error("Json conversion failed")

  if (!response.ok) {
    throw new Error(responseJson.message)
  }

  return responseJson as IDoctorResponseDTO[]
}
