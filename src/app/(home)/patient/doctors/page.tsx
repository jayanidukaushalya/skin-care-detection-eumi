"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DOCTOR_SPECIALIZATION, DOCTORS_AVAILABILITY } from "@/constants/common"
import { useDoctors } from "@/hooks/use-doctor"
import { Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const DoctorsPage = () => {
  const [availability, setAvailability] = useState<DOCTORS_AVAILABILITY>(
    DOCTORS_AVAILABILITY.ALL
  )

  const { doctors, isFetching } = useDoctors(availability)

  if (isFetching) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loader className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 py-4 gap-4">
      <p>
        The following skilled doctors are lined up for the treatment of your
        disease.
      </p>

      <Select
        defaultValue={availability}
        value={availability}
        onValueChange={(v: DOCTORS_AVAILABILITY) => setAvailability(v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={DOCTORS_AVAILABILITY.ALL}>All</SelectItem>
          <SelectItem value={DOCTORS_AVAILABILITY.AVAILABLE}>
            Available
          </SelectItem>
          <SelectItem value={DOCTORS_AVAILABILITY.UNAVAILABLE}>
            Unavailable
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors
          ?.filter((doctor) => {
            if (availability === DOCTORS_AVAILABILITY.ALL) return doctor
            if (availability === DOCTORS_AVAILABILITY.AVAILABLE) {
              return doctor.active
            } else {
              return !doctor.active
            }
          })
          .map((doctor, i) => (
            <Link
              key={i}
              href={`/patient/doctors/${doctor.id}`}
              className="flex gap-4 border rounded-lg bg-slate-50 p-4"
            >
              <div className="rounded-full text-3xl lg:text-4xl bg-brand-25 font-semibold text-background aspect-square w-auto h-full flex justify-center items-center">
                {doctor.first_name.split(" ")[0].charAt(0)}
                {doctor.last_name.split(" ")[0].charAt(0)}
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="text-xl lg:text-2xl font-semibold whitespace-nowrap">
                  {`${doctor.first_name} ${doctor.last_name}`}
                </p>
                <div className="flex items-center w-full justify-between">
                  <p className="text-sm">
                    {
                      Object.entries(DOCTOR_SPECIALIZATION).find(
                        ([key]) => key === doctor?.specialty
                      )?.[1]
                    }
                  </p>
                  <div className="flex items-center gap-1 font-semibold">
                    <Image
                      src={"/assets/star.png"}
                      width={20}
                      height={20}
                      alt="star icon"
                    />
                    <span className="text-sm">{doctor.totalRatings}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">{doctor.hospital}</p>
                  {doctor.active && (
                    <div className="flex items-center px-2 py-0.5 gap-2 rounded-lg bg-brand-100/15">
                      <div className="rounded-full size-2 bg-brand-100" />
                      <span className="text-brand-100 text-sm font-medium">
                        Online
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DoctorsPage
