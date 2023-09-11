import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { getNotesList } from "../features/notes"
import { editNotes, selectFolderToShow } from "../features/shownotes"
import SearchBar from "./SearchBar"
import spinner from "./../assets/spinner.svg"
import FolderSelect from "./FolderSelect"
import CreateNoteButton from "./CreateNoteButton"
import DeleteNoteButton from "./DeleteNoteButton"

export default function NotesList() {
  const notes = useSelector((state) => state.notes)
  const notifications = useSelector((state) => state.notifications)
  const selectedNote = useSelector((state) => state.shownotes.noteToShow)
  const folderToShow = useSelector((state) => state.shownotes)
  const dispatch = useDispatch()
  const [searchInputText, setSearchInputText] = useState("")
  const [hasBeenRetrieved, setHasBeenRetrieved] = useState(false)

  // dégueu. Que mettre dans le tableau de dépendances ?
  useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getNotesList())
          setHasBeenRetrieved(true)
        } catch (error) {
          console.log("error retrieving data")
          setHasBeenRetrieved(false)
        }
      }
      fetchData()
      console.log(notifications)
  }, [] ) //quand la derniere notification est différente

  let handleInput = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setSearchInputText(lowerCase)
    console.log(lowerCase)
    console.log(filteredNotesList)
  }

  // First I filter by selected folder
  const folderFilteredNotesList = notes.items?.filter((el) => {
    if (
      el.folder === folderToShow.folderSelected ||
      folderToShow.folderSelected === "Tout afficher"
    ) {
      return true
    }
  })

  // Then, I filter by the search bar input
  const filteredNotesList = folderFilteredNotesList?.filter((el) => {
    if (searchInputText === "") {
      return true
    } else {
      return (
        el.title.toLowerCase().includes(searchInputText) ||
        el.subtitle.toLowerCase().includes(searchInputText) ||
        el.bodyText.toLowerCase().includes(searchInputText)
      )
    }
  })

  const content = (
    <ul onClick={(e) => e.stopPropagation()}>
      {filteredNotesList && filteredNotesList.length > 0 ? (
        filteredNotesList.map((el) => (
          <li
            onClick={() => dispatch(editNotes(el))}
            key={el._id}
            className={`${
              selectedNote._id === el._id ? "bg-slate-400" : "bg-slate-300"
            } p-4 border  hover:bg-slate-400 cursor-pointer`}
          >
            <p className="font-semibold">{el.title}</p>
            <p>{el.subtitle}</p>
          </li>
        ))
      ) : (
        <p className="p-6 text-xl">Il n'y a aucune note à afficher. 😢</p>
      )}
    </ul>
  )

  return (
    <div
      onClick={() =>
        dispatch(editNotes({ title: "", subtitle: "", bodyText: "" }))
      }
      className="bg-slate-200 w-[400px] "
    >
      <div className="fixed bg-slate-200 w-[400px] px-2">
        <h1 className="text-2xl p-6 font-semibold text-center pb-8 ">
          Mes notes
        </h1>
        <FolderSelect actionType="select" />
        <SearchBar
          handleInput={handleInput}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="mt-[220px] overflow-y-auto max-h-[calc(100vh-220px)]">
        {hasBeenRetrieved ? content : <img src={spinner} alt="" />}
      </div>
    </div>
  )
}
