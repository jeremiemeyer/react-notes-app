const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.post('/notes', async(req, res) => {
  const {title, subtitle, bodyText, id} = req.body
  // console.log(title + ' | ' + subtitle + ' | ' + bodyText + ' | ' + id)
  const noteData = {title: title, subtitle: subtitle, bodyText: bodyText}
  const newNote = new schemas.Note(noteData)
  const saveNote = await newNote.save()
  if (saveNote) {
    res.send('New note added to DB!')
  } else {
    res.send('Failed to add note to DB.')
  }
  res.end()
})

router.get('/notes', async(req, res) => {
  const notes = schemas.Note

  const notesData = await notes.find({}).exec()
  if (notesData) {
    res.send(JSON.stringify(notesData))
  } else {
    res.send('Failed to get data.')
  }
})

router.patch('/notes/:id', async(req, res) => {
  const {title, subtitle, bodyText} = req.body
  const noteData = {title: title, subtitle: subtitle, bodyText: bodyText}

  const patchNote = await schemas.Note.findByIdAndUpdate(req.params.id, noteData)

  if (patchNote) {
    res.send(`Note (id: ${req.params.id}) has been patched in DB!`)
  } else {
    res.send(`Failed to patch note (id: ${req.params.id})  in DB.`)
  }
  res.end()
})

router.delete('/notes/:id', async(req, res) => {

  const deleteNote = await schemas.Note.findByIdAndRemove(req.params.id)

  if (deleteNote) {
    res.send(`Note (id: ${req.params.id})  deleted.`)
  } else {
    res.send(`Failed to delete note (id: ${req.params.id}) in DB.`)
  }
  res.end()
})


module.exports = router