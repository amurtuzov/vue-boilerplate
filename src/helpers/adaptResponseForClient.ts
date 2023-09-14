import { CamelCase, CamelizeKeys } from '@/types/camelCaseProperties'
import { isObject } from '@/helpers/checkIfObject'

const camelCase = (string: string): CamelCase<string> => {
  if (string.startsWith('_')) {
    return string.replace('_', '') as Uncapitalize<string>
  } else if (string.includes('-') || string.includes('_')) {
    return string
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', ''),
      ) as Uncapitalize<string>
  } else {
    return string as Uncapitalize<string>
  }
}

export const adaptResponseForClient = <T>(obj: T): CamelizeKeys<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      adaptResponseForClient(v),
    ) as unknown as CamelizeKeys<T>
  } else if (isObject(obj)) {
    return Object.keys(obj as T as Record<string, unknown>).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: adaptResponseForClient(
          (obj as T as Record<string, unknown>)[key],
        ),
      }),
      {} as CamelizeKeys<T>,
    )
  }
  return obj as unknown as CamelizeKeys<T>
}
