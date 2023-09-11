import NoteForm from "../NoteForm"
import { Button, TextField } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewFolder } from "../../features/notes"

export default function CreateFolderModal({ onClose }) {
  const [newFolderName, setNewFolderName] = useState("")
  const dispatch = useDispatch()

  function handleChange(e) {
    setNewFolderName(e.target.value)
  }

  function handleAddFolder(e) {
    dispatch(createNewFolder(newFolderName))
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className="fixed z-10 inset-0 bg-slate-700/75 bg-blur flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-20 relative bg-gray-200 text-slate-900 min-w-[400px] md:min-w-[700px] px-10 pt-10 pb-6 rounded border border-slate-600 mb-[10vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-500 text-slate-100 rounded flex justify-center items-center"
        >
          X
        </button>

        <div className="flex flex-grow min-w-[800px] flex-col p-6 text-center">
          <h1 className="text-2xl pb-8">Créer un dossier</h1>

          <TextField
            value={newFolderName}
            onChange={(e) => handleChange(e)}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Nom du dossier"
            style={{ marginBottom: "1em" }}
          />

          <Button
            onClick={(e) => handleAddFolder(e)}
            variant="contained"
            color="primary"
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  )
}
