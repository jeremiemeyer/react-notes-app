import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { addNewNote } from "../features/notes"
import { editNote } from "../features/notes"
import { EmailShareButton, EmailIcon } from "react-share"
import DeleteNoteButton from "./buttons/DeleteNoteButton"
import FolderSelect from "./FolderSelect"
import { TextField, Button } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import DoneIcon from "@mui/icons-material/Done"
import { nanoid } from "@reduxjs/toolkit"

export default function NoteForm({ actionType, onClose, userData }) {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const dispatch = useDispatch()

  const [titleValue, setTitleValue] = useState("")
  const [subtitleValue, setSubtitleValue] = useState("")
  const [bodyTextValue, setBodyTextValue] = useState("")
  const [folderForNewNote, setFolderForNewNote] = useState("")
  const [noteNewFolder, setNoteNewFolder] = useState(selectedNote.folder)

  useEffect(() => {
    if (actionType === "edit") {
      // console.log("edit mode")
      setTitleValue(selectedNote.title)
      setSubtitleValue(selectedNote.subtitle)
      setBodyTextValue(selectedNote.bodyText)
      setNoteNewFolder(folderForNewNote)
    } else if (actionType === "create") {
      console.log("create mode")
    }
  }, [selectedNote._id])

  const handleCallback = (childData) => {
    setFolderForNewNote(childData)
    console.log(childData)
  }

  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value)
  }

  const handleChangeSubtitle = (e) => {
    setSubtitleValue(e.target.value)
  }
  const handleChangeBodyText = (e) => {
    setBodyTextValue(e.target.value)
  }

  const handleAddNote = () => {
    if (titleValue === "" || subtitleValue === "") {
      alert("Il faut remplir le formulaire, mon garçon.")
    } else {
      // dispatch(addNewNote([titleValue, subtitleValue, bodyTextValue, nanoid(6)]))
      dispatch(
        addNewNote({
          folder: folderForNewNote,
          title: titleValue,
          subtitle: subtitleValue,
          bodyText: bodyTextValue,
          email: userData.email,
          id: nanoid(4),
        })
      )
      onClose()
    }
  }

  const handleEdit = () => {
    dispatch(
      editNote({
        folder: folderForNewNote,
        title: titleValue,
        subtitle: subtitleValue,
        bodyText: bodyTextValue,
        id: selectedNote._id,
      })
    )
  }

  return (
    <div className="flex flex-grow min-w-[800px] flex-col p-6 text-center">
      <h1 className="text-2xl pb-8">
        {actionType === "edit" ? "Editer" : "Créer"} une note
      </h1>
      {actionType === "create" && <FolderSelect actionType="create" parentCallback={handleCallback} />}
      {actionType === "edit" && <FolderSelect actionType="edit" parentCallback={handleCallback} />}
      <TextField
        value={titleValue}
        onChange={(e) => handleChangeTitle(e)}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Titre"
        style={{ marginBottom: "1em" }}
      />

      <TextField
        value={subtitleValue}
        onChange={(e) => handleChangeSubtitle(e)}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Sous-titre"
        style={{ marginBottom: "1em" }}
      />

      <TextField
        value={bodyTextValue}
        onChange={(e) => handleChangeBodyText(e)}
        id="outlined-multiline-static"
        label="Contenu"
        multiline
        rows={8}
        style={{ marginBottom: "1em" }}
      />

      {actionType === "edit" ? (
        <>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => handleEdit()}
              variant="contained"
              startIcon={<DoneIcon />}
              color="primary"
            >
              Sauvegarder
            </Button>

            <DeleteNoteButton selectedNoteId={selectedNote._id} />
          </div>
          <div className="flex flex-row mt-4 gap-4">
            <span>Envoyer un rappel par e-mail</span>
            <EmailShareButton
              url=""
              subject={`${titleValue} - ${subtitleValue}`}
              body={bodyTextValue}
            >
              <EmailIcon size={30} round={false} borderRadius={10} />
            </EmailShareButton>
          </div>
        </>
      ) : (
        <Button
          onClick={() => handleAddNote()}
          variant="contained"
          startIcon={<SendIcon />}
          color="primary"
        >
          Ajouter
        </Button>
      )}
    </div>
  )
}
