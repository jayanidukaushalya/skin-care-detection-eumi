import HowToWork from "@/components/home/how-to-work-section"
import WhoWeAre from "@/components/home/who-we-are-section"
import WhyChooseUs from "@/components/home/why-choose-us-section"

const HomePage = () => {
  return (
    <div className="flex flex-col py-8 lg:py-0">
      <WhoWeAre />
      <HowToWork />
      <WhyChooseUs />
    </div>
  )
}

export default HomePage
