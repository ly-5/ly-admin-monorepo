import { Input } from '@workspace/ui/components/input'
import { useFieldContext } from '@workspace/ui/custom/form/context'
import { cn } from '@workspace/ui/lib/utils'

import { FormFieldLayout } from './form-field-layout'

import type { FormFieldLayoutProps } from '../types'
import type { ComponentProps } from 'react'

export type InputFieldProps = FormFieldLayoutProps &
  Omit<ComponentProps<typeof Input>, 'id' | 'name' | 'value' | 'defaultValue'>

export function InputField({
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
}: InputFieldProps) {
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
      <Input
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
