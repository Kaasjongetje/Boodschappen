import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"

export default function Login ({ auth, setUser }) {
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, 'cas.hukkelhoven@gmail.com', password)
            .then((userCredential) => {
                console.log(userCredential)
                setUser(userCredential.user)
            })
            .catch(error => {
                let message;

                switch (error.code) {
                    case "auth/invalid-credential":
                        message = "Fout wachtwoord"   
                        break
                    default:
                        message = "Er is iets fout gegaan"
                        break
                }

                setErrorMessage(message)
                setPassword("")
            }) 
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
                </button>
                <button type="submit">Inloggen</button>   
            </form>
            <p>{errorMessage}</p>
        </>
    )
}