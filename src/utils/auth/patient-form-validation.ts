import { GENDER_TYPE, PROVINCE } from "@/constants/common"
import { boolean, date, InferType, mixed, object, ref, string } from "yup"

const patientForm1 = object({
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
  dob: date()
    .required("Date of Birth is required.")
    .max(new Date(), "Future dates are not allowed")
    .typeError("Please enter a valid date"),
  gender: string()
    .oneOf(Object.keys(GENDER_TYPE), "Invalid gender.")
    .required("Gender is required."),
})

const patientForm2 = object({
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
  termsAndConditions: boolean()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("You must accept the terms and conditions."),
})

export type PatientForm1 = InferType<typeof patientForm1>
export type PatientForm2 = InferType<typeof patientForm2>

export { patientForm1, patientForm2 }
