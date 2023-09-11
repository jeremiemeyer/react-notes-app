import Folder from "./../assets/folder.svg"
import { useState } from "react"
import { createPortal } from "react-dom"
import CreateFolderModal from "./modals/CreateFolderModal"


export default function CreateNoteButton() {
  const [showCreateNewFolderModal, setShowCreateNewFolderModal] = useState(false)
  return (
    <>
        <button 
        onClick={() => setShowCreateNewFolderModal(!showCreateNewFolderModal)}
        className="flex-item hover:bg-slate-600"
        >
            <img
                src={Folder}
                alt="Create New Folder" 
            />
        </button>
        {showCreateNewFolderModal && createPortal(<CreateFolderModal onClose={() => setShowCreateNewFolderModal(false)}/>, document.body)}
    </>
  )
}