import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from "../lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function register(username, email, password) {
        // return auth.createUserWithEmailAndPassword(email, password)
        auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            const UID = auth.currentUser.uid
            console.log(UID)
            addUsername(username, email, UID)
        }).catch(function (error) {
            console.log(error)
        });
        return true
    }

    async function addUsername(username, email, UID) {
        const date = new Date();
        return db.collection("usernames").add({
            username: username.toLowerCase(),
            userID: UID,
            upVotesCount: 0,
            downVotesCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString(),
        });
        // console.log(currentUser)
        // console.log(username)
        // return console.log(currentUser.uid)
        console.log(username + " " + email + " " + UID)
        return true;
        // db.collection("usernames").add({
        //     username: username
        // });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function passwordReset(email) {
        return auth.sendPasswordResetEmail(email)
    }

    async function checkUsername(username) {
        username = username.toLowerCase()
        const usernamesRef = collection(db, "usernames")
        const q = query(usernamesRef, where("username", "==", username))
        const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        // });
        return !querySnapshot.empty
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        register,
        logout,
        passwordReset,
        checkUsername,
        addUsername
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}