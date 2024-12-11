import { InferType, object, string } from "yup"

const loginFormSchema = object({
  email: string()
    .email("Email must be a valid email.")
    .required("Email is required."),
  password: string().required("Password is required."),
})

export type LoginFormSchema = InferType<typeof loginFormSchema>

export default loginFormSchema
