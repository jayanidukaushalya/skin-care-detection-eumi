import useAuthStore from "@/app/stores/auth.store"
import { fetcher } from "@/configs/api.config"
import { IChatRequestDTO, IChatResponseDTO } from "@/types/chat.types"

export const sendMessage = async (params: IChatRequestDTO) => {
  const jwt = useAuthStore.getState().jwt

  const response = await fetcher("/chat/send", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response) throw new Error("No response from server")
}

export const getSession = async (patientId?: string, doctorId?: string) => {
  const jwt = useAuthStore.getState().jwt

  const response = await fetcher(
    `/chat/sessions?patientId=${patientId}&doctorId=${doctorId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  )

  if (!response) throw new Error("No response from server")

  const responseJson = await response.json()

  if (responseJson.error) throw new Error("Json conversion failed")

  if (!response.ok) {
    throw new Error(responseJson.message)
  }

  return responseJson as IChatResponseDTO[]
}
