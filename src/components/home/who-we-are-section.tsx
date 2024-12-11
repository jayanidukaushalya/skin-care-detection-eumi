import Image from "next/image"

const WhoWeAre = () => {
  return (
    <section className="lg:h-[calc(100vh-4rem)] flex items-center justify-center relative">
      <div className="w-full lg:h-2/3 relative gap-8 lg:-mt-20 flex flex-col lg:flex-row items-end">
        <div className="lg:start-0 lg:-bottom-20 lg:h-min w-full lg:w-1/2 relative lg:absolute">
          <div className="rounded-lg relative z-10 bg-white lg:p-8 lg:shadow-lg lg:drop-shadow-sm">
            <h1 className="font-medium text-center lg:text-start">About Us</h1>
            <h2 className="text-brand-500 text-center lg:text-start text-3xl font-bold capitalize">
              Who we are?
            </h2>

            <div className="mt-8 lg:mt-6">
              <p>
                CATARACT CARE is an innovative, web-based platform designed to
                simplify and improve the diagnosis and management of cataracts.
                With the power of advanced machine learning technology, this
                system allows users to upload images of their eyes for instant
                analysis and diagnostic reports. From diagnosis to consultation,
                CATARACT CARE streamlines every step, making it easy for users
                to connect with healthcare professionals and receive the
                guidance they need from the comfort of their home.
              </p>
              <br />
              <p>
                With a focus on accessibility, ease of use, and expert-backed
                technology, CATARACT CARE supports users in understanding their
                eye health and getting the care they need without the hassle of
                in-person visits. This platform is designed for anyone looking
                to take a proactive approach to their eye health, ensuring that
                personalized care is just a click away.
              </p>
            </div>
          </div>

          <div className="absolute lg:block hidden -z-10 inset-0 blur-3xl opacity-30 bg-primary" />
        </div>

        <div className="w-full lg:w-2/3 end-0 bottom-0 h-full relative lg:absolute z-0 rounded-lg overflow-hidden">
          <Image
            src="/assets/bg-patient.png"
            alt="banner image"
            width={0}
            height={0}
            sizes="100vw"
            className="size-full object-center object-cover"
          />

          <div className="inset-0 absolute bg-foreground/10 z-10" />
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
