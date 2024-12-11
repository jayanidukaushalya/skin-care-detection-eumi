import LoginForm from "@/components/auth/login-form"
import Image from "next/image"

const LoginPage = () => {
  return (
    <div className="min-h-screen container flex justify-center items-center">
      <div className="max-w-screen-lg relative grid grid-cols-1 drop-shadow shadow-xl rounded-lg lg:grid-cols-2 my-8 w-full">
        <div className="relative rounded-s-lg overflow-hidden">
          <Image
            src="/assets/bg-patient.png"
            alt="bg patient"
            fill
            className="object-cover -z-0"
          />

          <div className="inset-0 absolute bg-foreground/10 z-10" />
        </div>

        <div className="flex relative z-10 bg-background rounded-lg lg:rounded-s-none rounded-e-lg overflow-hidden flex-col  items-center justify-center gap-8 py-20 px-4 lg:px-12">
          <Image src="/assets/logo.svg" alt="logo" width={200} height={200} />

          <h3 className="text-2xl uppercase font-medium bg-gradient-to-tr text-transparent bg-clip-text from-brand-600 to-brand-500">
            Login
          </h3>

          <LoginForm />
        </div>

        <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-primary" />
      </div>
    </div>
  )
}

export default LoginPage
