import CreateNoteButton from "./buttons/CreateNoteButton"
import CreateFolderButton from "./buttons/CreateFolderButton"

export default function LeftSideBar({userData}) {
  return (
    <div className="flex flex-col w-[90px] p-6 bg-slate-800 gap-6">
        <CreateNoteButton userData={userData}/>
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