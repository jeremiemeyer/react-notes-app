import TopUserBar from "../components/TopUserBar"
import LeftSideBar from "../components/LeftSideBar"
import NotesList from "../components/NotesList"
import RightSide from "../components/RightSide"
import NotificationCentre from "../components/NotificationCentre"
import NoteRightSideBar from "../components/NoteRightSideBar"
import { useSelector } from "react-redux"
import { useAuth } from "../context/AuthContext"

export default function Home({userData, setToken}) {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const { token } = useAuth()


  return (
    <div className="flex flex-col max-h-screen">
      <div>
        <TopUserBar userData={userData} setToken={setToken}/>
      </div>

      <div className="flex flex-row max-h-[calc(100vh-40px)]">
        <div className="flex flex-item">
          <LeftSideBar userData={userData}/>
        </div>
        <div className="flex flex-item bg-slate-800">
          <NotesList userData={userData} />
        </div>
        <div className="flex flex-col flex-item w-screen bg-slate-200 px-4">
          {selectedNote.title === "" ? <RightSide /> : <NoteRightSideBar />}
          <NotificationCentre />
        </div>
      </div>
    </div>
  )
}
