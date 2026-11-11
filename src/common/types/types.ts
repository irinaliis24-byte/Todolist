import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
