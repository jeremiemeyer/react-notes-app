import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noteToShow: {title: "", subtitle: "", bodyText: "", folder: ""},
  folderSelected: "Tout afficher"
}

export const shownotes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        // mal nommé, c'est pour montrer la note selectionné
        editNotes: (state, action) => {
          state.noteToShow = action.payload
          // console.log("Depuis shownotes.js :", state.noteToShow)
        },
        selectFolderToShow: (state, action) => {
          state.folderSelected = action.payload
          console.log(action.payload)
        }
    },
    extraReducers: {
      ["notes/deleteNote"]: (state, action) => {
        state.noteToShow={title: "", subtitle: "", bodyText: "", folder: ""}
      },
      ["notes/addNewNote"]: (state, action) => {
        state.noteToShow=action.payload
      },
    },
})


export const {editNotes, selectFolderToShow} = shownotes.actions
export default shownotes.reducer