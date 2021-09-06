function createCookie(name: string, value: string, hours = 24) {
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  const expires = `; expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}${expires}; path=/`
}

function getCookie(name: string) {
  if (typeof window === 'undefined') {
    return false
  }
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  return parts.length === 2 ? parts?.pop()?.split(';').shift() : false
}

export { createCookie, getCookie }
