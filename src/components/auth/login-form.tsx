"use client"

import { verifyUser } from "@/actions/auth.action"
import useAuthStore from "@/app/stores/auth.store"
import { auth } from "@/configs/firebase.config"
import { PAGES, Role } from "@/constants/common"
import { toast } from "@/hooks/use-toast"
import loginFormSchema, {
  LoginFormSchema,
} from "@/utils/auth/login-form-validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth"
import { ChevronRight, Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HTMLInputTypeAttribute, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const LoginForm = () => {
  const [inputType, setInputType] =
    useState<Extract<HTMLInputTypeAttribute, "text" | "password">>("password")
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const setAuth = useAuthStore((s) => s.setAuth)

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true)

      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      const idToken = await getIdToken(user)
      const verifyResponse = await verifyUser(idToken)

      const jwt = verifyResponse.jwt_token
      const userId = verifyResponse.uid
      const role = verifyResponse.role

      setAuth(jwt, userId, role)

      if (verifyResponse.role === Role.PATIENT) {
        router.replace(PAGES.PATIENT_DASHBOARD)
      } else if (verifyResponse.role === Role.DOCTOR) {
        router.replace(PAGES.DOCTOR_DASHBOARD)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "An unknown error occurred",
        })
      }
    } finally {
      setLoading(false)
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col  gap-y-1 gap-x-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={inputType} {...field} />
                  {inputType === "text" && field.value && (
                    <button
                      className="opacity-50 absolute end-5 top-2.5"
                      type="button"
                      aria-label="hide password"
                      onClick={() => setInputType("password")}
                    >
                      <Eye size={20} />
                    </button>
                  )}
                  {inputType === "password" && field.value && (
                    <button
                      type="button"
                      className="opacity-50 absolute end-5 top-2.5"
                      aria-label="show password"
                      onClick={() => setInputType("text")}
                    >
                      <EyeClosed size={20} />
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 items-center gap-2">
          <Button
            type="button"
            onClick={() => router.replace(PAGES.ROOT)}
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
            Login
            <ChevronRight className="group-hover:translate-x-1 hidden lg:inline-block transition transform" />
          </Button>
        </div>

        <p className="text-center text-sm">
          I don&apos; have an account,&nbsp;
          <Link href={PAGES.REGISTER_SELECT}>
            <Button variant="link" className="px-0">
              Register
            </Button>
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default LoginForm
