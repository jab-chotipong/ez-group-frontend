import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Controller, useFormContext } from 'react-hook-form'

export function SelectOption({ options, placeholder, label, name, width }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={`${width ? width : 'w-full'}`}>
          <Select
            value={field.value}
            onValueChange={(val) => field.onChange(val)}
          >
            <div className={`flex flex-col gap-2 font-semibold `}>
              <p>{label}</p>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </div>
          </Select>
        </div>
      )}
    />
  )
}
