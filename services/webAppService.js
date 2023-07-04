const elmlink = require('./webApps/elmlink')
// const elmatic = require('./webApps/elmatic')

const webAppService = {
  async add(appId, { name, email, password }) {
    switch (appId) {
      // ** ELMessenger
      case 13:
        return null

      // ** Elmlink.co
      case 15:
        return await elmlink.createUser({ name, email, password })

      // ** ELMOptimizer
      case 16:
        return null

      // ** ELMatic
      case 17:
        return null
      // return await elmatic.createUser({ name, email, password })
    }
  },

  async changeStatus(appId, licensesId, status) {
    switch (appId) {
      // ** ELMessenger
      case 13:
        return null

      // ** Elmlink.co
      case 15:
        const is_enabled = status === 'Active' ? 1 : 0
        return await elmlink.updateUser(licensesId, { is_enabled })

      // ** ELMOptimizer
      case 16:
        return null

      // ** ELMatic
      case 17:
        return null
    }
  },

  async updatePlan(appId, licensesId, planName) {
    switch (appId) {
      // ** ELMessenger
      case 13:
        return null

      // ** Elmlink.co
      case 15:
        return await elmlink.updateUser(licensesId, { plan_name: planName })

      // ** ELMOptimizer
      case 16:
        return null

      // ** ELMatic
      case 17:
        return null
    }
  },

  async delete(appId, licensesId) {
    switch (appId) {
      // ** ELMessenger
      case 13:
        return null

      // ** Elmlink.co
      case 15:
        // Active
        // Inactive
        return await elmlink.deleteUser(licensesId)

      // ** ELMOptimizer
      case 16:
        return null

      // ** ELMatic
      case 17:
        return null
    }
  },
}

module.exports = webAppService
