import NoteRightSideBar from "./components/NoteRightSideBar"
import LeftSideBar from "./components/LeftSideBar"
import NotesList from "./components/NotesList"
import RightSide from "./components/RightSide"
import { useSelector } from "react-redux"


function App() {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)

  return (
    <>
      <div className="h-screen bg-slate-800">
        <div className="flex flex-row">
          <div className="flex flex-item">
            <LeftSideBar /> 
          </div>
          <div className="flex flex-item">
            <NotesList /> 
          </div>         
          <div className="flex flex-item w-screen flex-item">
            {selectedNote.title==="" ? (<RightSide/> ) : (<NoteRightSideBar/>)}
          </div>  
        </div>
      </div>
    </>
  )
}

export default App
