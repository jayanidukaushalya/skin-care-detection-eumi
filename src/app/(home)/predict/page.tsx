"use client"

import { uploadPredictImage } from "@/actions/file-upload.action"
import QuizWarningAlert from "@/components/patient/quiz-warning-alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import quizFormSchema, {
  QuizFormSchema,
} from "@/utils/auth/quiz-form-validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { Upload } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"

const PatientQuiz = () => {
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<QuizFormSchema>({
    resolver: yupResolver(quizFormSchema),
    defaultValues: {
      symptomFrequency: "",
      visionProblemsBrightLight: "",
      symptomsWorsened: "",
      visionProblemsDriving: "",
      visionProblemsReading: "",
      visionProblemsWorking: "",
      eyeInjuryOrSurgery: "",
      eyeConditionDiagnosis: "",
      radiationTherapyHeadNeck: "",
    },
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setFileName(file.name)
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values)

    try {
      setLoading(true)

      if (values.cataractImage instanceof File) {
        const formData = new FormData()

        formData.append("image", values.cataractImage)
        formData.append("id", values.cataractImage)

        await uploadPredictImage(formData)

        form.reset()

        setOpen(true)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Prediction failed",
        description:
          "An error occurred while processing your prediction. Please try again later or contact support if the issue persists.",
      })
    } finally {
      setLoading(false)
    }
  })

  return (
    <Form {...form}>
      <QuizWarningAlert dialogOpen={open} setDialogOpen={setOpen} />

      <form onSubmit={onSubmit} className="flex flex-col py-4 gap-4">
        <p className="text-xl lg:text-2xl font-medium text-center lg:text-start">
          <span>Hi,</span>
          &nbsp;
          <span className="bg-gradient-to-tr text-transparent bg-clip-text from-brand-600 to-brand-500">
            Ready for Your First Treatment? Let&apos;s Get Started!
          </span>
        </p>

        <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="symptomDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">
                  01. When did you begin having symptoms?
                </FormLabel>
                <FormControl>
                  <input
                    className="h-10 w-full lg:w-60 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    type="date"
                    name={field.name}
                    value={
                      field.value
                        ? format(new Date(field.value), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={field.onChange}
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symptomFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  02. Do you have your symptoms all the time or do they come and
                  go?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all-time" />
                      </FormControl>
                      <FormLabel className="text-base">Have all time</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="some-time" />
                      </FormControl>
                      <FormLabel className="text-base">Some Time</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visionProblemsBrightLight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  03. Do you have vision problems in bright light?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symptomsWorsened"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  04. Have your symptoms gotten worse?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visionProblemsDriving"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  05. Do your vision problems make it difficult for you to
                  drive?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visionProblemsReading"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  06. Do your vision problems make it difficult to read?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visionProblemsWorking"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  07. Do your vision problems make it difficult to do your job?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eyeInjuryOrSurgery"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  08. Have you ever had an eye injury or eye surgery?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eyeConditionDiagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  09. Have you ever been diagnosed with an eye problem, such as
                  inflammation of your iris?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="radiationTherapyHeadNeck"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  10. Have you ever received radiation therapy to your head or
                  neck?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-10"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="text-base">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="text-base">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cataractImage"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel className="text-base">
                  11. Upload your eye image
                </FormLabel>
                <FormControl>
                  <label
                    htmlFor="licenseDocument"
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer",
                      "bg-gray-50 hover:bg-gray-100 transition-colors duration-200",
                      form.formState.errors.cataractImage
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-5 h-5 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {fileName ? fileName : "Upload PDF, JPG, PNG"}
                      </p>
                    </div>
                    <input
                      id="licenseDocument"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0])
                        handleFileChange(e)
                      }}
                      onBlur={field.onBlur}
                    />
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button disabled={loading} loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PatientQuiz
