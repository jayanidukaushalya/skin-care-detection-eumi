"use client"

import useAuthStore from "@/app/stores/auth.store"
import Pagination from "@/components/common/pagination"
import TreatmentHistoryTable from "@/components/patient/treatment-history-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ENTITY_SORT, PAGES, SORT_BY } from "@/constants/common"
import { usePatient } from "@/hooks/use-patient"
import useSearch from "@/hooks/use-search"
import { ITreatmentResponseDTO } from "@/types/treatments.types"
import { Edit, Loader, Search, SlidersVertical } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const patient = {
  name: "Kavindi Lewhara",
  email: "kavindilewhara@gmail.com",
  phone: "0773223332",
  nic: "200122332212",
  treatmentCount: 32,
  doctorCount: 4,
  profileImage: "/assets/profile-image-patient.jpg",
}

const treatments: ITreatmentResponseDTO[] = [
  {
    id: "1",
    doctorName: "Dr. John Doe",
    status: "Completed",
    fee: "1250.00",
  },
  {
    id: "2",
    doctorName: "Dr. Jane Smith",
    status: "Pending",
    fee: "1300.00",
  },
  {
    id: "3",
    doctorName: "Dr. Emily White",
    status: "Cancelled",
    fee: "1200.00",
  },
  {
    id: "4",
    doctorName: "Dr. Michael Brown",
    status: "Completed",
    fee: "1400.00",
  },
  {
    id: "5",
    doctorName: "Dr. Sarah Green",
    status: "In Progress",
    fee: "1350.00",
  },
  {
    id: "6",
    doctorName: "Dr. David Blue",
    status: "Pending",
    fee: "1500.00",
  },
  {
    id: "7",
    doctorName: "Dr. Anna Black",
    status: "Completed",
    fee: "1150.00",
  },
  {
    id: "8",
    doctorName: "Dr. Robert Grey",
    status: "In Progress",
    fee: "1450.00",
  },
  {
    id: "9",
    doctorName: "Dr. Laura Yellow",
    status: "Pending",
    fee: "1275.00",
  },
  {
    id: "10",
    doctorName: "Dr. James Orange",
    status: "Cancelled",
    fee: "1325.00",
  },
]

const PatientProfile = () => {
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<ENTITY_SORT>(ENTITY_SORT.DESC)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const userId = useAuthStore((s) => s.userId)

  const { patient, isFetching } = usePatient(userId)

  const { debouncedSearchKey, handleSearch } = useSearch()

  const totalPages = Math.ceil((treatments?.length ?? 0) / limit)
  // const totalPages = Math.ceil((categories?.data.extras.total ?? 0) / limit);

  const router = useRouter()

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
            {patient?.profilePictureUrl ? (
              <Image
                src={patient.profilePictureUrl}
                alt="profile image"
                width={0}
                height={0}
                sizes="10vw"
                className="object-cover size-full"
              />
            ) : (
              <>
                {patient?.first_name.split(" ")[0].charAt(0)}
                {patient?.last_name.split(" ")[0].charAt(0)}
              </>
            )}
          </div>
          <p className="text-xl text-center lg:text-2xl font-semibold">{`${patient?.first_name} ${patient?.last_name}`}</p>
          <Button variant="link" className="h-auto p-0">
            <Edit />
            Edit
          </Button>
        </div>

        <div className="rounded-lg border text-sm bg-foreground/5 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Email</p>
            <p>{patient?.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Contact No</p>
            <p>{patient?.contact_no}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">NIC</p>
            <p>{patient?.nic}</p>
          </div>
        </div>

        <Button onClick={() => router.push(PAGES.DOCTORS)}>See Doctors</Button>
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
              <p className="text-2xl lg:text-3xl font-medium">Your Doctors</p>
              <span className="text-end text-3xl lg:text-5xl font-bold">
                {3}
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
                {10}
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

          <TreatmentHistoryTable
            treatments={treatments}
            limit={limit}
            currentPage={currentPage}
            isFetching={false}
          />

          {treatments && treatments.length > 0 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
