import DoctorRegistrationForm from "@/components/auth/doctor-reg-form"
import Image from "next/image"

const DoctorRegistrationPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-screen-lg relative grid grid-cols-1 drop-shadow shadow-xl rounded-lg lg:grid-cols-2 w-full my-8">
        <div className="relative rounded-s-lg overflow-hidden hidden lg:block">
          <Image
            src="/assets/bg-doctor.png"
            alt="bg doctor "
            fill
            className="object-cover -z-0"
          />

          <div className="inset-0 absolute bg-foreground/10 z-10" />

          <div className="end-0 bottom-0 absolute bg-background/80 text-foreground z-20 p-4">
            <h5 className="text-lg lg:text-xl font-medium">Dear Doctor,</h5>
            <br />
            <p>
              If you want to efficiently provide your treatment to patients
              through this system then you should open an account here. This
              allows you to accurately share data and gain the trust of
              patients.
            </p>
          </div>
        </div>

        <div className="flex relative z-10 bg-background rounded-lg lg:rounded-s-none rounded-e-lg overflow-hidden flex-col items-center justify-center gap-8 py-20 px-4 lg:px-12">
          <Image src="/assets/logo.svg" alt="logo" width={200} height={200} />

          <DoctorRegistrationForm />
        </div>

        <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-primary" />
      </div>
    </div>
  )
}

export default DoctorRegistrationPage
