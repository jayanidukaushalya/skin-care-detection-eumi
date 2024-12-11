import { fetcher } from "@/configs/api.config"
import { IRegisterRequestDTO } from "@/types/auth.types"

export const register = async (params: IRegisterRequestDTO) => {
  const response = await fetcher("/auth/register", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response) throw new Error("No response from server")

  const responseJson = await response.json()

  if (responseJson.error) throw new Error("Json conversion failed")

  if (!response.ok) {
    throw new Error(responseJson.message)
  }

  return responseJson
}

export const verifyUser = async (idToken: string) => {
  const response = await fetcher(`/auth/verify?token=${idToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response) throw new Error("No response from server")

  const responseJson = await response.json()

  if (responseJson.error) throw new Error("Json conversion failed")

  if (!response.ok) {
    throw new Error(responseJson.message)
  }

  return responseJson
}
