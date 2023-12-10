import { computed, isReactive, ref, Ref, toRaw, watch } from 'vue'
import { AxiosError } from 'axios'
import { RequestStatus } from '@/enum/RequestStatus'
import { HTTPError } from '@/types/httpError'
import { adaptResponseForClient } from '@/helpers/adaptResponseForClient'
import { CamelizeKeys } from '@/types/camelCaseProperties'
import { adaptParamsToServer } from '@/helpers/adaptParamsToServer'

export const useApiCall = <T, K, V = undefined>(
  apiCallFunction: (abortController: AbortController, params?: V) => Promise<T>,
  externalCall = false,
  params?: V,
) => {
  let abortController: AbortController | null = null
  const data = ref<CamelizeKeys<T> | null>(null) as Ref<CamelizeKeys<T> | null>
  const error = ref<HTTPError<CamelizeKeys<K>> | null>(null) as Ref<HTTPError<
    CamelizeKeys<K>
  > | null>
  const requestStatus = ref<RequestStatus>(
    RequestStatus.NOT_STARTED,
  ) as Ref<RequestStatus>

  const isLoading = computed(
    () => requestStatus.value === RequestStatus.PENDING,
  )

  const executeApiCall = async (externalParams?: V) => {
    data.value = null
    error.value = null
    requestStatus.value = RequestStatus.PENDING
    try {
      abortController?.abort()
      abortController = new AbortController()
      const apiCallParams = toRaw(externalParams || params)
      const response = await apiCallFunction(
        abortController,
        adaptParamsToServer<V>(apiCallParams),
      )
      data.value = adaptResponseForClient<T>(response)
      requestStatus.value = RequestStatus.SUCCESS
      abortController = null
    } catch (e: unknown) {
      requestStatus.value = RequestStatus.FAILED
      const axiosError = e as AxiosError<K>
      const status = axiosError.response?.status
      const response = axiosError.response
      if (response) {
        error.value = { status, data: adaptResponseForClient<K>(response.data) }
      }
      if (externalCall) {
        throw new Error('Error for external call catch')
      }
    }
  }

  if (!externalCall) {
    if (isReactive(params)) {
      watch(
        () => params,
        async () => await executeApiCall(adaptParamsToServer<V>(toRaw(params))),
        {
          immediate: true,
          deep: true,
        },
      )
    } else {
      executeApiCall(adaptParamsToServer<V>(params))
    }
  }
  return { data, error, isLoading, executeApiCall }
}
