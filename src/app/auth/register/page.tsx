import { Button } from "@/components/ui/button"
import { PAGES } from "@/constants/common"
import Image from "next/image"
import Link from "next/link"

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-screen-lg relative grid grid-cols-1 drop-shadow shadow-xl rounded-lg lg:grid-cols-2 w-full my-8">
        <div className="relative rounded-s-lg overflow-hidden">
          <Image
            src="/assets/bg-patient.jpg"
            alt="bg patient"
            fill
            className="object-cover -z-0"
          />

          <div className="inset-0 absolute bg-foreground/10 z-10" />
        </div>

        <div className="flex relative z-10 bg-background rounded-lg lg:rounded-s-none rounded-e-lg overflow-hidden flex-col items-center justify-center gap-8 py-20 px-4 lg:px-12">
          <Image src="/assets/logo.svg" alt="logo" width={200} height={200} />

          <div className="flex flex-col gap-4">
            <Link
              href={PAGES.REGISTER_PATIENT}
              className="border rounded-lg p-4 cursor-pointer select-none gap-4 grid grid-cols-2 hover:bg-primary/5 transition"
            >
              <div className="relative">
                <Image
                  src="/assets/choose-patient.png"
                  alt="choose patient"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h3>
                  Login as
                  <br />
                  <span className="text-3xl font-medium">Patient</span>
                </h3>
                <p>Log in as a patient to check for any health issues.</p>
              </div>
            </Link>

            <Link
              href={PAGES.REGISTER_DOCTOR}
              className="border rounded-lg p-4 cursor-pointer select-none gap-4 grid grid-cols-2 hover:bg-primary/5 transition"
            >
              <div className="relative">
                <Image
                  src="/assets/choose-doctor.png"
                  alt="choose doctor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h3>
                  Login as
                  <br />
                  <span className="text-3xl font-medium">Doctor</span>
                </h3>
                <p>If you log in as a doctor, you can treat patients.</p>
              </div>
            </Link>
          </div>

          <p className="text-center text-sm">
            I you have an account,&nbsp;
            <Link href={PAGES.LOGIN}>
              <Button variant="link" className="px-0">
                Login
              </Button>
            </Link>
          </p>
        </div>

        <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-primary" />
      </div>
    </div>
  )
}

export default RegisterPage
