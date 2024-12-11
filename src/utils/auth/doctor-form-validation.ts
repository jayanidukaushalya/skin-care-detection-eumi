import {
  DOCTOR_SPECIALIZATION,
  GENDER_TYPE,
  PRICE_REGEX,
  PROVINCE,
} from "@/constants/common"
import { boolean, InferType, mixed, number, object, ref, string } from "yup"

const doctorForm1 = object({
  profileImage: mixed().nullable(),
  firstName: string().required("First name is required."),
  lastName: string().required("Last name is required."),
  email: string()
    .email("Invalid email address.")
    .required("Email is required."),
  mobileNumber: string()
    .matches(/^(?:7|0)[0-9]{9}$/, "Invalid Mobile Number")
    .required("Mobile number is required."),
  nic: string()
    .required("National identity card number is required.")
    .test("nic", "Invalid nic number", function (value) {
      if (!value) return false

      // Old NIC format: 9 digits followed by V/X
      const oldNICRegex = /^[0-9]{9}[VvXx]$/

      // New NIC format: 12 digits
      const newNICRegex = /^[0-9]{12}$/

      if (oldNICRegex.test(value) || newNICRegex.test(value)) {
        // Additional validation for birth year and gender
        let yearPart
        if (value.length === 10) {
          // Old NIC
          yearPart = value.substring(0, 2)
        } else {
          // New NIC
          yearPart = value.substring(0, 4).slice(2)
        }

        // Check if year is valid (between 1900 and current year)
        const year = parseInt("19" + yearPart)
        const currentYear = new Date().getFullYear()
        if (year < 1900 || year > currentYear) return false

        return true
      }

      return false
    }),
  gender: string()
    .oneOf(Object.keys(GENDER_TYPE), "Invalid gender.")
    .required("Gender is required."),
})

const doctorForm2 = object({
  street: string().required("Street is required."),
  city: string().required("City is required."),
  province: string()
    .oneOf(Object.keys(PROVINCE), "Invalid province.")
    .required("Province is required."),
  password: string()
    .min(6, "Minimum 6 charters required.")
    .required("Password is required."),
  confirmPassword: string()
    .required("Confirm password is required.")
    .oneOf([ref("password")], `Passwords doesn't match`),
  languagesSpoken: string().required("Please specify the languages you speak."),
  consultationFee: number()
    .transform((_, originalValue) => {
      // Handle empty string
      if (originalValue === "") return undefined

      // Remove any commas from the input
      const normalizedValue = String(originalValue).replace(/,/g, "")

      return Number(parseFloat(normalizedValue))
    })
    .min(0, "Must be greater than or equal to 0.")
    .max(999999.99, "Amount is too large.")
    .test("maxDecimals", "Cannot have more than 2 decimal places.", (value) => {
      if (!value) return true
      const stringValue = String(value)
      const decimals = stringValue.includes(".")
        ? stringValue.split(".")[1].length
        : 0
      return decimals <= 2
    })
    .test(
      "validFormat",
      "Invalid price format. Use numbers only, maximum 2 decimal places.",
      (value, context) => {
        if (!value) return true // Skip if empty
        const originalValue = context.originalValue
        if (typeof originalValue === "string") {
          return PRICE_REGEX.test(originalValue.replace(/,/g, ""))
        }
        return true
      }
    )
    .required("Consultation fee is required.")
    .typeError("Invalid price format."),
  sessionTime: number()
    .max(60, "Session time must be 60 minutes or less.")
    .min(1, "Session time must be at least 1 minute.")
    .required("Session time is required."),
  availableFrom: string()
    .required("Start time for availability is required.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid start time."),
  availableTo: string()
    .required("End time for availability is required.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid start time."),
})

const doctorForm3 = object({
  regNo: string().required("SLMC registration number is required."),
  specialization: string()
    .oneOf(Object.keys(DOCTOR_SPECIALIZATION), "Invalid specialization.")
    .required("Specialization is required."),
  yearsOfExperience: number()
    .positive("Invalid input, must be a positive number.")
    .required("Years of experience is required.")
    .typeError("Invalid input, must be a positive number."),
  hospitalName: string().required("Working place name is required."),
  licenseDocument: mixed().required("License document is required."),
  termsAndConditions: boolean()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("You must accept the terms and conditions."),
})

export type DoctorForm1 = InferType<typeof doctorForm1>
export type DoctorForm2 = InferType<typeof doctorForm2>
export type DoctorForm3 = InferType<typeof doctorForm3>

export { doctorForm1, doctorForm2, doctorForm3 }
