import "./styles/App.css"

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import Loading from "./pages/Loading.jsx";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx";

const firebaseConfig = {
  apiKey: "AIzaSyAcnVvnOxPzzKSiEQamSd5bwkZeZPtbu98",
  authDomain: "boodschappen-cdf20.firebaseapp.com",
  projectId: "boodschappen-cdf20",
  storageBucket: "boodschappen-cdf20.appspot.com",
  messagingSenderId: "12616535741",
  appId: "1:12616535741:web:35afe207ecd16e554931d4"
};

export default function App() {
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()

      setUser(user)
      setIsLoading(false)
    });
  }, [])

  if (isLoading) return <Loading />

  if (user) return <Dashboard />

  if (!user) return <Login auth={auth} setUser={setUser} />
}