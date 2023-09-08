import CreateNoteButton from "./CreateNoteButton"

export default function LeftSideBar() {
  return (
    <div className="flex flex-col w-[90px] min-h-screen p-6">
        <CreateNoteButton />
        {/* <button className="pb-6 flex-item">
            <img
                src={Edit}
                alt="New Note" 
            />
        </button> */}
    </div>
  )
}