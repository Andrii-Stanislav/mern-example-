const initialUserState = {
  Name: null,
  Nickname: null,
  Id: null,
  AccountType: null,
  Email: null,
  AccessKey: null,
  // Activated: 0,
  Phone: null,
  LicensesAvailable: null,

  logo: null,
}

const initialAffiliate = { visitors: null, paid: null, earned: null, due: null }

const initialSubscription = {
  name: null,
  type: null,
  quantity: null,
  interval: null,
}

export { initialUserState, initialAffiliate, initialSubscription }
