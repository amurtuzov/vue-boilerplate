import { computed, isReactive, ref, Ref, toRaw, watch } from 'vue'
import axios, { AxiosError, CancelTokenSource } from 'axios'
import { RequestStatus } from '@/enum/RequestStatus'
import { HTTPError } from '@/types/httpError'
import { adaptResponseForClient } from '@/helpers/adaptResponseForClient'
import { CamelizeKeys } from '@/types/camelCaseProperties'
import { adaptParamsToServer } from '@/helpers/adaptParamsToServer'

export const useApiCall = <T, K, V = undefined>(
  apiCallFunction: (params?: V, cancelToken?: CancelTokenSource) => Promise<T>,
  externalCall = false,
  params?: V,
) => {
  const data = ref<CamelizeKeys<T> | null>(null) as Ref<CamelizeKeys<T> | null>
  const error = ref<HTTPError<CamelizeKeys<K>> | null>(null) as Ref<HTTPError<
    CamelizeKeys<K>
  > | null>
  const requestStatus = ref<RequestStatus>(
    RequestStatus.NOT_STARTED,
  ) as Ref<RequestStatus>
  let cancelToken: CancelTokenSource | null = null

  const isLoading = computed(
    () => requestStatus.value === RequestStatus.PENDING,
  )

  const executeApiCall = async (externalParams?: V) => {
    data.value = null
    error.value = null
    requestStatus.value = RequestStatus.PENDING
    try {
      const apiCallParams = toRaw(externalParams || params)
      cancelToken?.cancel()
      cancelToken = axios.CancelToken.source()
      const response = await apiCallFunction(
        adaptParamsToServer<V>(apiCallParams),
        cancelToken,
      )
      data.value = adaptResponseForClient<T>(response)
      requestStatus.value = RequestStatus.SUCCESS
    } catch (e: unknown) {
      if (!axios.isCancel(e)) {
        requestStatus.value = RequestStatus.FAILED
      }
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
    } finally {
      requestStatus.value = RequestStatus.NOT_STARTED
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
