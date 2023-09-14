export type CamelCase<T extends string> = T extends `${infer F}_${infer R}`
  ? `${Uncapitalize<F>}${Capitalize<R>}`
  : Uncapitalize<T>

export type CamelizeKeys<T> = T extends readonly unknown[]
  ? { [K in keyof T]: CamelizeKeys<T[K]> }
  : {
      [K in keyof T as K extends string ? CamelCase<K> : K]: CamelizeKeys<T[K]>
    }
