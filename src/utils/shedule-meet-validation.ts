import { date, InferType, object, string } from "yup"

const scheduleMeetForm = object({
  time: string()
    .required("Time is required.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time."),
  date: date()
    .required("Date is required.")
    .min(new Date(), "Past dates are not allowed")
    .typeError("Please enter a valid date"),
})

export type ScheduleMeetForm = InferType<typeof scheduleMeetForm>

export { scheduleMeetForm }
