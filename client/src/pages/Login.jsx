import { TextField, Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })
  const [statusInfo, setStatusInfo] = useState({ status: "", info: "" })

  // Sending login data
  async function handleSubmit() {
    // console.log(loginInfo)
    if (loginInfo.email === "" || loginInfo.password === "") {
      setStatusInfo({
        status: false,
        info: "Veuillez entrez vos identifiants.",
      })
    } else {
      try {
        await axios
          .post("https://jm-notes-app.fly.dev/login", loginInfo)
          .then(function (response) {
            if (response.data.status === "ok") {
              setLoginInfo({
                email: "",
                password: "",
              })
              setStatusInfo({
                ...statusInfo,
                status: true,
                info: "Connexion en cours...",
              })
              window.localStorage.setItem("token", response.data.data)
              // login({
              //   id: "2",
              //   name: "Test man",
              //   email: "test@test.com",
              // })
              window.location.href="/"
            } else {
              console.log("else")
              setStatusInfo({
                ...statusInfo,
                status: false,
                info: response.data.error,
              })
            }
          })
      } catch (error) {
        return console.log(error)
      }
    }
  }

  return (
    <div className="h-[calc(100vh)] inset-0 bg-slate-800  flex justify-center items-center">
      <div className="bg-slate-200 h-[450px] w-[600px] rounded drop-shadow-xl px-8 py-8 text-center">
        <h1 className="px-8 py-6 text-center text-3xl font-semibold mb-8">
          Connexion
        </h1>
        <TextField
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          id="login-email"
          variant="outlined"
          fullWidth
          label="Adresse e-mail"
          style={{ marginBottom: "1em" }}
        />
        <TextField
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          id="login-password"
          variant="outlined"
          fullWidth
          type="password"
          label="Mot de passe"
          style={{ marginBottom: "2em" }}
        />
        <div className="flex flex-col gap-4">
          <span
            className={`font-semibold ${
              statusInfo.status === true ? "text-green-700" : "text-red-600"
            }`}
          >
            {statusInfo.info}
          </span>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Se connecter
          </Button>
          <span>
            Pas de compte ?{" "}
            <Link to="/register">
              <span className="underline hover:text-blue-700">
                Créer un compte
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
