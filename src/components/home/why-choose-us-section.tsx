import Image from "next/image"

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col py-20">
      <div className="flex flex-col items-center">
        <h1 className="font-medium text-center lg:text-start">Benefits</h1>
        <h2 className="text-brand-500 text-center lg:text-start text-3xl font-bold capitalize">
          Why Choose Us ?
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-16 gap-16">
        <div className="flex flex-col gap-4 flex-wrap text-pretty">
          <h4>
            <Image
              src="/assets/rectangle.svg"
              alt="bullet"
              width={20}
              height={20}
              className="align-middle inline-block mr-3"
            />
            Expert-Backed Machine Learning Diagnosis
          </h4>
          <p>
            CATARACT CARE leverages machine learning to provide fast and
            accurate diagnosis results, ensuring that users get reliable
            insights on their eye health.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-wrap text-pretty">
          <h4>
            <Image
              src="/assets/rectangle.svg"
              alt="bullet"
              width={20}
              height={20}
              className="align-middle inline-block mr-3"
            />
            Secure Medical Record Management
          </h4>
          <p>
            Your data privacy is our priority. CATARACT CARE offers secure
            storage and easy access to your medical reports and history, so you
            can keep track of your health confidently.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-wrap text-pretty">
          <h4>
            <Image
              src="/assets/rectangle.svg"
              alt="bullet"
              width={20}
              height={20}
              className="align-middle inline-block mr-3"
            />
            Professional Consultations at Your Fingertips
          </h4>
          <p>
            Connect with healthcare professionals for tailored advice and
            recommendations, enabling a personalized and attentive approach to
            your care.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-wrap text-pretty">
          <h4>
            <Image
              src="/assets/rectangle.svg"
              alt="bullet"
              width={20}
              height={20}
              className="align-middle inline-block mr-3"
            />
            User-Friendly Interface
          </h4>
          <p>
            Designed with simplicity in mind, CATARACT CARE makes it easy for
            users of all ages to navigate, access reports, and consult with
            doctors.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-wrap text-pretty">
          <h4>
            <Image
              src="/assets/rectangle.svg"
              alt="bullet"
              width={20}
              height={20}
              className="align-middle inline-block mr-3"
            />
            Convenient Remote Access
          </h4>
          <p>
            Access diagnostic tools and expert consultations from the comfort of
            your home, making it easy to monitor and address eye health without
            in-person visits.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-wrap text-pretty">
          <h4>
            <Image
              src="/assets/rectangle.svg"
              alt="bullet"
              width={20}
              height={20}
              className="align-middle inline-block mr-3"
            />
            Real-Time Results
          </h4>
          <p>
            Receive instant diagnosis results ensuring you stay informed every
            step of the way.
          </p>
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

export default WhyChooseUs
