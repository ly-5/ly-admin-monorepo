import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { useFieldContext } from '@workspace/ui/custom/form/context'
import { cn } from '@workspace/ui/lib/utils'

import { FormFieldLayout } from './form-field-layout'

import type { FormFieldLayoutProps, SelectOption } from '../types'

export type SelectFieldProps = FormFieldLayoutProps & {
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  triggerClassName?: string
  size?: 'sm' | 'default'
}

export function SelectField({
  label,
  description,
  required,
  orientation,
  labelClassName,
  contentClassName,
  options,
  placeholder,
  disabled,
  triggerClassName,
  size = 'default',
}: SelectFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const value = field.state.value || undefined

  return (
    <FormFieldLayout
      label={label}
      description={description}
      required={required}
      orientation={orientation}
      labelClassName={labelClassName}
      contentClassName={contentClassName}
    >
      <Select
        value={value}
        disabled={disabled}
        onValueChange={(nextValue) => {
          field.handleChange(nextValue)
          field.handleBlur()
        }}
      >
        <SelectTrigger
          id={field.name}
          size={size}
          aria-invalid={isInvalid || undefined}
          className={cn('w-full', triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormFieldLayout>
  )
}
