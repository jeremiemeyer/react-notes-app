import NoteForm from "../NoteForm"
import { Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export default function AddNoteModal({ onClose }) {
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


        <NoteForm actionType="create" onClose={onClose} />
      </div>
    </div>
  )
}
