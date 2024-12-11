import { getDoctor, getDoctors } from "@/actions/doctor.action"
import { TAGS } from "@/constants"
import { DOCTORS_AVAILABILITY } from "@/constants/common"
import { useQuery } from "@tanstack/react-query"

export const useDoctor = (userId?: string) => {
  const {
    data: doctor,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [TAGS.DOCTOR, userId],
    queryFn: () => getDoctor(userId),
    enabled: !!userId,
  })

  return { doctor, error, isFetching, isLoading }
}

export const useDoctors = (available?: DOCTORS_AVAILABILITY) => {
  const {
    data: doctors,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [TAGS.DOCTORS, available],
    queryFn: () => getDoctors(available),
  })

  return { doctors, error, isFetching, isLoading }
}
