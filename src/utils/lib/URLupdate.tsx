export const URLupdate = (key, value) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  let search = params.get(key)
  if (search) {
    params.delete(key)
    params.set(key, value)
  } else {
    params.set(key, value)
  }
  return params.toString()
}

export const URLgetter = (key) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  return params.get(key)
}

export const URLdelete = (key) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  params.delete(key)
  return params.toString()
}

export const  redirectTo = (url: string) => {
  window.location.href = url
}
