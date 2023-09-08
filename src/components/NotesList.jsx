import { useSelector, useDispatch } from "react-redux"
import { getNotesList } from "../features/notes"
import { editNotes } from "../features/shownotes"

export default function NotesList() {
  const notes = useSelector((state) => state.notes)
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const dispatch = useDispatch()

  if (!notes.items) {
    dispatch(getNotesList())
  }

  return (
    <div 
      onClick={() => dispatch(editNotes({title: "", subtitle: "", bodyText: ""}))}
      className="bg-slate-200 min-w-[400px] divide-y-2 divide-slate-300"
    >
      <h1 className="text-2xl p-6 font-semibold text-center pb-8 ">Mes notes</h1>
      <ul
      onClick={(e) => e.stopPropagation()}>
        {notes.items && notes.items.length > 0
          ? notes.items.map((el) => (
              <li
                // onClick={() => dispatch(editNotes(el.id))}
                onClick={() => dispatch(editNotes(el))}
                key={el.id}
                className={`${
                  selectedNote.id === el.id ? "bg-slate-400" : "bg-slate-300"
                } p-4 border  hover:bg-slate-400 cursor-pointer`}
              >
                <p className="font-semibold">{el.title}</p>
                <p>{el.subtitle}</p>
              </li>
            ))
          : <p className="p-6 text-xl">Il n'y a aucune note à afficher. 😢</p>}
      </ul>
    </div>
  )
}
