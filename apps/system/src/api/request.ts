import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNzY4ODg4MTcwMSIsInN5c3RlbUNvZGUiOiJTMTAxNSIsInl5eXlNTWRkIjoiMTc3NjgzOTgzOTQwNCIsImV4cCI6MTc3NjkyNjIzOX0.-qNEC2xguL4OybGx5hXXGTFlK4jbAalUvQritca4uBc'

const SUCCESS_CODE = 0
// const UNAUTHORIZED_CODE = 401

interface ApiResponse<T> {
  code: number
  data: T
  msg?: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/assets',
  timeout: 10000,
  prepareHeaders: (headers) => {
    headers.set('Token', token)

    return headers
  },

  responseHandler: async (response) => {
    const data = (await response.json()) as ApiResponse<unknown>

    if (data.code !== SUCCESS_CODE) {
      toast.error(data.msg || '服务器异常，请刷新后重试')
      throw { data }
    }

    return data.data
  },
})

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
})