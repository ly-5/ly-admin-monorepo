import type { FormValidateOrFn } from '@tanstack/react-form'
import type { z } from 'zod'

export type ZodFormSchema = z.ZodType

export type ZodValidationMode = 'onChange' | 'onBlur' | 'onSubmit'

export function createZodFormValidators<TSchema extends ZodFormSchema>(
  schema: TSchema,
  mode: ZodValidationMode = 'onChange'
) {
  return {
    [mode]: schema,
  } as Partial<Record<ZodValidationMode, FormValidateOrFn<z.infer<TSchema>>>>
}

export function mergeFormValidators<TFormData extends Record<string, unknown>>(
  base?: {
    onChange?: FormValidateOrFn<TFormData>
    onBlur?: FormValidateOrFn<TFormData>
    onSubmit?: FormValidateOrFn<TFormData>
  },
  zodSchema?: ZodFormSchema,
  mode: ZodValidationMode = 'onChange'
) {
  if (!zodSchema) {
    return base
  }

  return {
    ...base,
    [mode]: zodSchema,
  }
}

export function createFieldZodValidators<TSchema extends ZodFormSchema>(
  schema: TSchema,
  mode: ZodValidationMode = 'onChange'
) {
  return {
    [mode]: schema,
  }
}
