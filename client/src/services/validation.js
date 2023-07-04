const isEmail = email => {
  var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return { result: pattern.test(email) }
}

const isFullName = name => {
  // const pattern = /^(?![A-Z .'-]+$)(?![a-z .'-]+$)[a-zA-Z .'-]+$/
  const pattern = /[a-z A-Z '-][^0-9]/g
  return { result: pattern.test(name) }
}

const isNickName = name => {
  // const pattern = /^(?![A-Z.'-]+$)(?![a-z.'-]+$)[a-zA-Z.'-]+$/
  const pattern = /^[a-zA-Z]\w*$/
  return { result: pattern.test(name) }
}

const isPassword = password => {
  if (password.length < 8) {
    return {
      result: false,
      message: 'Your password must be at least 8 characters',
    }
  }
  if (password.search(/[a-z]/i) < 0) {
    return {
      result: false,
      message: 'Your password must contain at least one letter.',
    }
  }

  if (password.search(/[0-9]/) < 0) {
    return {
      result: false,
      message: 'Your password must contain at least one digit.',
    }
  }

  return { result: true }
}

const validate = {
  isEmail,
  isFullName,
  isNickName,
  isPassword,
}

export default validate
