const generator = require('generate-password')
const bcrypt = require('bcrypt')

const generate = (length = 10) => {
  return generator.generate({
    length,
    numbers: true,
  })
}

const hashWithSalt = (password, saltNumber) => {
  const salt = bcrypt.genSaltSync(Number(saltNumber))
  return bcrypt.hashSync(password, salt)
}

const compare = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
}

module.exports = { generate, hashWithSalt, compare }
