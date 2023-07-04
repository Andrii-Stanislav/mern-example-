const DB = require('./DB')

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

const getRecoverUserByEmail = async email => {
  const db = new DB()
  const query = `select Id, Email, Name from [User] where LOWER(Email) = LOWER('${email}')`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const setRecoverCode = async (userId, code) => {
  const db = new DB()
  const createDate = new Date(Date.now()).toISOString()
  const timeout = 60 * 24 // 1440 sec - 1 day
  const prevToken = await db.ExecuteQuery(
    `SELECT * FROM UserRestore WHERE UserId='${userId}'`
  )

  if (prevToken.recordset.length > 0) {
    const query = `UPDATE UserRestore set Code='${code}', CreateTime='${createDate}', Timeout='${timeout}' WHERE UserId='${userId}'`
    return await db.ExecuteQuery(query)
  }

  const query = `INSERT INTO UserRestore (UserId, Code, CreateTime, Timeout) VALUES('${userId}', '${code}', '${createDate}', '${timeout}')`
  return await db.ExecuteQuery(query)
}

const getUserForRecoverPassword = async code => {
  const db = new DB()
  const query = `SELECT u.Id as Id, ur.CreateTime as CreateTime, ur.Timeout as Timeout
            FROM [User] u
            inner join [UserRestore] ur on u.Id = ur.UserId
            WHERE ur.Code='${code}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const updateUserPassword = async (userId, password) => {
  const db = new DB()
  const query = `UPDATE [User] set NewPassword='${password}' WHERE Id='${userId}'`
  return await db.ExecuteQuery(query)
}

const getUserByNickname = async nickname => {
  const db = new DB()
  const query = `Select * from [User] where Nickname='${nickname}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getUserByPhone = async phone => {
  const db = new DB()
  const query = `Select * from [User] where Phone='${phone}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const registerUser = async (user, affiliateNickname = null) => {
  const db = new DB()

  const partnerId =
    affiliateNickname &&
    (await db.ExecuteQuery(
      `SELECT Id from [user] where Nickname = '${affiliateNickname}'`
    ))

  const query = `insert into [User] 
  (Email, Nickname, Name, Phone, NewPassword, Password, AccessKey, AccountType, Licenses, StripeId, Activated, [Status] ${
    affiliateNickname ? ', Affiliate' : ''
  }) OUTPUT INSERTED.Id
   values('${user.email}', '${
    user.userName.length > 0 ? user.userName : user.email.split('@')[0]
  }', 
   '${user.fullName}', '${user.phone}', '${user.hashPassword}', '${
    user.hashPassword
  }', '${user.accessKey}', 2, 0, '${user.stripeId}', 0, 1 ${
    partnerId ? `, ${partnerId}` : ''
  })`

  const result = await db.ExecuteQuery(query)
  return result.recordset[0]?.Id
}

const updateUserToken = async (userId, token) => {
  const db = new DB()
  const expiresDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString() // expire after 1 day

  const prevToken = await db.ExecuteQuery(
    `SELECT * FROM UserToken WHERE UserId='${userId}'`
  )

  if (prevToken.recordset.length > 0) {
    // update License set Status=1 where Id=${id}
    const query = `UPDATE UserToken set Token='${token}', ExpiredTime='${expiresDate}', RefreshTime='${expiresDate}' WHERE UserId='${userId}'`
    const result = await db.ExecuteQuery(query)
    return result.recordset
  }

  const query = `INSERT INTO UserToken (UserId, Token, ExpiredTime, RefreshTime) VALUES('${userId}', '${token}', '${expiresDate}', '${expiresDate}')`
  const result = await db.ExecuteQuery(query)
  return result.recordset
}

const getUserByToken = async token => {
  const db = new DB()
  const query = `SELECT u.*, ut.ExpiredTime
              FROM [User] u
              INNER JOIN UserToken ut ON u.Id = ut.UserId  WHERE ut.Token='${token}'`

  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

// const pushSignupVerifycation = async (userId, code) => {
//   const db = new DB()
//   const query = `INSERT INTO UserActivate (UserId, Code) VALUES('${userId}', '${code}')`
//   const result = await db.ExecuteQuery(query)
//   return result.recordset
// }

// const getSignupVerifycation = async userId => {
//   const db = new DB()
//   const query = `SELECT * FROM UserActivate WHERE UserId='${userId}`
//   const result = await db.ExecuteQuery(query)
//   return result.recordset[0]
// }

// const deleteSignupVerifycation = async (userId, code) => {
//   const db = new DB()
//   const query = `DELETE FROM UserActivate WHERE UserId='${userId}'`
//   const result = await db.ExecuteQuery(query)
//   return result.recordset
// }

module.exports = {
  getUserById,
  registerUser,
  updateUserToken,
  // pushSignupVerifycation,
  // getSignupVerifycation,
  // deleteSignupVerifycation,
  getUserByEmail,
  getRecoverUserByEmail,
  getUserForRecoverPassword,
  setRecoverCode,
  updateUserPassword,
  getUserByNickname,
  getUserByPhone,
  getUserByToken,
}
