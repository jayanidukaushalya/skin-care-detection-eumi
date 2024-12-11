import { date, InferType, mixed, object, string } from "yup"

const quizFormSchema = object({
  symptomDate: date()
    .max(new Date(), "Future dates are not allowed.")
    .required("Please select the date you began experiencing symptoms."),
  symptomFrequency: string()
    .oneOf(["all-time", "some-time", ""])
    .required(
      "Please indicate whether your symptoms are constant or intermittent."
    ),
  visionProblemsBrightLight: string()
    .oneOf(["yes", "no", ""])
    .required("Please indicate if you have vision problems in bright light."),
  symptomsWorsened: string()
    .oneOf(["yes", "no", ""])
    .required("Please specify if your symptoms have worsened."),
  visionProblemsDriving: string()
    .oneOf(["yes", "no", ""])
    .required("Please indicate if you have vision problems while driving."),
  visionProblemsReading: string()
    .oneOf(["yes", "no", ""])
    .required(
      "Please specify if your vision problems make it difficult to read."
    ),
  visionProblemsWorking: string()
    .oneOf(["yes", "no", ""])
    .required(
      "Please indicate if your vision problems make it difficult to work."
    ),
  eyeInjuryOrSurgery: string()
    .oneOf(["yes", "no", ""])
    .required("Please specify if you have had an eye injury or surgery."),
  eyeConditionDiagnosis: string()
    .oneOf(["yes", "no", ""])
    .required("Please specify if you have had an eye injury or surgery."),
  radiationTherapyHeadNeck: string()
    .oneOf(["yes", "no", ""])
    .required(
      "Please specify if you have received radiation therapy to your head or neck."
    ),
  cataractImage: mixed().required(
    "Please upload the required document in Image format"
  ),
})

export type QuizFormSchema = InferType<typeof quizFormSchema>

export default quizFormSchema
