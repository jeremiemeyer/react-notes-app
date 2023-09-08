import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  noteToShow: {title: "", subtitle: "", bodyText: ""}
}

export const shownotes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        // mal nommé, c'est pour montrer la note selectionné
        editNotes: (state, action) => {
          state.noteToShow = action.payload
        },

    },
    extraReducers: {
      ["notes/deleteNote"]: (state, action) => {
        state.noteToShow={title: "", subtitle: "", bodyText: ""}
      },
      ["notes/addNewNote"]: (state, action) => {
        state.noteToShow=action.payload
      },
    },
})


export const {editNotes} = shownotes.actions
export default shownotes.reducer