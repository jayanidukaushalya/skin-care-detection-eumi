import Protected from "@/components/providers/protected"
import { PropsWithChildren } from "react"

const PredictPageLayout = ({ children }: PropsWithChildren) => {
  return <Protected>{children}</Protected>
}

export default PredictPageLayout
