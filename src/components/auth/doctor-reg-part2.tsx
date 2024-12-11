"use client"

import { PROVINCE } from "@/constants/common"
import { DoctorForm2 } from "@/utils/auth/doctor-form-validation"
import { Eye, EyeClosed } from "lucide-react"
import { HTMLInputTypeAttribute, useState } from "react"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const DoctorRegisterPart2 = () => {
  const [inputType, setInputType] =
    useState<Extract<HTMLInputTypeAttribute, "text" | "password">>("password")
  const [inputType2, setInputType2] =
    useState<Extract<HTMLInputTypeAttribute, "text" | "password">>("password")

  const form = useFormContext<DoctorForm2>()

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2">
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

      <FormField
        control={form.control}
        name="languagesSpoken"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Languages Spoken</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2">
        <FormField
          control={form.control}
          name="consultationFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consultation Fee (LKR)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sessionTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Time (Minutes)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-3 flex-col">
        <Label className="font-normal">Available Time</Label>

        <div className="flex items-center gap-x-2">
          <FormField
            control={form.control}
            name="availableFrom"
            render={({ field }) => (
              <FormItem className="flex-1">
                <input
                  className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="time"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-2 bg-black/50 h-0.5" />

          <FormField
            control={form.control}
            name="availableTo"
            render={({ field }) => (
              <FormItem className="flex-1">
                <input
                  className="h-10 rounded-md w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="time"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default DoctorRegisterPart2
