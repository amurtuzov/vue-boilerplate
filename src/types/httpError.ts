export type HTTPError<T> = {
  status?: number
  data: T
}

export type DefaultError = {
  name: string
  message: string
  code: number
  type: string
}
