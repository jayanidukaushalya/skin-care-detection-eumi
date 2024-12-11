import useAuthStore from "@/app/stores/auth.store"
import { fetcher } from "@/configs/api.config"
import { IPatientResponseDTO } from "@/types/patient.types"

export const getPatient = async (id?: string) => {
  const jwt = useAuthStore.getState().jwt

  const response = await fetcher(`/patients/${id}`, {
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

  return responseJson as IPatientResponseDTO
}
