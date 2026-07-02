import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@workspace/ui/components/field'
import { cn } from '@workspace/ui/lib/utils'
import { useFieldContext } from '@workspace/ui/custom/form/context'
import { getFieldErrors } from '@workspace/ui/custom/form/utils'

import type { FormFieldLayoutProps } from '../types'

export function FormFieldLayout({
  label,
  description,
  required,
  orientation = 'horizontal',
  labelClassName,
  contentClassName,
  children,
}: FormFieldLayoutProps & {
  children: React.ReactNode
}) {
  const field = useFieldContext<unknown>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const errors = getFieldErrors(field.state.meta)

  return (
    <Field orientation={orientation} data-invalid={isInvalid || undefined}>
      <FieldLabel htmlFor={field.name} className={cn('w-[140px]', labelClassName)}>
        {label}
        {required ? <span className="text-destructive">*</span> : null}
      </FieldLabel>
      <FieldContent className={contentClassName}>
        {children}
        {description ? <FieldDescription>{description}</FieldDescription> : null}
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
