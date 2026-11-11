import { LoginInputs } from "@/features/auth/lib/schemas"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({
        method: "post",
        url: `/auth/login`,
        body,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        method: "delete",
        url: `/auth/login`,
      }),
    }),
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => `/auth/me`,
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
