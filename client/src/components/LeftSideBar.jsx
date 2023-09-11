import CreateNoteButton from "./CreateNoteButton"
import CreateFolderButton from "./CreateFolderButton"

export default function LeftSideBar() {
  return (
    <div className="flex flex-col w-[90px] min-h-screen p-6 bg-slate-800 gap-6">
        <CreateNoteButton />
        <CreateFolderButton />
        {/* <button className="pb-6 flex-item">
            <img
                src={Edit}
                alt="New Note" 
            />
        </button> */}
    </div>
  )
}