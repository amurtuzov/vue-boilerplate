export const isObject = function (obj: unknown) {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}
