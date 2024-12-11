"use client"

import useAuthStore from "@/app/stores/auth.store"
import TreatmentHistoryDoctorTable from "@/components/patient/treatment-history-doctor-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DOCTOR_SPECIALIZATION } from "@/constants/common"
import { useDoctor } from "@/hooks/use-doctor"
import { ITreatmentsResponseDTO } from "@/types/treatments.types"
import { Edit, Loader, Search, SlidersVertical } from "lucide-react"
import Image from "next/image"

const treatments: ITreatmentsResponseDTO[] = [
  {
    patientId: "1",
    treatmentFee: "1500.00",
    status: "Good",
    treatmentDateAndTime: "2024-12-01T10:00:00",
    patientName: "Ayesha Perera",
  },
  {
    patientId: "2",
    treatmentFee: "2000.00",
    status: "Improving",
    treatmentDateAndTime: "2024-12-02T11:00:00",
    patientName: "Ruwan Fernando",
  },
  {
    patientId: "3",
    treatmentFee: "1000.00",
    status: "Stable",
    treatmentDateAndTime: "2024-12-03T12:00:00",
    patientName: "Shanika Silva",
  },
  {
    patientId: "4",
    treatmentFee: "1750.00",
    status: "Critical",
    treatmentDateAndTime: "2024-12-04T13:00:00",
    patientName: "Kasun Jayawardena",
  },
  {
    patientId: "5",
    treatmentFee: "1600.00",
    status: "Recovered",
    treatmentDateAndTime: "2024-12-05T14:00:00",
    patientName: "Nimal Gunasekara",
  },
  {
    patientId: "6",
    treatmentFee: "1900.00",
    status: "Good",
    treatmentDateAndTime: "2024-12-06T15:00:00",
    patientName: "Chamath Seneviratne",
  },
  {
    patientId: "7",
    treatmentFee: "2100.00",
    status: "Under Observation",
    treatmentDateAndTime: "2024-12-07T16:00:00",
    patientName: "Dilshan Wickramasinghe",
  },
  {
    patientId: "8",
    treatmentFee: "1300.00",
    status: "Improving",
    treatmentDateAndTime: "2024-12-08T17:00:00",
    patientName: "Hasini Wijesinghe",
  },
  {
    patientId: "9",
    treatmentFee: "1450.00",
    status: "Stable",
    treatmentDateAndTime: "2024-12-09T18:00:00",
    patientName: "Kavindu Ratnayake",
  },
  {
    patientId: "10",
    treatmentFee: "1850.00",
    status: "Good",
    treatmentDateAndTime: "2024-12-10T19:00:00",
    patientName: "Nirosha De Silva",
  },
]

const DoctorProfile = () => {
  const userId = useAuthStore((s) => s.userId)

  const { doctor, isFetching } = useDoctor(userId)

  // const { treatments } = useTreatmentsHistory(userId)

  if (isFetching) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loader className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex w-full">
      <div className="w-[350px] shrink-0 gap-6 py-8 pe-8 flex flex-col">
        <div className="flex items-center gap-2 flex-col">
          <div className="rounded-full text-3xl lg:text-4xl overflow-hidden bg-brand-25 font-semibold text-background aspect-square w-28 flex justify-center items-center">
            {doctor?.profilePictureUrl ? (
              <Image
                src={doctor.profilePictureUrl}
                alt="profile image"
                width={0}
                height={0}
                sizes="10vw"
                className="object-cover size-full"
              />
            ) : (
              <>
                {doctor?.first_name.split(" ")[0].charAt(0)}
                {doctor?.last_name.split(" ")[0].charAt(0)}
              </>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-center lg:text-2xl font-semibold">{`Dr. ${doctor?.first_name} ${doctor?.last_name}`}</p>
            <p className="text-center">
              {
                Object.entries(DOCTOR_SPECIALIZATION).find(
                  ([key]) => key === doctor?.specialty
                )?.[1]
              }
            </p>
          </div>
          <Button variant="link" className="h-auto p-0">
            <Edit />
            Edit
          </Button>
        </div>

        <div className="rounded-lg border text-sm bg-foreground/5 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Email</p>
            <p>{doctor?.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Contact No</p>
            <p>{doctor?.contact_no}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">NIC</p>
            <p>{doctor?.nic}</p>
          </div>
        </div>
      </div>

      <div className="w-0.5 bg-black/5" />

      <div className="flex flex-col p-8 gap-8 w-full">
        <div className="flex items-center gap-6">
          <div className="max-w-xs w-full h-full bg-brand-300 rounded-lg overflow-hidden relative">
            <Image
              src="/assets/vector-1.svg"
              alt="vector 1"
              width={0}
              height={0}
              sizes="100vw"
              className="object-cover w-full h-auto"
            />

            <div className="absolute justify-between inset-0 p-6 flex flex-col text-background">
              <p className="text-2xl lg:text-3xl font-medium">Your Patients</p>
              <span className="text-end text-3xl lg:text-5xl font-bold">
                {25}
              </span>
            </div>
          </div>

          <div className="max-w-xs w-full h-full bg-[#0AC157] rounded-lg overflow-hidden relative">
            <Image
              src="/assets/vector-2.svg"
              alt="vector 2"
              width={0}
              height={0}
              sizes="100vw"
              className="object-bottom w-full"
            />

            <div className="absolute justify-between inset-0 p-6 flex flex-col text-background">
              <p className="text-2xl lg:text-3xl font-medium">
                Treatments Count
              </p>
              <span className="text-end text-3xl lg:text-5xl font-bold">
                {40}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base lg:text-xl">Your Treatment History</h3>
            <div className="flex items-center gap-1">
              <div className="relative">
                <Input className="ps-9 w-60" placeholder="Search..." />
                <Search className="size-4 opacity-50 absolute start-3 top-3" />
              </div>
              <Button className="size-10" variant="outline">
                <SlidersVertical />
              </Button>
            </div>
          </div>

          <TreatmentHistoryDoctorTable treatments={treatments} />

          {/* {treatments && treatments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )} */}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
