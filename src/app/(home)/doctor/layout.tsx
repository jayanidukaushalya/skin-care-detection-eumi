import Protected from "@/components/providers/protected"
import { PropsWithChildren } from "react"

const DoctorPageLayout = ({ children }: PropsWithChildren) => {
  return <Protected>{children}</Protected>
}

export default DoctorPageLayout
