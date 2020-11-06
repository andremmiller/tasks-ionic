import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAXMr0bI6NjfPRAbyK6ZLWFK0mlJod335U",
    authDomain: "tasks-expo.firebaseapp.com",
    databaseURL: "https://tasks-expo.firebaseio.com",
    projectId: "tasks-expo",
    storageBucket: "tasks-expo.appspot.com",
    messagingSenderId: "366007518578",
    appId: "1:366007518578:web:c9801012648e50335bc9eb"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

export {auth, db}

// export async function loginUser(username: string, password: string) {
//     try {
//         const res = await auth.signInWithEmailAndPassword(username, password) 
//         console.log(res)
//         return true
//     } catch(e) {
//         toast(e.message)
//         return false
//     }
// }

// export async function registerUser(username: string, password: string) {
//     try {
//         const res = await auth.createUserWithEmailAndPassword(username, password)
//         console.log(res)
//         return true
//     } catch(e) {
//         toast(e.message)
//         return false
//     }
// }