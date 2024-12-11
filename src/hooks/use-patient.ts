import { getPatient } from "@/actions/patient.action"
import { TAGS } from "@/constants"
import { useQuery } from "@tanstack/react-query"

export const usePatient = (userId?: string) => {
  const {
    data: patient,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [TAGS.PATIENT, userId],
    queryFn: () => getPatient(userId),
    enabled: !!userId,
  })

  return { patient, error, isFetching, isLoading }
}
