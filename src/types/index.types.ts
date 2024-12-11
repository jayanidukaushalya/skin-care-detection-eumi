import { ENTITY_SORT } from "@/constants/common"

export interface ISuccessResponseDTO<T> {
  error: false
  message: string
  data: T
}

export interface IErrorResponseDTO {
  error: true
  message: string
  data: { message: string }
}

export type ICommonResponseDTO<T> = ISuccessResponseDTO<T> | IErrorResponseDTO

export interface IPaginatedResponseDTO<T, U = IBasePaginationExtras> {
  results: T[]
  extras: U
}

export interface IBasePaginationExtras {
  total: number
  limit?: number
  skip?: number
}

export interface IBaseParamsResponseDTO {
  id: string
}

export type IBaseParamsRequestDTO = Partial<{
  limit: number
  skip: number
  sort_by: string
  sort_order: ENTITY_SORT
  search_key: string
}>
