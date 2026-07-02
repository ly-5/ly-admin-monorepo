import { createFormHook } from '@tanstack/react-form'

import { lazy, Suspense } from 'react'

import { FormActions, ResetButton, SubmitButton } from './components'

import { fieldContext, formContext, useFieldContext, useFormContext } from './context'

import { InputField, SelectField, TextareaField } from './fields'

const LazyInputField = lazy(async () => {
  const module = await import('./fields/input-field')

  return { default: module.InputField }
})

const LazySelectField = lazy(async () => {
  const module = await import('./fields/select-field')

  return { default: module.SelectField }
})

const LazyTextareaField = lazy(async () => {
  const module = await import('./fields/textarea-field')

  return { default: module.TextareaField }
})

function withSuspense<P extends object>(Component: React.ComponentType<P>) {
  return function SuspendedComponent(props: P) {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    )
  }
}

const formApi = createFormHook({
  fieldContext,

  formContext,

  fieldComponents: {
    Input: withSuspense(LazyInputField),

    InputField: withSuspense(LazyInputField),

    Select: withSuspense(LazySelectField),

    SelectField: withSuspense(LazySelectField),

    Textarea: withSuspense(LazyTextareaField),

    TextareaField: withSuspense(LazyTextareaField),
  },

  formComponents: {
    SubmitButton,

    ResetButton,

    FormActions,
  },
})

export {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
  InputField,
  SelectField,
  TextareaField,
  SubmitButton,
  ResetButton,
  FormActions,
}

export const { useAppForm, withForm, withFieldGroup } = formApi

export default formApi
