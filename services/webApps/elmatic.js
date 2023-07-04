const FormData = require('form-data')
const axios = require('axios')

require('dotenv').config()

const baseURL = process.env.ELMATIC_BASE_URL
const authHeader = `Bearer ${process.env.ELMATIC_API_KEY}`

const elmlinkPlans = {
  Free: 'free',
  'Pro User': 1,
  'Legacy User': 3,
}

const createUser = async ({ name, email, password }) => {
  const data = new FormData()
  data.append('name', name)
  data.append('email', email)
  data.append('password', password)

  const config = {
    method: 'post',
    url: baseURL,
    headers: {
      Authorization: authHeader,
      'Content-Type': 'multipart/form-data',
      ...data.getHeaders(),
    },
    data: data,
  }

  const response = await axios(config)
  return response.data.data.id
}

const updateUser = async (user_id, { is_enabled, plan_name }) => {
  const data = new FormData()
  is_enabled && data.append('is_enabled', is_enabled)

  switch (plan_name) {
    case 'Free':
      data.append('plan_id', elmlinkPlans.Free)
      break
    case 'Pro User':
      data.append('plan_id', elmlinkPlans['Pro User'])
      break
    case 'Legacy User':
      data.append('plan_id', elmlinkPlans['Legacy User'])
      break
    default:
  }

  const config = {
    method: 'post',
    url: `${baseURL}/${user_id}`,
    headers: {
      Authorization: authHeader,
      'Content-Type': 'multipart/form-data',
      ...data.getHeaders(),
    },
    data: data,
  }

  const response = await axios(config)
  return response.data.data.id
}

const deleteUser = async userId => {
  return await axios({
    method: 'delete',
    url: `${baseURL}/${userId}`,
    headers: {
      Authorization: authHeader,
    },
  })
}

const elmlink = {
  createUser,
  updateUser,
  deleteUser,
}

module.exports = elmlink
