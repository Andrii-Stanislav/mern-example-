const { MessageTemplates } = require('../helpers/Constants')
const sendgrid = require('@sendgrid/mail')
require('dotenv').config()

class EmailServise {
  #sender = sendgrid

  constructor(env) {
    switch (env) {
      case 'development':
        this.baseLink = 'http://localhost:5000'
        break
      case 'production':
        this.baseLink = 'link for production'
        break
      default:
        this.baseLink = 'http://localhost:5000'
    }
  }

  async sendEmail({
    recipientEmail,
    email,
    appName,
    templateName,
    link,
    name,
    password,
    comissionAmount,
    partner,
    subject,
  }) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: recipientEmail,
      from: 'info@cloudki.io',
      subject: 'CloudKii',

      templateId: MessageTemplates[templateName],
      dynamicTemplateData: {
        appName,
        link, // app link
        name,
        email,
        password,
        comissionAmount,
        partner,
        subject,
      },
    }

    await this.#sender.send(msg)
  }

  async sendSignUpVerifyEmail() {
    //
  }
}

module.exports = EmailServise
