import { Textarea } from '@workspace/ui/components/textarea'
import { useFieldContext } from '@workspace/ui/custom/form/context'
import { cn } from '@workspace/ui/lib/utils'

import { FormFieldLayout } from './form-field-layout'

import type { FormFieldLayoutProps } from '../types'
import type { ComponentProps } from 'react'

export type TextareaFieldProps = FormFieldLayoutProps &
  Omit<ComponentProps<typeof Textarea>, 'id' | 'name' | 'value' | 'defaultValue'>

export function TextareaField({
  label,
  description,
  required,
  orientation,
  labelClassName,
  contentClassName,
  className,
  onBlur,
  onChange,
  ...props
}: TextareaFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormFieldLayout
      label={label}
      description={description}
      required={required}
      orientation={orientation}
      labelClassName={labelClassName}
      contentClassName={contentClassName}
    >
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value ?? ''}
        aria-invalid={isInvalid || undefined}
        className={cn(className)}
        onBlur={(event) => {
          onBlur?.(event)
          field.handleBlur()
        }}
        onChange={(event) => {
          onChange?.(event)
          field.handleChange(event.target.value)
        }}
        {...props}
      />
    </FormFieldLayout>
  )
}
