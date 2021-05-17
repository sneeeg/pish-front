const delay = (ms = 500, devDelay = false) => {
  if (!devDelay || process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms)
    })
  }
}

export default delay
