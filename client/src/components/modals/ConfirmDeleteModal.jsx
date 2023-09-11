import { TextField, Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

export default function ConfirmDeleteModal({ onClose, onConfirmDelete }) {
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
        <div className="flex flex-grow flex-col p-6 text-center">
          <h1 className="text-2xl">
            Souhaitez-vous vraiment supprimer cette note ?
          </h1>
          <span className="font-light mb-8">Cette action est définitive</span>

          <div className="flex-row mx-4">
            <Button
              onClick={onClose}
              variant="contained"
              startIcon={<KeyboardReturnIcon />}
              color="primary"
              style={{ marginRight: "1em" }}
            >
              Annuler
            </Button>
            <Button
              onClick={onConfirmDelete}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
            >
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
