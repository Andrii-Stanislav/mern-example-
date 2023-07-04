const { v4: uuidv4 } = require("uuid");

const Auth = require("../model/auth");
const User = require("../model/user");
const Licenses = require("../model/license");
const PasswordHasher = require("../helpers/PasswordHasher");
const { HttpCode } = require("../helpers/Constants");
const Stripe = require("../helpers/Stripe");
const EmailServise = require("../services/email");
const compareDates = require("../helpers/compareDates");

require("dotenv").config();
const BASE_CLIENT_URL = process.env.BASE_URL;

const register = async (req, res) => {
  const { email, fullName, userName, phone, password, affiliate } = req.body;

  const manyResults = await Promise.all([
    Auth.getUserByEmail(email),
    Auth.getUserByNickname(userName),
    Auth.getUserByPhone(phone),
  ]);

  const emailDuplicate = manyResults[0];
  const nickDuplicate = manyResults[1];
  const phoneDuplicate = manyResults[2];

  // const emailDuplicate = await Auth.getUserByEmail(email)
  if (emailDuplicate) {
    return res.status(HttpCode.CONFLICT).json({
      message: "This email already exsists",
    });
  }

  // const nickDuplicate = await Auth.getUserByNickname(userName)
  if (nickDuplicate) {
    return res.status(HttpCode.CONFLICT).json({
      message: "This userName already exsists",
    });
  }

  // const phoneDuplicate = await Auth.getUserByPhone(phone)
  if (phoneDuplicate) {
    return res.status(HttpCode.CONFLICT).json({
      message: "This phone already exsists",
    });
  }

  const hashPassword = PasswordHasher.hashWithSalt(
    password,
    process.env.SALT_FACTOR
  );
  const accessKey = uuidv4();
  const newCustomer = await Stripe.createCustomer(fullName, email);

  const userId = await Auth.registerUser(
    {
      email,
      fullName,
      userName,
      phone,
      stripeId: newCustomer.id,
      hashPassword,
      accessKey,
    },
    affiliate
  );

  try {
    const emailServise = new EmailServise(process.env.NODE_ENV);
    await emailServise.sendEmail({
      templateName: "CloudKii Account SignUp",
      recipientEmail: email,
      email,
      name: fullName,
      password,
    });
  } catch (error) {
    console.log("Error in register emailServise.sendEmail");
  }

  const user = await Auth.getUserById(userId);

  const token = uuidv4();

  const secondManyResults = await Promise.all([
    Auth.updateUserToken(user.Id, token),
    User.checkAccountType(user),
  ]);

  user.AccountType = secondManyResults[1];

  return res.status(HttpCode.OK).json({
    message: "Register success",
    user,
    token,
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.getUserByEmail(email);
  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      message: "User or password incorrect",
    });
  }

  if (!user.NewPassword) {
    const code = uuidv4();
    await Auth.setRecoverCode(user.Id, code);

    const link = `${BASE_CLIENT_URL}/recover/confirm?code=${code}`;

    try {
      const emailServise = new EmailServise(process.env.NODE_ENV);
      await emailServise.sendEmail({
        templateName: "CloudKii Account Password Recovery",
        recipientEmail: email,
        name: user.Name,
        link,
      });
    } catch (error) {
      console.log("Error in register emailServise.sendEmail");
    }

    return res.status(HttpCode.OK).json({
      message: "You need update your password for new.cloudli.io",
      user,
      token: null,
    });
  }

  const vetifyPassword = await PasswordHasher.compare(
    password,
    user.NewPassword
  );
  if (!vetifyPassword) {
    return res.status(HttpCode.NOT_FOUND).json({
      message: "User or password incorrect",
    });
  }

  const token = uuidv4();

  const secondManyResults = await Promise.all([
    Auth.updateUserToken(user.Id, token),
    User.checkAccountType(user),
    // Licenses.getUserAvailableLicensesCount(user),
  ]);

  user.AccountType = secondManyResults[1];
  // user.LicensesAvailable = secondManyResults[2]

  // await Auth.updateUserToken(user.Id, token)

  // user.AccountType = await User.checkAccountType(user)
  // user.LicensesAvailable = await Licenses.getUserAvailableLicensesCount(user)

  return res.status(HttpCode.OK).json({
    message: "Login success",
    user,
    token,
  });
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Auth.getRecoverUserByEmail(email);

  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      message: `We couldn't find a user with this email`,
    });
  }

  const code = uuidv4();
  await Auth.setRecoverCode(user.Id, code);

  const link = `${BASE_CLIENT_URL}/recover/confirm?code=${code}`;

  try {
    const emailServise = new EmailServise(process.env.NODE_ENV);
    await emailServise.sendEmail({
      templateName: "CloudKii Account Password Recovery",
      recipientEmail: email,
      name: user.name,
      link,
    });
  } catch (error) {
    console.log("Error in register emailServise.sendEmail");
  }

  return res.status(HttpCode.OK).json({
    message: "Restore message sent to email.",
  });
};

const verifyRecoverPassword = async (req, res) => {
  const { code } = req.params;
  const user = await Auth.getUserForRecoverPassword(code);

  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      message: `User can't update password`,
    });
  }

  const compareDate = String(
    new Date(Date.now() - user.Timeout * 1000).toISOString()
  );
  const checkExpires = compareDates(user.CreateTime, compareDate);
  if (!checkExpires) {
    return res.status(HttpCode.NOT_FOUND).json({
      message: `User can't update password`,
    });
  }

  return res.status(HttpCode.OK).json({
    message: "User can update password",
  });
};

const setNewPassword = async (req, res) => {
  const { code } = req.params;
  const { password } = req.body;

  const user = await Auth.getUserForRecoverPassword(code);

  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      message: "User not found or link for recover expired",
    });
  }

  const hashPassword = PasswordHasher.hashWithSalt(
    password,
    process.env.SALT_FACTOR
  );

  await Promise.all([
    Auth.setRecoverCode(user.Id, "0"),
    Auth.updateUserPassword(user.Id, hashPassword),
  ]);

  // await Auth.setRecoverCode(user.Id, '0')
  // await Auth.updateUserPassword(user.Id, hashPassword)

  return res.status(HttpCode.OK).json({
    message: "Password success update",
  });
};

const getCurrent = async (req, res) => {
  const user = await User.getUserById(req.user.Id);

  user.LicensesAvailable = await Licenses.getUserAvailableLicensesCount(user);

  return res.status(HttpCode.OK).json({
    message: "Basic user info",
    user,
  });
};

const logOut = async (req, res) => {
  const { user } = req;
  await Auth.updateUserToken(user.Id, 0);

  return res.status(HttpCode.NO_CONTENT).json({
    message: "LogOut success",
  });
};

module.exports = {
  register,
  logIn,
  recoverPassword,
  verifyRecoverPassword,
  setNewPassword,
  getCurrent,
  logOut,
};
