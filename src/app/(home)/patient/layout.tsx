import Protected from "@/components/providers/protected"
import { PropsWithChildren } from "react"

const PatientPageLayout = ({ children }: PropsWithChildren) => {
  return <Protected>{children}</Protected>
}

export default PatientPageLayout
