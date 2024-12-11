"use client"

import { GENDER_TYPE } from "@/constants/common"
import { DoctorForm1 } from "@/utils/auth/doctor-form-validation"
import { Camera, X } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
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

const DoctorRegisterPart1 = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useFormContext<DoctorForm1>()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex flex-col items-center">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e)
                  field.onChange(e.target.files?.[0] || null)
                }}
                ref={(e) => {
                  fileInputRef.current = e
                  field.ref(e)
                }}
                name={field.name}
                onBlur={field.onBlur}
              />
            </FormItem>
          )}
        />

        <div
          onClick={handleImageClick}
          className="relative cursor-pointer group w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Profile preview"
                width={0}
                height={0}
                quality={50}
                className="size-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </>
          ) : (
            <Camera className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {preview && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 mt-2"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4" /> Remove Photo
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <h5 className="font-medium text-sm text-foreground/60">Personal</h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-1 gap-x-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(GENDER_TYPE).map(([key, value]) => (
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

          <FormField
            control={form.control}
            name="nic"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>NIC Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default DoctorRegisterPart1
