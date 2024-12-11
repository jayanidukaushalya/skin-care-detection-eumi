import Footer from "@/components/common/footer"
import Navbar from "@/components/common/navbar"
import { ReactNode } from "react"

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar />

      <div className="mt-16 mb-20 sm:mb-28 md:mb-32 lg:mb-40 xl:mb-48 2xl:mb-60 flex-1 flex container">
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default HomeLayout
