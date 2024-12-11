import { getSession } from "@/actions/chat.action"
import { TAGS } from "@/constants"
import { useQuery } from "@tanstack/react-query"

export const useSession = (patientId?: string, doctorId?: string) => {
  const {
    data: session,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [TAGS.SESSION, patientId, doctorId],
    queryFn: () => getSession(patientId, doctorId),
    enabled: !!(patientId && doctorId),
  })

  return { session, error, isFetching, isLoading }
}
