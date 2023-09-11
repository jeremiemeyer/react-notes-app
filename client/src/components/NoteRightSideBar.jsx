import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import NoteForm from "./NoteForm"
import NotificationCentre from "./NotificationCentre"

// import noteToShow from "../features/shownotes"

export default function NoteRightSideBar() {
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const dispatch = useDispatch()
  const [hasNoteBeenSelected, setHasNoteBeenSelected] = useState(false)
  // console.log(noteToShow)
  return (
    <>
      <NoteForm actionType="edit" onClose={onclose}/>
    </>
  )
}
