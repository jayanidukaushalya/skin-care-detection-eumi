"use client"

import { PAGES } from "@/constants/common"
import { ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

const QuizWarningAlert = ({
  dialogOpen,
  setDialogOpen,
  children,
}: {
  dialogOpen?: boolean
  setDialogOpen?: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)

  const isControlled = dialogOpen && setDialogOpen

  const open = isControlled ? dialogOpen : internalOpen
  const onOpenChange = isControlled ? setDialogOpen : setInternalOpen

  const route = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showClose={false}
        className="rounded-lg select-none lg:min-h-96 max-w-2xl items-center"
      >
        <div className="relative z-20 p-4 flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-background">
              Bad News..!
            </DialogTitle>
            <DialogDescription className="text-background">
              <span>Your have a Cataracts issue in your eyes.</span>
              <br />
              <span>
                But Don&apos;t worry We have talented doctors for treatment to
                you
              </span>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button onClick={() => route.push(PAGES.DOCTORS)}>
              See Doctors <ChevronRight />
            </Button>
          </div>
        </div>

        <button
          onClick={() =>
            isControlled ? setDialogOpen(false) : setInternalOpen(false)
          }
          className="absolute end-5 top-5 z-20"
        >
          <X className="text-background w-5 h-5" />
        </button>

        <div className="absolute -inset-1 bg-foreground/10 z-10" />

        <div className="absolute -inset-1 rounded-lg overflow-hidden z-0">
          <Image
            src="/assets/bg-warning.svg"
            alt="bg-warning"
            fill
            className="object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizWarningAlert
