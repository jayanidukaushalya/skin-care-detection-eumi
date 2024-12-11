import PatientRegisterForm from "@/components/auth/patient-reg-form"
import Image from "next/image"

const PatientRegistrationPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-screen-lg relative grid grid-cols-1 drop-shadow shadow-xl rounded-lg lg:grid-cols-2 w-full my-8">
        <div className="relative rounded-s-lg overflow-hidden hidden lg:block">
          <Image
            src="/assets/bg-patient.png"
            alt="bg patient"
            fill
            className="object-cover -z-0"
          />

          <div className="inset-0 absolute bg-foreground/10 z-10" />

          <div className="end-0 bottom-0 absolute bg-background/80 text-foreground z-20 p-4">
            <h5 className="text-lg lg:text-xl font-medium">Dear Patient,</h5>
            <br />
            <p>
              You need to open an account here if you want to efficiently
              benefit from your treatment through this system. That way you can
              continue sharing data correctly.
            </p>
          </div>
        </div>

        <div className="flex relative z-10 bg-background rounded-lg lg:rounded-s-none rounded-e-lg overflow-hidden flex-col items-center justify-center gap-8 py-20 px-4 lg:px-12">
          <Image src="/assets/logo.svg" alt="logo" width={200} height={200} />

          <PatientRegisterForm />
        </div>

        <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-primary" />
      </div>
    </div>
  )
}

export default PatientRegistrationPage
