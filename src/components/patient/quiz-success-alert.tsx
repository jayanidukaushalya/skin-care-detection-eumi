"use client"

import { PAGES } from "@/constants/common"
import { ChevronLeft, X } from "lucide-react"
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

const QuizSuccessAlert = ({
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
              Congratulation..!
            </DialogTitle>
            <DialogDescription className="text-background">
              Your don&apos;t have a{" "}
              <span className="font-medium">Cataracts</span> issue in your eyes.
              Stay Safe and,
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button
              variant="secondary"
              onClick={() => {
                isControlled ? setDialogOpen(false) : setInternalOpen(false)

                // TODO: this might be changed in the future
                route.push(PAGES.ROOT)
              }}
            >
              <ChevronLeft /> Back To Home
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
            src="/assets/bg-success.svg"
            alt="bg-success"
            fill
            className="object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizSuccessAlert
