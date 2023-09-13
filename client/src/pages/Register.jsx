import { TextField, Button } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Login() {
  const [signUpInfo, setSignUpInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  const [statusInfo, setStatusInfo] = useState({ status: "", info: "" })

  // Sending register data to Node API
  async function handleSubmit() {
    // console.log(signUpInfo)
    if (signUpInfo.firstname === "" || signUpInfo.lastname === "" || signUpInfo.email === "" || signUpInfo.password === "") {
      setStatusInfo({
        status: false,
        info: "Merci de remplir les champs demandés.",
      })
    } else {
      try {
        await axios
          .post("https://jm-notes-app.fly.dev/register", signUpInfo)
          .then(function (response) {
            if (response.data.status === "ok") {
              setSignUpInfo({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
              })
              setStatusInfo({
                ...statusInfo,
                status: true,
                info: "Votre compte a été créé !",
              })
            } else {
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
      <div className="bg-slate-200 h-[650px] w-[600px] rounded drop-shadow-xl px-8 py-8 text-center">
        <h1 className="px-8 py-6 text-center text-3xl font-semibold mb-8">
          Inscription
        </h1>
        <TextField
          value={signUpInfo.firstname}
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, firstname: e.target.value })
          }
          id="register-firstname"
          variant="outlined"
          fullWidth
          label="Prénom"
          style={{ marginBottom: "1em" }}
        />
        <TextField
          value={signUpInfo.lastname}
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, lastname: e.target.value })
          }
          id="register-lastname"
          variant="outlined"
          fullWidth
          label="Nom"
          style={{ marginBottom: "1em" }}
        />
        <TextField
          value={signUpInfo.email}
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, email: e.target.value })
          }
          id="register-email"
          variant="outlined"
          fullWidth
          label="Adresse e-mail"
          style={{ marginBottom: "1em" }}
        />
        <TextField
          value={signUpInfo.password}
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, password: e.target.value })
          }
          id="register-password"
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
            S'inscrire
          </Button>
          <span>
            Déjà un compte ?{" "}
            <Link to="/login">
              <span className="underline hover:text-blue-700">
                Je me connecte
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
