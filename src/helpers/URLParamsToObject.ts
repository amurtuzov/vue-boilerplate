export default () => {
  const urlParams = new URLSearchParams(location.search)
  const entries = urlParams.entries()
  const result: Record<string, unknown> = {}
  for (const [key, value] of entries) {
    result[key] = value
  }
  return result
}
