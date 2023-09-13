import { TextField, Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteNote } from "../../features/notes"
import { createPortal } from "react-dom"
import ConfirmDeleteModal from "./../modals/ConfirmDeleteModal"

export default function DeleteNoteButton({ selectedNoteId }) {
  const dispatch = useDispatch()
  const [showConfirmDeleteNoteModal, setShowConfirmDeleteNoteModal] =
    useState(false)

  return (
    <>
      <Button
        onClick={() => setShowConfirmDeleteNoteModal(true)}
        //   onClick={() => dispatch(deleteNote(selectedNoteId))}
        variant="contained"
        startIcon={<DeleteIcon />}
        color="error"
      >
        Supprimer
      </Button>

      {showConfirmDeleteNoteModal &&
        createPortal(
          <ConfirmDeleteModal
            onClose={() => setShowConfirmDeleteNoteModal(false)}
            onConfirmDelete={() => dispatch(deleteNote(selectedNoteId))}
          />,
          document.body
        )}
    </>
  )
}
