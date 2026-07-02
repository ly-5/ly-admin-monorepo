import { FieldGroup } from '@workspace/ui/components/field'

import { cn } from '@workspace/ui/lib/utils'

import { FormActions } from './components'

import formApi from './form-api'

import { mergeFormValidators } from './validation/zod'

import { createDefaultValuesFromSchema, getSchemaItemValidators } from './utils'

import type { FormSchemaItem, SchemaFormLayoutProps, SchemaFormValidationProps } from './types'

import type { FormAsyncValidateOrFn, FormValidateOrFn } from '@tanstack/react-form'

import type { ReactNode } from 'react'

const { useAppForm: useSchemaForm } = formApi

type AppFormInstance = ReturnType<typeof useSchemaForm>

type SchemaFormOptions<TFormData extends Record<string, unknown>> = SchemaFormLayoutProps &
  SchemaFormValidationProps<TFormData> & {
    schema: FormSchemaItem[]
    defaultValues?: TFormData
    onSubmit?: (payload: { value: TFormData }) => void | Promise<void>
    validators?: {
      onChange?: FormValidateOrFn<TFormData>
      onChangeAsync?: FormAsyncValidateOrFn<TFormData>
      onBlur?: FormValidateOrFn<TFormData>
      onBlurAsync?: FormAsyncValidateOrFn<TFormData>
      onSubmit?: FormValidateOrFn<TFormData>
      onSubmitAsync?: FormAsyncValidateOrFn<TFormData>
    }

    actions?: ReactNode | ((form: AppFormInstance) => ReactNode)
    showActions?: boolean
  }

function renderSchemaField(item: FormSchemaItem) {
  switch (item.componentType) {
    case 'Input':
      return (field: { InputField: React.ComponentType<Record<string, unknown>> }) => (
        <field.InputField
          label={item.label}
          description={item.description}
          required={item.required}
          orientation={item.orientation}
          labelClassName={item.labelClassName}
          contentClassName={item.contentClassName}
          {...item.componentProps}
        />
      )

    case 'Textarea':
      return (field: { TextareaField: React.ComponentType<Record<string, unknown>> }) => (
        <field.TextareaField
          label={item.label}
          description={item.description}
          required={item.required}
          orientation={item.orientation}
          labelClassName={item.labelClassName}
          contentClassName={item.contentClassName}
          {...item.componentProps}
        />
      )

    case 'Select':
      return (field: { SelectField: React.ComponentType<Record<string, unknown>> }) => (
        <field.SelectField
          label={item.label}
          description={item.description}
          required={item.required}
          orientation={item.orientation}
          labelClassName={item.labelClassName}
          contentClassName={item.contentClassName}
          options={item.options}
          placeholder={item.placeholder}
          disabled={item.disabled}
          triggerClassName={item.triggerClassName}
          size={item.size}
        />
      )

    case 'Custom':
      return item.render

    default:
      return () => null
  }
}

function renderActions(
  form: AppFormInstance,
  actions?: ReactNode | ((form: AppFormInstance) => ReactNode)
) {
  if (typeof actions === 'function') {
    return actions(form)
  }

  if (actions) {
    return actions
  }

  return (
    <FormActions>
      <form.ResetButton />
      <form.SubmitButton />
    </FormActions>
  )
}

const getColSpan = (num: number, total: number) => {
  const remainder = total % num
  return `col-span-${remainder === 0 ? num : num - remainder}`
}

function SchemaForm<TFormData extends Record<string, unknown> = Record<string, unknown>>({
  schema,
  defaultValues,
  onSubmit,
  className,
  columns = 2,
  actionsClassName,
  validators,
  zodSchema,
  validationMode = 'onChange',
  actions,
  showActions = false,
}: SchemaFormOptions<TFormData>) {
  const form = useSchemaForm({
    defaultValues: (defaultValues ?? createDefaultValuesFromSchema(schema)) as TFormData,
    onSubmit,
    validators: mergeFormValidators(validators, zodSchema, validationMode),
  })

  const shouldRenderActions = showActions || Boolean(actions)

  return (
    <form
      className={cn(className)}
      onSubmit={(event) => {
        event.preventDefault()

        form.handleSubmit()
      }}
    >
      <FieldGroup className={cn('grid gap-2', `grid-cols-${columns}`)}>
        {schema.map((item) => (
          <form.AppField
            key={item.name}
            name={item.name}
            validators={getSchemaItemValidators(item)}
            children={renderSchemaField(item) as never}
          />
        ))}

        {shouldRenderActions ? (
          <div className={cn(getColSpan(columns, schema.length), actionsClassName)}>
            <form.AppForm>{renderActions(form as AppFormInstance, actions)}</form.AppForm>
          </div>
        ) : null}
      </FieldGroup>
    </form>
  )
}

export { SchemaForm }

export default SchemaForm
