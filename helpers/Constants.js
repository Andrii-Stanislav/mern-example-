const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
}

const accountTypes = {
  Partner: 'Partner',
  Seller: 'Seller',
  GodMode: 'God Mode',
  UnlimitedPersonal: 'Unlimited Starter Partner',
  BasicAccount: 'Basic Account',
}

const ELMessengerId = 13

const AppTypes = {
  WebApp: 'WebApp',
}

const MessageTemplates = {
  'CloudKii Account SignUp': 'd-e55ac0ab05074d2782d95dfe2f4bed0c',
  'CloudKii App License Create Notification':
    'd-a4ab83d165ee491cba8a25aea8c91195',
  'CloudKii Subpartner Create Notification':
    'd-40e304418bc14d8b8dd7e1d13cd07113',
  'CloudKii License Password Recovery': 'd-1720aa49faff444d9eb9a1498c946f61',
  'CloudKii Account Password Recovery': 'd-37af4e1f781945758c1d06d465d91466',
  'CloudKii First-Tier Affiliate Commission Received':
    'd-0f22586d1edc4294b106c03c7880f73c',
  'CloudKii Second-Tier Affiliate Commission Received':
    'd-114ec0482e8a480fad4639d74008df28',
  'CloudKii Account SignUp With Password': 'd-e55ac0ab05074d2782d95dfe2f4bed0c',
  'New Flex Chat': 'd-a98d757e5fef42eb8f52c91d327296c0',
}

const firstLevelAffiliateMultiplier = 0.3
const secondLevelAffiliateMultiplier = 0.1
const commissionDueDays = 30

module.exports = {
  HttpCode,
  accountTypes,
  ELMessengerId,
  AppTypes,
  MessageTemplates,
  firstLevelAffiliateMultiplier,
  secondLevelAffiliateMultiplier,
  commissionDueDays,
}
