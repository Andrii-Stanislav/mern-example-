const DB = require('./DB')

const addSubPartner = async body => {
  const db = new DB()
  const {
    nickname,
    email,
    name,
    hashPassword,
    accessKey,
    licenses,
    stripeId,
    creatorId,
    phone,
  } = body
  const query = `insert into [User] (Nickname, Email, Name, Password, NewPassword, AccessKey, AccountType, Licenses, StripeId, Activated, Status, Creator, Phone) values('${nickname}', '${email}', '${name}', '${hashPassword}', '${hashPassword}', '${accessKey}', '2', ${licenses}, '${stripeId}', 1, 1, ${creatorId}, '${phone}')`
  await db.ExecuteQuery(query)
}

const getUserById = async userId => {
  const db = new DB()
  const query = `select * from [User] where Id='${userId}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getUserByEmail = async email => {
  const db = new DB()
  const query = `Select * from [User] where Email='${email}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getUserByPhone = async phone => {
  const db = new DB()
  const query = `Select * from [User] where Phone='${phone}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getUserByNickname = async nickname => {
  const db = new DB()
  const query = `Select * from [User] where Nickname='${nickname}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const updateUserStatus = async (id, status) => {
  const db = new DB()
  let query
  switch (status) {
    case 'Active':
      query = `update [User] set Status=1 where Id=${id}`
      break
    case 'Inactive':
      query = `update [User] set Status=2 where Id=${id}`
      break
  }
  await db.ExecuteQuery(query)
}

const removeUser = async id => {
  const db = new DB()
  const query = `delete from [User] where Id=${id}`
  await db.ExecuteQuery(query)
}

const updateLicenses = async (id, count) => {
  const db = new DB()
  const query = `Update [User] Set Licenses=${count} where Id = ${id}`
  await db.ExecuteQuery(query)
}

module.exports = {
  addSubPartner,
  getUserById,
  getUserByEmail,
  getUserByPhone,
  getUserByNickname,
  updateUserStatus,
  removeUser,
  updateLicenses,
}
