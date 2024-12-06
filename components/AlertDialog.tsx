import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export interface DialogProps {
  open?: boolean
  children?: React.ReactNode
  title?: string
  desc?: string | React.ReactNode
  confirmText?: string
  onConfirm?: () => void
  cancelText?: string
  onCancel?: () => void
  onOpenChange?: () => void
}

const Dialog = ({
  open,
  children,
  title,
  desc,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  onOpenChange,
}: DialogProps) => {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={onCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          {confirmText && (
            <AlertDialogAction onClick={onConfirm}>
              {confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog
