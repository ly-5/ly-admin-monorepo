import { cn } from '@workspace/ui/lib/utils'

import type { ComponentProps } from 'react'

export type FormActionsProps = ComponentProps<'div'>

export function FormActions({ className, ...props }: FormActionsProps) {
  return (
    <div
      data-slot="form-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}
