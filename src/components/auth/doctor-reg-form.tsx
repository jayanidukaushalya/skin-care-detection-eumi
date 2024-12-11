"use client"

import { register, verifyUser } from "@/actions/auth.action"
import {
  uploadLicenseDocument,
  uploadProfileImage,
} from "@/actions/file-upload.action"
import { auth } from "@/configs/firebase.config"
import { DOCTOR_SPECIALIZATION, PAGES, Role } from "@/constants/common"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  doctorForm1,
  DoctorForm1,
  doctorForm2,
  DoctorForm2,
  doctorForm3,
  DoctorForm3,
} from "@/utils/auth/doctor-form-validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { getIdToken, signInWithCustomToken } from "firebase/auth"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import DoctorRegisterPart1 from "./doctor-reg-part1"
import DoctorRegisterPart2 from "./doctor-reg-part2"
import DoctorRegisterPart3 from "./doctor-reg-part3"

const DoctorRegistrationForm = () => {
  const [activeForm, setActiveForm] = useState<1 | 2 | 3 | 4>(1)
  const [loading, setLoading] = useState(false)

  const form1 = useForm<DoctorForm1>({
    resolver: yupResolver(doctorForm1),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      nic: "",
    },
  })

  const form2 = useForm<DoctorForm2>({
    resolver: yupResolver(doctorForm2),
    defaultValues: {
      street: "",
      city: "",
      password: "",
      confirmPassword: "",
      languagesSpoken: "",
      consultationFee: 0,
      sessionTime: 30,
      availableFrom: "",
      availableTo: "",
    },
  })

  const form3 = useForm<DoctorForm3>({
    resolver: yupResolver(doctorForm3),
    defaultValues: {
      regNo: "",
      hospitalName: "",
      termsAndConditions: false,
      yearsOfExperience: 1,
    },
  })

  const router = useRouter()

  const handleSubmitForm1 = form1.handleSubmit((values) => {
    setActiveForm(2)
  })

  const handleSubmitForm2 = form2.handleSubmit((values) => {
    setActiveForm(3)
  })

  const handleSubmitForm3 = form3.handleSubmit(async (values) => {
    const form1Values = form1.getValues()
    const form2Values = form2.getValues()
    const form3Values = values

    try {
      setLoading(true)

      const registerResponseData = await register({
        email: form1Values.email,
        password: form2Values.password,
        role: Role.DOCTOR,
        doctor: {
          first_name: form1Values.firstName,
          last_name: form1Values.lastName,
          email: form1Values.email,
          contact_no: form1Values.mobileNumber,
          gender: form1Values.gender,
          nic: form1Values.nic,
          street: form2Values.street,
          city: form2Values.city,
          province: form2Values.province,
          languagesSpoken: form2Values.languagesSpoken,
          consultationFee: form2Values.consultationFee,
          sessionTime: form2Values.sessionTime,
          from: form2Values.availableFrom,
          to: form2Values.availableTo,
          slmcRegistrationNumber: form3Values.regNo,
          yearsOfExperience: form3Values.yearsOfExperience,
          specialty: form3Values.specialization as DOCTOR_SPECIALIZATION,
          hospital: form3Values.hospitalName,
          isActive: false,
        },
        patient: null,
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

      const role = verifyResponse.role
      const userId = verifyResponse.uid

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

      if (form3Values.licenseDocument instanceof File) {
        const formData = new FormData()

        formData.append("file", form3Values.licenseDocument)
        formData.append("id", userId)

        try {
          await uploadLicenseDocument(formData)
        } catch (error) {
          console.log(
            "License document upload failed, Unable to upload the license document."
          )
        }
      }

      form1.reset()
      form2.reset()
      form3.reset()
      setActiveForm(4)
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
          <DoctorRegisterPart1 />

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
          <DoctorRegisterPart2 />

          <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 items-center gap-2">
            <Button
              type="button"
              onClick={() => setActiveForm(1)}
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

      <Form {...form3}>
        <form
          onSubmit={handleSubmitForm3}
          className={cn(activeForm === 3 ? "block" : "hidden")}
        >
          <DoctorRegisterPart3 />

          <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 items-center gap-2">
            <Button
              type="button"
              disabled={loading}
              onClick={() => setActiveForm(2)}
              className="order-2 lg:order-1"
              variant="outline"
            >
              Back
            </Button>
            <Button
              disabled={loading}
              loading={loading}
              className="group order-1 lg:order-2"
            >
              Register
              <ChevronRight className="group-hover:translate-x-1 hidden lg:inline-block transition transform" />
            </Button>
          </div>
        </form>
      </Form>

      {activeForm === 4 && (
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

          <div className="text-center">
            <p>
              You have successfully created an account. Please wait until
              you&apos;re being approved
            </p>
          </div>

          <Link href={PAGES.ROOT}>
            <Button className="group order-1 lg:order-2">
              Go to Dashboard
              <ChevronRight className="group-hover:translate-x-1 hidden lg:inline-block transition transform" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DoctorRegistrationForm
