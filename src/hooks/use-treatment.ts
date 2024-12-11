import { getTreatments } from "@/actions/treatment.action"
import { TAGS } from "@/constants"
import { useQuery } from "@tanstack/react-query"

export const useTreatmentsHistory = (userId?: string) => {
  const {
    data: treatments,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [TAGS.TREATMENTS, userId],
    queryFn: () => getTreatments(userId),
    enabled: !!userId,
  })

  return { treatments, error, isFetching, isLoading }
}
