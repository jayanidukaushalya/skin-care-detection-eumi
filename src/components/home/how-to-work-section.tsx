import Image from "next/image"

const HowToWork = () => {
  return (
    <section className="flex flex-col pt-20">
      <div className="flex flex-col items-center">
        <h1 className="font-medium text-center lg:text-start">Work Process</h1>
        <h2 className="text-brand-500 text-center lg:text-start text-3xl font-bold capitalize">
          How to Work ?
        </h2>
      </div>

      <div className="lg:grid grid-cols-4 mt-12 items-center hidden">
        <div className="flex items-center justify-end flex-1">
          <div className="bg-brand-500 text-background flex justify-center items-center font-medium rounded-full size-10">
            01
          </div>
          <div className="h-1 rounded-s-full bg-brand-600 w-[calc(50%-2rem)] ms-4" />
        </div>
        <div className="flex items-center justify-end flex-1">
          <div className="h-1 rounded-e-full bg-primary w-[calc(50%-2rem)] me-4" />
          <div className="bg-brand-500 text-background shrink-0 flex justify-center items-center font-medium rounded-full size-10">
            02
          </div>
          <div className="h-1 rounded-s-full bg-brand-600 w-[calc(50%-2rem)] ms-4" />
        </div>
        <div className="flex items-center justify-end gap-4 flex-1">
          <div className="h-1 rounded-e-full bg-primary w-[calc(50%-2rem)] me-4" />
          <div className="bg-brand-500 shrink-0 text-background flex justify-center items-center font-medium rounded-full size-10">
            03
          </div>
          <div className="h-1 rounded-s-full bg-brand-600 w-[calc(50%-2rem)] ms-4" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-1 rounded-e-full bg-primary w-[calc(50%-2rem)] me-4" />
          <div className="bg-brand-500 text-background flex justify-center items-center font-medium rounded-full size-10">
            04
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 mt-12 lg:mt-8 gap-8">
        <div className="flex flex-col border rounded-lg overflow-hidden p-4">
          <Image
            src="/assets/upload-image.svg"
            alt="upload image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-60"
          />

          <div className="text-center flex flex-col gap-3">
            <h5 className="font-medium text-xl">Upload Your Eye Image</h5>
            <p>
              Start by capturing and uploading a clear photo of your eye
              directly on our platform. Our system uses this image to detect any
              signs of cataracts.
            </p>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg overflow-hidden p-4">
          <Image
            src="/assets/doctor-consulting.svg"
            alt="instant diagnosis"
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-60"
          />

          <div className="text-center flex flex-col gap-3">
            <h5 className="font-medium text-xl">Instant Diagnosis</h5>
            <p>
              Our AI-driven tool analyzes the uploaded image to provide you with
              a diagnostic report within seconds. You&apos;ll receive a report
              highlighting any indications of cataracts.
            </p>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg overflow-hidden p-4">
          <Image
            src="/assets/laboratory-diagnostic.svg"
            alt="consultation with a doctor"
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-60"
          />

          <div className="text-center flex flex-col gap-3">
            <h5 className="font-medium text-xl">Consultation with a Doctor</h5>
            <p>
              If further consultation is recommended, you can easily connect
              with a doctor through chat or video call. Our platform is giving
              you easy access to professional advice.
            </p>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg overflow-hidden p-4">
          <Image
            src="/assets/medical-history.svg"
            alt="track your health history"
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-60"
          />

          <div className="text-center flex flex-col gap-3">
            <h5 className="font-medium text-xl">Track Your Health History</h5>
            <p>
              View and manage your medical reports and past consultations in one
              place. CATARACT CARE securely stores your records, making it
              simple to monitor your eye health over time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  )
}

export default HowToWork
