/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from './label'
import { Controller, useFormContext } from 'react-hook-form'

interface ComboBoxProps {
  label: string
  placeholder: string
  name: string
  options: any[]
  onSearchChange: (e: any) => any
  onSelect?: (value: any) => any
}

export function Combobox({
  label,
  placeholder,
  name,
  options,
  onSearchChange,
  onSelect,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const { control } = useFormContext()

  const handleOnSearchChange = (e: string) => {
    if (e === '') {
      return
    }
    onSearchChange(e)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className='flex flex-col gap-1'>
              <Label className='pl-1 text-sm'>{label}</Label>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                type='button'
                className='w-[250px] justify-between text-sm font-normal text-gray-500'
              >
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
                <ChevronDown className='opacity-50' />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-[250px] p-0'>
            <Command shouldFilter={false}>
              <CommandInput
                onInput={(e) => handleOnSearchChange(e.target.value)}
                placeholder='Search framework...'
                className='h-9'
              />
              <CommandList>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : option.value)
                        field.onChange(option.value)
                        setOpen(false)
                        onSelect && onSelect(option)
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          value === option.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
