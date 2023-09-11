import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { selectFolderToShow } from "../features/shownotes"
import { useEffect, useState } from "react"

export default function FolderSelect({ actionType, parentCallback }) {
  const notes = useSelector((state) => state.notes)
  const notesToShow = useSelector((state) => state.shownotes)
  const dispatch = useDispatch()
  // when creating new note
  const [folderForNewNote, setFolderForNewNote] = useState("")
  // when editing existing note folder
  const [noteNewFolder, setNoteNewFolder] = useState(
    notesToShow.noteToShow.folder
  )

  function handleChange(e) {
    // console.log("from handleChange ", noteFolder)

    actionType === "create"
      ? setFolderForNewNote(e.target.value)
      : setNoteNewFolder(e.target.value)
    parentCallback(e.target.value)
    // console.log("from handleChange ", noteNewFolder)
  }

  useEffect(() => {
    setNoteNewFolder(notesToShow.noteToShow.folder)
  }, [notesToShow.noteToShow])

  return (
    <>
      {actionType === "select" && (
        <FormControl fullWidth style={{ marginBottom: "1em" }}>
          <InputLabel id="demo-simple-select-label">
            Afficher les notes dans le dossier
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={
              notesToShow.folderSelected === ""
                ? "Tout afficher"
                : notesToShow.folderSelected
            }
            label="Afficher les notes dans le dossier"
            //   onChange={handleChange}
          >
            <MenuItem
              onClick={() => dispatch(selectFolderToShow("Tout afficher"))}
              value="Tout afficher"
            >
              <span className="italic">Tout afficher</span>
            </MenuItem>
            {notes.folders?.map((el) => (
              <MenuItem
                onClick={() => dispatch(selectFolderToShow(el))}
                key={el.id}
                value={el}
              >
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {actionType === "create" && (
        <FormControl fullWidth style={{ marginBottom: "1em" }}>
          <InputLabel id="demo-simple-select-label">
            {actionType === "edit"
              ? "Dossier"
              : "Créer note note dans le dossier"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={folderForNewNote}
            label={
              actionType === "edit"
                ? "Dossier"
                : "Créer note note dans le dossier"
            }
            onChange={handleChange}
          >
            {notes.folders?.map((el) => (
              <MenuItem key={el.id} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {actionType === "edit" && (
        <>
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <InputLabel id="demo-simple-select-label">Dossier</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={noteNewFolder}
              label={"Dossier"}
              onChange={handleChange}
            >
              {notes.folders?.map((el) => (
                <MenuItem key={el.id} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <button onClick={() => console.log(notesToShow.noteToShow.folder)}>OKOK</button> */}
        </>
      )}
    </>
  )
}
