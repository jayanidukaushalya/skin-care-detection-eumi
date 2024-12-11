"use client"

import { DOCTOR_SPECIALIZATION } from "@/constants/common"
import { cn } from "@/lib/utils"
import { DoctorForm3 } from "@/utils/auth/doctor-form-validation"
import { Upload } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const DoctorRegisterPart3 = () => {
  const [fileName, setFileName] = useState("")

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setFileName(file.name)
    }
  }

  const form = useFormContext<DoctorForm3>()

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="space-y-1">
        <h5 className="font-medium text-sm text-foreground/60">About career</h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-1 gap-x-2">
          <FormField
            control={form.control}
            name="regNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SLMC registration no</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of experience</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Specialization</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(DOCTOR_SPECIALIZATION).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hospitalName"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Working Clinic/Hospital Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licenseDocument"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Upload License Document</FormLabel>
                <FormControl>
                  <label
                    htmlFor="licenseDocument"
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer",
                      "bg-gray-50 hover:bg-gray-100 transition-colors duration-200",
                      form.formState.errors.licenseDocument
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-5 h-5 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {fileName ?? "Upload PDF, JPG, PNG"}
                      </p>
                    </div>
                    <input
                      id="licenseDocument"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
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
      </div>

      <div className="space-y-1">
        <h5 className="font-medium text-sm text-foreground/60">
          Terms and conditions
        </h5>

        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the terms and conditions and privacy policy.
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default DoctorRegisterPart3
