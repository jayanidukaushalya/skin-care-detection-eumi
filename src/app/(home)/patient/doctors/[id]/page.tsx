"use client"

import { sendMessage } from "@/actions/chat.action"
import useAuthStore from "@/app/stores/auth.store"
import ScheduleMeet from "@/components/patient/schedule-meet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TAGS } from "@/constants"
import { DOCTOR_SPECIALIZATION } from "@/constants/common"
import { useSession } from "@/hooks/use-chat"
import { useDoctor } from "@/hooks/use-doctor"
import { cn } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { Loader, Send, Video } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const DoctorDetailsPage = ({ params }: { params: { id: string } }) => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const userId = useAuthStore((s) => s.userId)

  const queryClient = useQueryClient()

  const { doctor, isFetching: isFetchingDoctor } = useDoctor(params.id)
  const { session, isFetching: isFetchingSession } = useSession()

  const handleMessageSend = async () => {
    if (!doctor || !userId) return

    try {
      setLoading(true)

      await sendMessage({
        doctorId: doctor.id,
        patientId: userId,
        messages: {
          senderId: userId,
          recipientId: doctor.id,
          content: message,
        },
      })

      setMessage("")
      await queryClient.invalidateQueries({
        queryKey: [TAGS.SESSION],
      })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  if (isFetchingDoctor || isFetchingSession) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loader className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row items-center py-8 gap-16 flex-1">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex gap-4 rounded-lg items-center">
          <div className="rounded-full text-3xl lg:text-4xl overflow-hidden bg-brand-25 font-semibold text-background aspect-square w-28 flex justify-center items-center">
            {doctor?.profilePictureUrl ? (
              <Image
                src={doctor.profilePictureUrl}
                alt="profile image"
                width={0}
                height={0}
                sizes="100vw"
                quality={100}
                className="object-cover size-full"
              />
            ) : (
              <>
                {doctor?.first_name.split(" ")[0].charAt(0)}
                {doctor?.last_name.split(" ")[0].charAt(0)}
              </>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-xl lg:text-2xl font-semibold">{`Dr. ${doctor?.first_name} ${doctor?.last_name}`}</p>
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
                <span className="text-sm">{doctor?.totalRatings}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">{doctor?.hospital}</p>
              {doctor?.active && (
                <div className="flex items-center px-2 py-0.5 gap-2 rounded-lg bg-brand-100/15">
                  <div className="rounded-full size-2 bg-brand-100" />
                  <span className="text-brand-100 text-sm font-medium">
                    Online
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="rounded-lg border text-center p-2 flex flex-col">
            <span className="text-5xl font-bold">
              {doctor?.numberOfTreatments}
            </span>
            <span>Treatments</span>
          </div>
          <div className="flex flex-col">
            <p>Channelling Fee</p>
            <span className="text-4xl font-bold">
              LKR {doctor?.consultationFee}
            </span>
            <p>
              Languages:&nbsp;{" "}
              <span className="font-semibold">{doctor?.languagesSpoken}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h5 className="font-semibold">About Me</h5>
          <p className="text-sm text-foreground/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            voluptas eaque error distinctio deserunt qui beatae accusamus.
            Dolores eius reiciendis magnam unde quisquam rem libero, pariatur
            quos ipsum id aliquam, accusantium necessitatibus fugit voluptate
            nesciunt totam alias. Quam reprehenderit esse minus sapiente officia
            aliquid quisquam dolores, vel corrupti eos. Animi.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="text-primary border-primary hover:text-primary"
          >
            <Video />
            Video Call
          </Button>
          <ScheduleMeet>
            <Button>Schedule</Button>
          </ScheduleMeet>
        </div>
      </div>
      <div className="flex flex-col shadow-lg rounded-lg drop-shadow overflow-hidden max-h-[600px] w-full">
        <div className="flex px-4 py-3 justify-between relative bg-foreground/5">
          <div className="flex items-center gap-4">
            <Image
              src={doctor?.profilePictureUrl ?? ""}
              alt="profile image"
              width={45}
              height={45}
              className="object-cover rounded-full"
            />
            <p className="text-lg font-semibold">{`Dr. ${doctor?.first_name} ${doctor?.last_name}`}</p>
          </div>
        </div>
        <div className="gap-4 overflow-auto h-full flex flex-col relative">
          <div className="flex gap-4 bg-background mb-20 flex-col p-4">
            <div
              className={cn(
                "max-w-sm rounded-lg p-4 self-start bg-foreground/5 text-foreground"
              )}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                iure nisi facere. Totam eius perferendis accusantium possimus
                necessitatibus, dolorum unde?
              </p>
            </div>

            {session?.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-sm rounded-lg p-4",
                  item.messages.recipientId === doctor?.id
                    ? "self-start bg-foreground/5 text-foreground"
                    : "self-end bg-primary text-background"
                )}
              >
                <p>{item.messages.content}</p>
              </div>
            ))}
          </div>

          <div className="bottom-0 fixed bg-background w-full p-4">
            <div className="relative">
              <Input
                value={message}
                onChange={(v) => setMessage(v.target.value)}
                className="h-12 pe-14"
              />
              <Button
                disabled={loading}
                type="button"
                onClick={handleMessageSend}
                className="absolute end-1 top-1 w-10"
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailsPage
