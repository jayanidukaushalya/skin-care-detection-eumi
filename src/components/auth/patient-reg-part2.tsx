"use client"

import { PROVINCE } from "@/constants/common"
import { PatientForm2 } from "@/utils/auth/patient-form-validation"
import { Eye, EyeClosed } from "lucide-react"
import { HTMLInputTypeAttribute, useState } from "react"
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

const PatientRegisterPart2 = () => {
  const [inputType, setInputType] =
    useState<Extract<HTMLInputTypeAttribute, "text" | "password">>("password")
  const [inputType2, setInputType2] =
    useState<Extract<HTMLInputTypeAttribute, "text" | "password">>("password")

  const form = useFormContext<PatientForm2>()

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="space-y-1">
        <h5 className="font-medium text-sm text-foreground/60">Address</h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-1 gap-x-2">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(PROVINCE).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-1">
        <h5 className="font-medium text-sm text-foreground/60">Security</h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-1 gap-x-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={inputType} {...field} />
                    {inputType === "text" && field.value && (
                      <button
                        className="opacity-50 absolute end-5 top-2.5"
                        type="button"
                        aria-label="hide password"
                        onClick={() => setInputType("password")}
                      >
                        <Eye size={20} className="opacity-50" />
                      </button>
                    )}
                    {inputType === "password" && field.value && (
                      <button
                        type="button"
                        className="opacity-50 absolute end-5 top-2.5"
                        aria-label="show password"
                        onClick={() => setInputType("text")}
                      >
                        <EyeClosed size={20} className="opacity-50" />
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={inputType2} {...field} />
                    {inputType2 === "text" && field.value && (
                      <button
                        className="opacity-50 absolute end-5 top-2.5"
                        type="button"
                        aria-label="hide confirm password"
                        onClick={() => setInputType2("password")}
                      >
                        <Eye size={20} className="opacity-50" />
                      </button>
                    )}
                    {inputType2 === "password" && field.value && (
                      <button
                        type="button"
                        className="opacity-50 absolute end-5 top-2.5"
                        aria-label="show confirm password"
                        onClick={() => setInputType2("text")}
                      >
                        <EyeClosed size={20} className="opacity-50" />
                      </button>
                    )}
                  </div>
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

export default PatientRegisterPart2
