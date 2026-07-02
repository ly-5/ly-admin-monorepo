import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { useFormContext } from '@workspace/ui/custom/form/context'

import type { ComponentProps } from 'react'

export type ResetButtonProps = ComponentProps<typeof Button>

export function ResetButton({
  children = '重置',
  disabled,
  className,
  variant = 'outline',
  ...props
}: ResetButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="button"
          variant={variant}
          disabled={isSubmitting || disabled}
          className={cn(className)}
          onClick={() => {
            form.reset()
          }}
          {...props}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
