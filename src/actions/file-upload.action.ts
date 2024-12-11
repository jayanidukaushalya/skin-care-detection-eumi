import useAuthStore from "@/app/stores/auth.store"
import { fetcher } from "@/configs/api.config"

export const uploadProfileImage = async (formData: FormData) => {
  const jwt = useAuthStore.getState().jwt

  const response = await fetcher("/files/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response) throw new Error("No response from server")
}

export const uploadLicenseDocument = async (formData: FormData) => {
  const jwt = localStorage.getItem("jwt")

  const response = await fetcher("/files/upload-license", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response) throw new Error("No response from server")
}

export const uploadPredictImage = async (formData: FormData) => {
  const jwt = localStorage.getItem("jwt")

  const response = await fetcher("/cataract/predict", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response) throw new Error("No response from server")
}
