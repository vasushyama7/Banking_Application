const nodemailer = require('nodemailer')
const mailSender = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: 'zigmabank25@gmail.com',
      pass: 'xtqqlufdmkhdcszj',
    },
  }
)

module.exports = mailSender