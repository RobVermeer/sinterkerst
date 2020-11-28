import firebaseAdmin from '~/utils/firebaseAdmin'

export default async function handler(req, res) {
  try {
    const [_, token] = req.headers.authorization.split(' ')
    const user = await firebaseAdmin.auth().verifyIdToken(token)
    res.status(200).send({
      user: {
        ...user,
        displayName: user.name,
      }
    })
  } catch {
    res.status(403).send({ test: 'test'})
  }
}
