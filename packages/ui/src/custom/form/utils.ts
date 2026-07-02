import type { AnyFieldMeta } from '@tanstack/react-form'

import type { FormSchemaItem } from './types'

function normalizeFieldError(error: unknown): { message?: string } | undefined {
  if (!error) {
    return undefined
  }

  if (typeof error === 'string') {
    return { message: error }
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message

    if (typeof message === 'string') {
      return { message }
    }
  }

  return undefined
}

export function getFieldErrors(fieldMeta: AnyFieldMeta) {
  if (fieldMeta.isValid) {
    return []
  }

  return fieldMeta.errors

    .map(normalizeFieldError)

    .filter((error): error is { message?: string } => Boolean(error))
}

export function createDefaultValuesFromSchema(schema: FormSchemaItem[]): Record<string, unknown> {
  return Object.fromEntries(
    schema.map((item) => {
      if (item.defaultValue !== undefined) {
        return [item.name, item.defaultValue]
      }

      switch (item.componentType) {
        case 'Select':
          return [item.name, '']

        default:
          return [item.name, '']
      }
    })
  )
}

export function getSchemaItemValidators(item: FormSchemaItem) {
  if (item.validators) {
    return item.validators
  }

  if (item.zodSchema) {
    return { onChange: item.zodSchema }
  }

  return undefined
}
