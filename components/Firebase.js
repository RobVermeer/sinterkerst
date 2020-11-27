import React from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config)
    }

    this.auth = app.auth()
    this.database = app.database()
  }

  onIdTokenChanged = (callback) => this.auth.onIdTokenChanged(callback)

  onListsChange = (callback) => this.database.ref('lists').on('value', (snapshot) => callback(snapshot.val()))

  register = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  signOut = async () => await this.auth.signOut()

  createEmptyList = async (listTitle) => {
    const newKey = this.database.ref().child(`lists/${listTitle}`).push().key
    await this.database.ref(`lists/${listTitle}/${newKey}`).set({
      title: '',
      url: '',
      bought: false,
    })
  }

  addToList = async (name, title, url) => {
    const newKey = this.database.ref().child(`lists/${name}`).push().key
    await this.database.ref(`lists/${name}/${newKey}`).set({
      title,
      url,
      bought: false,
    })
  }

  editListItem = async (name, index, title, url, bought) => {
    const updates = {}
    updates[`lists/${name}/${index}`] = {
      title,
      url,
      bought,
    }
    await this.database.ref().update(updates)
  }

  removeFromList = async (name, index) => await this.database.ref(`lists/${name}/${index}`).remove()

  changeListItemStatus = async (name, key, item) => {
    const updates = {}
    updates[`lists/${name}/${key}`] = { ...item, bought: !item.bought}
    await this.database.ref().update(updates)
  }
}

const FirebaseContext = React.createContext(null)

const useFirebase = () => {
  const context = React.useContext(FirebaseContext)

  if (!context) {
    throw new Error('useFirebase() must be used within a FirebaseProvider')
  }

  return context
}

export default Firebase

export { FirebaseContext, useFirebase }