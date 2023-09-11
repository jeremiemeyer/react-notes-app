import NoteRightSideBar from "./components/NoteRightSideBar"
import LeftSideBar from "./components/LeftSideBar"
import NotesList from "./components/NotesList"
import RightSide from "./components/RightSide"
import { useSelector } from "react-redux"
import NotificationCentre from "./components/NotificationCentre"


function App() {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-row">
          <div className="flex flex-item">
            <LeftSideBar /> 
          </div>
          <div className="flex flex-item">
            <NotesList /> 
          </div>         
          <div className="flex flex-col flex-item w-screen bg-slate-200 px-4">
            {selectedNote.title==="" ? (<RightSide/> ) : (<NoteRightSideBar/>)}
            <NotificationCentre />
          </div>  
        </div>
      </div>
    </>
  )
}

export default App
