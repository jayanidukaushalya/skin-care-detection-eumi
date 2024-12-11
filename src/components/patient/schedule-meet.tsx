import {
  scheduleMeetForm,
  ScheduleMeetForm,
} from "@/utils/shedule-meet-validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

const ScheduleMeet = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  const form = useForm<ScheduleMeetForm>({
    resolver: yupResolver(scheduleMeetForm),
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    form.reset()
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showClose={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <input
                    className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    type="date"
                    name={field.name}
                    value={
                      field.value
                        ? format(new Date(field.value), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={field.onChange}
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Time</FormLabel>
                  <input
                    className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    type="time"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2">Schedule</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleMeet
