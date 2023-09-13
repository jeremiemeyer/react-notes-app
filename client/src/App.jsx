import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import TopUserBar from "./components/TopUserBar"
import Register from "./pages/Register"
import { AuthProvider, useAuth } from "./context/AuthContext"
import axios from "axios"

function App() {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const { token, setToken } = useAuth()

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  })

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    const isTokenValid = async () => {
      try {
        await axios
          .post("https://jm-notes-app.fly.dev/userdata", { token: token })
          .then(function (response) {
            // console.log(response)
            setUserData({
              firstname: response?.data.data.firstname,
              lastname: response?.data.data.lastname,
              email: response?.data.data.email,
            })
            // console.log(userData)
          })
      } catch (error) {
        setToken(null)
        // navigate to login page
        return console.log('Token validation error:', error)
      }
    }

    if (token) {
      isTokenValid()
    }

  }, [token])

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={token ? <Home userData={userData} setToken={setToken} /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
