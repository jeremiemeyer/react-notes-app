const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc"

// ############## SIGN UP ################
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  const encryptedPassword = await bcrypt.hash(password, 10)

  const userData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: encryptedPassword,
  }

  const newUser = new schemas.User(userData)
  // const saveUser = await newUser.save()

  try {
    const users = schemas.User
    const emailAlreadyInUse = await users.findOne({ email }).exec()

    if (emailAlreadyInUse) {
      res.send({ error: "Cet e-mail est déjà utilisé !" })
    } else {
      await newUser.save()
      res.send({ status: "ok" })
    }
  } catch (error) {
    res.send(error)
  }
})

// ############### LOG IN ###############
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const users = schemas.User

  const user = await users.findOne({ email }).exec()
  if (!user) {
    return res.send({ error: "Cet utilisateur n'existe pas !" })
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email: user.email}, JWT_SECRET)

    if (res.status(201)) {
      return res.send({ status: "ok", data: token })
    } else {
      return res.send({ status: "error" })
    }
  }
  res.send({ status: "error", error: "Mot de passe invalide." })
})

// ############ GET USER DATA ############
router.post("/userdata", async (req, res) => {
  const { token } = req.body
  try {
    const user = jwt.verify(token, JWT_SECRET)
    const useremail = user.email
    const users = schemas.User

    await users.findOne({ email: useremail }).exec()
      .then((data) => {
        res.send({status: "ok", data: data})
      })
      .catch((error)=>{
        res.send({status: "error", data: error})
      })
  } catch (error) {
    res.send({ status: "error", error: error })

  }
})

// ########## CRUD OPERATIONS ############

router.post("/notes", async (req, res) => {
  const { folder, title, subtitle, bodyText, email } = req.body
  // console.log(title + ' | ' + subtitle + ' | ' + bodyText + ' | ' + id)
  const noteData = {
    folder: folder,
    title: title,
    subtitle: subtitle,
    bodyText: bodyText,
    email: email,
  }
  const newNote = new schemas.Note(noteData)
  const saveNote = await newNote.save()
  if (saveNote) {
    res.send("New note added to DB!")
  } else {
    res.send("Failed to add note to DB.")
  }
  res.end()
})

router.get("/notes/:email", async (req, res) => {
  const notes = schemas.Note
  const email = req.params.email

  const notesData = await notes.find({ email }).exec()
  if (notesData) {
    res.send(notesData)
    // res.send({status: "ok", data: data})
  } else {
    res.send("Failed to get data.")
  }
})

router.patch("/notes/:id", async (req, res) => {
  const { folder, title, subtitle, bodyText } = req.body
  const noteData = {
    folder: folder,
    title: title,
    subtitle: subtitle,
    bodyText: bodyText,
  }

  const patchNote = await schemas.Note.findByIdAndUpdate(
    req.params.id,
    noteData
  )

  if (patchNote) {
    res.send(`Note (id: ${req.params.id}) has been patched in DB!`)
  } else {
    res.send(`Failed to patch note (id: ${req.params.id})  in DB.`)
  }
  res.end()
})

router.delete("/notes/:id", async (req, res) => {
  const deleteNote = await schemas.Note.findByIdAndRemove(req.params.id)

  if (deleteNote) {
    res.send(`Note (id: ${req.params.id})  deleted.`)
  } else {
    res.send(`Failed to delete note (id: ${req.params.id}) in DB.`)
  }
  res.end()
})

module.exports = router
