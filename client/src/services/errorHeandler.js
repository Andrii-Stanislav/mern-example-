const errorHeandler = error => {
  if (Number(error?.response?.status) >= 500) {
    console.error('error in backend code')
    console.dir(error)
    return null
  }
  return error
}

export default errorHeandler
