import axios, { CancelTokenSource } from 'axios'

const exampleApiCall = async (
  params?: any,
  cancelToken?: CancelTokenSource,
): Promise<any> => {
  const { data } = await axios.post(
    '/example/',
    { ...params },
    { cancelToken: cancelToken?.token },
  )
  return data
}

export { exampleApiCall }
