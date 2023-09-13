import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import notes from "./notes"

const initialState = {
  noteToShow: {title: "", subtitle: "", bodyText: "", folder: "", _id: ""},
  folderSelected: "Tout afficher"
}


export const shownotes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        // mal nommé, c'est pour montrer la note selectionné
        editNotes: (state, action) => {
          state.noteToShow = action.payload
          console.log("Depuis shownotes.js :", state.noteToShow.id)
        },
        selectFolderToShow: (state, action) => {
          state.folderSelected = action.payload
          // console.log(action.payload)
        },
        setNoteToShow: (state, action) => {
          state.noteToShow = action.payload
        }
    },
    extraReducers: {
      ["notes/deleteNote"]: (state, action) => {
        state.noteToShow={title: "", subtitle: "", bodyText: "", folder: "", _id:""}
      },
      ["notes/addNewNote"]: (state, action) => {
        state.noteToShow = action.payload;
      },
    },
})


export const {editNotes, selectFolderToShow, setNoteToShow} = shownotes.actions
export default shownotes.reducer