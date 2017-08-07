export const buildAction = (type, payload = {}) => {
  if (payload && payload instanceof Error) {
    payload = {
      error: payload
    }
  }

  return {
    type: type,
    payload: payload,
  }
}

export const define = (arr) => arr.reduce((m, v) => {
  m[v] = v
  return m
}, {})
