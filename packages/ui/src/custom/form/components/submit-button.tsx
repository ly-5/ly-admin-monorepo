import { Button } from '@workspace/ui/components/button'
import { Spinner } from '@workspace/ui/components/spinner'
import { cn } from '@workspace/ui/lib/utils'
import { useFormContext } from '@workspace/ui/custom/form/context'

import type { ComponentProps } from 'react'

export type SubmitButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean
}

export function SubmitButton({
  children = '提交',
  loading,
  disabled,
  className,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => ({
        canSubmit: state.canSubmit,
        isSubmitting: state.isSubmitting,
        isValidating: state.isValidating,
      })}
    >
      {({ canSubmit, isSubmitting, isValidating }) => {
        const isProcessing = isSubmitting || isValidating || loading

        return (
          <Button
            type="submit"
            disabled={!canSubmit || isProcessing || disabled}
            className={cn(className)}
            {...props}
          >
            {isProcessing ? <Spinner data-icon="inline-start" /> : null}
            {children}
          </Button>
        )
      }}
    </form.Subscribe>
  )
}
