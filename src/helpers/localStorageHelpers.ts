interface IStorageItem<T> {
  value: T
  expiry: number | null
}

export const setStorageItemWithExpiry = (
  key: string,
  value: unknown,
  ttl?: number,
): void => {
  // ttl - time to live, время до которого живут данные в хранилище в милисекундах
  const item = {
    value: value,
    expiry: ttl ? Date.now() + ttl : null,
  }

  localStorage.setItem(key, JSON.stringify(item))
}

export const getStorageItemWithExpiry = <T>(key: string): null | T => {
  try {
    const item = localStorage.getItem(key)
    if (!item) return null
    const parsedItem: IStorageItem<T> = JSON.parse(item)
    // сравниваем текущие милисекунды с теми до которых живут данные
    if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
      // если данные просрочены, чистим хранилище и возвращаем null
      localStorage.removeItem(key)

      return null
    }
    return parsedItem.value
  } catch {
    return null
  }
}
