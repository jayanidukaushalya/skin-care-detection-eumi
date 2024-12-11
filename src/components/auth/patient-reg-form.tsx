"use client"

import { register, verifyUser } from "@/actions/auth.action"
import { uploadProfileImage } from "@/actions/file-upload.action"
import useAuthStore from "@/app/stores/auth.store"
import { auth } from "@/configs/firebase.config"
import { PAGES, Role } from "@/constants/common"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  PatientForm1,
  patientForm1,
  patientForm2,
  PatientForm2,
} from "@/utils/auth/patient-form-validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { getIdToken, signInWithCustomToken } from "firebase/auth"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import PatientRegisterPart1 from "./patient-reg-part1"
import PatientRegisterPart2 from "./patient-reg-part2"

const PatientRegisterForm = () => {
  const [activeForm, setActiveForm] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)

  const form1 = useForm<PatientForm1>({
    resolver: yupResolver(patientForm1),
    defaultValues: {
      profileImage: null,
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      nic: "",
    },
  })

  const form2 = useForm<PatientForm2>({
    resolver: yupResolver(patientForm2),
    defaultValues: {
      street: "",
      city: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
  })

  const router = useRouter()

  const setAuth = useAuthStore((s) => s.setAuth)

  const handleSubmitForm1 = form1.handleSubmit(() => {
    setActiveForm(2)
  })

  const handleSubmitForm2 = form2.handleSubmit(async (values) => {
    const form1Values = form1.getValues()
    const form2Values = values

    try {
      setLoading(true)

      const registerResponseData = await register({
        email: form1Values.email,
        password: form2Values.password,
        role: Role.PATIENT,
        patient: {
          first_name: form1Values.firstName,
          last_name: form1Values.lastName,
          email: form1Values.email,
          contact_no: form1Values.mobileNumber,
          gender: form1Values.gender,
          birth_date: form1Values.dob,
          nic: form1Values.nic,
          street: form2Values.street,
          city: form2Values.city,
          province: form2Values.province,
        },
        doctor: null,
      })

      const { user } = await signInWithCustomToken(
        auth,
        registerResponseData.custom_token
      )

      if (!user) {
        throw new Error("User verification failed")
      }

      const idToken = await getIdToken(user)
      const verifyResponse = await verifyUser(idToken)

      const jwt = verifyResponse.jwt_token
      const userId = verifyResponse.uid
      const role = verifyResponse.role

      setAuth(jwt, userId, role)

      if (
        form1Values.profileImage &&
        form1Values.profileImage instanceof File
      ) {
        const formData = new FormData()

        formData.append("file", form1Values.profileImage)
        formData.append("category", role)
        formData.append("id", userId)

        try {
          await uploadProfileImage(formData)
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Profile image upload failed",
            description:
              "Unable to upload the profile image. Please try again after logging to your account.",
          })
        }
      }

      form1.reset()
      form2.reset()
      setActiveForm(3)
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "An unknown error occurred",
        })
      }
    } finally {
      setLoading(false)
    }
  })

  return (
    <div className="relative w-full px-4">
      <Form {...form1}>
        <form
          onSubmit={handleSubmitForm1}
          className={cn(activeForm === 1 ? "block" : "hidden")}
        >
          <PatientRegisterPart1 />

          <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 items-center gap-2">
            <Button
              type="button"
              onClick={() => router.replace(PAGES.REGISTER_SELECT)}
              className="order-2 lg:order-1"
              variant="outline"
            >
              Back
            </Button>
            <Button className="group order-1 lg:order-2">
              Next
              <ChevronRight className="group-hover:translate-x-1 hidden lg:inline-block transition transform" />
            </Button>
          </div>
        </form>
      </Form>

      <Form {...form2}>
        <form
          onSubmit={handleSubmitForm2}
          className={cn(activeForm === 2 ? "block" : "hidden")}
        >
          <PatientRegisterPart2 />

          <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 items-center gap-2">
            <Button
              type="button"
              disabled={loading}
              onClick={() => setActiveForm(1)}
              className="order-2 lg:order-1"
              variant="outline"
            >
              Back
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              className="group order-1 lg:order-2"
            >
              Register
              <ChevronRight className="group-hover:translate-x-1 hidden lg:inline-block transition transform" />
            </Button>
          </div>
        </form>
      </Form>

      {activeForm === 3 && (
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/assets/verified.svg"
            alt="verified icon"
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill size-40"
          />

          <span className="text-2xl font-medium">Congratulations</span>

          <p>
            You have successfully created an account. Best wishes for a
            successful completion of your treatment in the future
          </p>

          <Button
            onClick={() => router.replace(PAGES.PATIENT_DASHBOARD)}
            className="group order-1 lg:order-2"
          >
            Start Treatment
            <ChevronRight className="group-hover:translate-x-1 hidden lg:inline-block transition transform" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default PatientRegisterForm
