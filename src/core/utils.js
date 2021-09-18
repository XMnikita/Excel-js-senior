// Pure functions
export function capitalize(string) {
  if (typeof string != 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function storage(key, value = null) {
  if (!value) {
    return JSON.parse(localStorage.getItem(key))
  } else localStorage.setItem(key, JSON.stringify(value))
}
