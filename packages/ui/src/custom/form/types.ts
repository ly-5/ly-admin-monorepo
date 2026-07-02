import type { AnyFieldApi, FieldValidators } from '@tanstack/react-form'

import type { ComponentProps, ReactNode } from 'react'

import type { z } from 'zod'

import type { Input } from '@workspace/ui/components/input'

import type { Textarea } from '@workspace/ui/components/textarea'

import type { ZodValidationMode } from './validation/zod'

export type FieldOrientation = 'horizontal' | 'vertical' | 'responsive'

export type FieldComponentType = 'Input' | 'Select' | 'Textarea' | 'Custom'

export interface SelectOption {
  label: string

  value: string

  disabled?: boolean
}

export interface FormFieldLayoutProps {
  label: ReactNode

  description?: ReactNode

  required?: boolean

  orientation?: FieldOrientation

  labelClassName?: string

  contentClassName?: string
}

interface BaseSchemaItem<TName extends string = string> {
  name: TName

  label: ReactNode

  description?: ReactNode

  required?: boolean

  orientation?: FieldOrientation

  labelClassName?: string

  contentClassName?: string

  defaultValue?: unknown

  zodSchema?: z.ZodType

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  validators?: FieldValidators<any, any, any, any, any, any, any, any, any, any, any, any>
}

export interface InputSchemaItem<TName extends string = string> extends BaseSchemaItem<TName> {
  componentType: 'Input'

  componentProps?: Omit<ComponentProps<typeof Input>, 'id' | 'name' | 'value' | 'defaultValue'>
}

export interface TextareaSchemaItem<TName extends string = string> extends BaseSchemaItem<TName> {
  componentType: 'Textarea'

  componentProps?: Omit<ComponentProps<typeof Textarea>, 'id' | 'name' | 'value' | 'defaultValue'>
}

export interface SelectSchemaItem<TName extends string = string> extends BaseSchemaItem<TName> {
  componentType: 'Select'

  options: SelectOption[]

  placeholder?: string

  disabled?: boolean

  triggerClassName?: string

  size?: 'sm' | 'default'
}

export interface CustomSchemaItem<TName extends string = string> extends BaseSchemaItem<TName> {
  componentType: 'Custom'

  render: (field: AnyFieldApi) => ReactNode
}

export type FormSchemaItem<TName extends string = string> =
  | InputSchemaItem<TName>
  | TextareaSchemaItem<TName>
  | SelectSchemaItem<TName>
  | CustomSchemaItem<TName>

/** @deprecated Use FormSchemaItem instead */

export type FormItemProps = FormSchemaItem

export interface SchemaFormLayoutProps {
  className?: string

  columns?: 1 | 2 | 3 | 4

  actionsClassName?: string
}

export interface SchemaFormValidationProps<TFormData extends Record<string, unknown>> {
  zodSchema?: z.ZodType<TFormData>

  validationMode?: ZodValidationMode
}
