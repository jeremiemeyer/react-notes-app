import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { addNewNote } from "../features/notes"
import { editNote } from "../features/notes"
import { deleteNote } from "../features/notes"
import { nanoid } from "@reduxjs/toolkit"
import { EmailShareButton, EmailIcon } from "react-share"

export default function NoteForm({ actionType, onClose }) {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const dispatch = useDispatch()

  const [titleValue, setTitleValue] = useState("")
  const [subtitleValue, setSubtitleValue] = useState("")
  const [bodyTextValue, setBodyTextValue] = useState("")

  useEffect(() => {
    if (actionType === "edit") {
      console.log("edit mode")
      setTitleValue(selectedNote.title)
      setSubtitleValue(selectedNote.subtitle)
      setBodyTextValue(selectedNote.bodyText)
    } else if (actionType === "creer") {
      console.log("create mode")
    }
  }, [selectedNote.id])

  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value)
  }

  const handleChangeSubtitle = (e) => {
    setSubtitleValue(e.target.value)
  }
  const handleChangeBodyText = (e) => {
    setBodyTextValue(e.target.value)
  }

  const handleAjouter = () => {
    if (titleValue === "" || subtitleValue === "") {
      alert("Il faut remplir le formulaire, mon garçon.")
    } else {
      // dispatch(addNewNote([titleValue, subtitleValue, bodyTextValue, nanoid(6)]))
      dispatch(
        addNewNote({
          title: titleValue,
          subtitle: subtitleValue,
          bodyText: bodyTextValue,
          id: nanoid(6),
        })
      )
      onClose()
    }
  }

  const handleEdit = () => {
    dispatch(
      editNote({
        title: titleValue,
        subtitle: subtitleValue,
        bodyText: bodyTextValue,
        id: selectedNote.id,
      })
    )
  }

  return (
    <div className="flex flex-grow  flex-col p-6 text-white text-center">
      <h1 className="text-2xl pb-8">
        {actionType === "edit" ? "Editer" : "Créer"} une note
      </h1>

      <p className="text-xl text-left pb-2">Titre</p>
      <input
        className="text-black h-8 p-4 mb-6 bg-slate-100"
        type="text"
        value={titleValue}
        onChange={(e) => handleChangeTitle(e)}
      />

      <p className="text-xl text-left pb-2">Sous-titre</p>
      <input
        className="text-black h-8 p-4 mb-6 bg-slate-100"
        type="text"
        value={subtitleValue}
        onChange={(e) => handleChangeSubtitle(e)}
      />

      <p className="text-xl text-left pb-2">Contenu</p>
      <textarea
        className="resize h-[300px] text-black p-4 mb-6 bg-slate-100"
        type="text"
        value={bodyTextValue}
        onChange={(e) => handleChangeBodyText(e)}
      />
      {actionType === "edit" ? (
        <>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => handleEdit()}
              className="rounded bg-green-600 hover:bg-green-500 h-8 px-4"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => dispatch(deleteNote(selectedNote.id))}
              className="rounded bg-red-600 hover:bg-red-500 h-8 px-4"
            >
              Supprimer
            </button>
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
        <button
          onClick={() => handleAjouter()}
          className="block mx-auto bg-slate-800 hover:bg-slate-700 text-slate-200 rounded px-4 py-2 mt-7"
        >
          Ajouter
        </button>
      )}
    </div>
  )
}
