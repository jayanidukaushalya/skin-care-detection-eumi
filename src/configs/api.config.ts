import { toast } from "@/hooks/use-toast"
import { environment } from "./env.config"

export const fetcher = async (
  suffix: string,
  options?: RequestInit,
  params?: any
) => {
  const url = new URL(`${environment.apiURL}${suffix}`)
  if (params) url.search = new URLSearchParams(params).toString()

  try {
    return await fetch(url.href, {
      method: options?.method ?? "GET",
      ...options,
    })
  } catch (error) {
    toast({
      title: "Network Error",
      description:
        "Unable to connect. Please check your internet connection and try again.",
      variant: "destructive",
    })
  }
}
