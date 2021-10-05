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

// Чтобы убрать спам в localStorage, записывае мтуда все
// с задержкой между действиями
export function debounce(fn, wait) {
  let timer
  return function (...args) {
    const later = () => {
      clearTimeout(timer)

      // Какая-то херня с потерей контекса
      // Обработка этой херни
      // eslint-disable-next-line
      this ? fn.apply(this, ...args) : fn(...args)
    }
    clearTimeout(timer)
    timer = setTimeout(later, wait)
  }
}
