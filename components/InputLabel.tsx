import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputLabelProps {
  id: string
  label: string
  type: string
  placeholder?: string
  min?: string
  width?: string
  onBlur?: (e: any) => any
  disabled?: boolean
}

export function InputWithLabel({
  id,
  label,
  type,
  placeholder,
  min,
  width,
  onBlur,
  disabled,
}: InputLabelProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div
      className={`grid max-w-sm ${
        width ? `w-[${width}]` : 'w-full'
      } items-center gap-1.5`}
    >
      <div className='flex justify-between items-end'>
        <Label htmlFor={id}>{label}</Label>
        {errors[id] && (
          <p className='text-red-500 text-[12px]'>
            {errors[id].message as ReactNode}
          </p>
        )}
      </div>
      <Input
        {...register(id)}
        min={min}
        disabled={disabled}
        type={type}
        id={id}
        onBlur={onBlur}
        className={width ? `w-[${width}]` : 'w-full'}
        placeholder={placeholder}
      />
    </div>
  )
}
