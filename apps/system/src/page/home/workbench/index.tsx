// import { z } from 'zod'

import type { FormSchemaItem } from '@workspace/ui/custom/form'
import { Form } from '@workspace/ui/custom/form'

// const workbenchFormSchema = z.object({
//   test: z.string().min(1, '请输入测试内容'),
//   test2: z.string().min(1, '请选择选项'),
// })

// type WorkbenchFormValues = z.infer<typeof workbenchFormSchema>

const schema: FormSchemaItem[] = [
  {
    name: 'test',
    label: '测试',
    componentType: 'Input',
    componentProps: {
      placeholder: '请输入测试内容',
    },
  },
  {
    name: 'test2',
    label: '测试2',
    componentType: 'Select',
    placeholder: '请选择',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
    ],
  },
]

const schema2: FormSchemaItem[] = [
  {
    name: 'test',
    label: '测试',
    componentType: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入测试内容',
    },
  },
  {
    name: 'test2',
    label: '测试2',
    componentType: 'Select',
    required: true,
    placeholder: '请选择',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
    ],
  },
  {
    name: 'test3',
    label: '测试3',
    componentType: 'Textarea',
    componentProps: {
      placeholder: '请输入测试内容',
    },
  },
]

const Page = () => {
  return (
    <>
      <div className="rounded-2xl mt-3  p-3 border border-[#EAEAEA] bg-[#FCFCFC]">
        <Form
          schema={schema}
          validationMode="onChange"
          showActions
          columns={4}
          actions={(form) => (
            <form.FormActions className="justify-end">
              <form.ResetButton>重置</form.ResetButton>
              <form.SubmitButton>查询</form.SubmitButton>
            </form.FormActions>
          )}
          onSubmit={({ value }) => {
            console.log(value)
          }}
        />
      </div>
      <div className="flex-1 rounded-2xl p-4 border border-[#EAEAEA] bg-[#FCFCFC]">
      <Form
        schema={schema2}
        validationMode="onChange"
        columns={2}
        onSubmit={({ value }) => {
          console.log(value)
        }}
      />
      </div>
    </>
  )
}

export default Page
