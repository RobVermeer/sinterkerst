const nodemailer = require('nodemailer')
const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}
const auth = admin.auth()
const getAllUsers = async () => {
  const userRecords = await auth.listUsers()
  return userRecords.users.map((user) => user.toJSON())
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({}))
    return
  }

  const users = await getAllUsers()
  const user = users.find(({ displayName }) => displayName === req.body.name)

  if (!user) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'not found' }))
    return
  }

  const to = user.email
  const name = user.displayName.substring(2)

  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.GMAIL_APP_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })

  const message = {
    from: 'Sinterklaas en de Kerstman 🎅<sint@robvermeer.nl>',
    to,
    subject: 'Persoonlijk bericht van Sinterklaas en de Kerstman',
    text: `
Lieve ${name},

Tot onze grote verbazing staan er nog geen wensen op je lijst, terwijl dit stiekem wel was geëist...
Het verzoek is dit alsnog spoedig te doen.
Hoe meer wensen, hoe beter; het liefst 1 miljoen! 

Liefs,
Sinterklaas en de Kerstman
`,
  }

  const { error } = await transport.sendMail(message)

  res.statusCode = error ? 401 : 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ status: error ? 'failed' : 'success' }))
}
