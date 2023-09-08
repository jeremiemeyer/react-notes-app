import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notes: undefined,
}

export const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNotes: (state, action) => {
            state.items = action.payload
        },
        addNewNote: (state, action) => {
            state.items.push(action.payload)
        },
        editNote: (state, action) => {
            state.items.find((el) => el.id === action.payload.id).title = action.payload["title"]
            state.items.find((el) => el.id === action.payload.id).subtitle = action.payload["subtitle"]
            state.items.find((el) => el.id === action.payload.id).bodyText = action.payload["bodyText"]
        },
        deleteNote: (state, action) => {
            const indexOfNoteToRemove = state.items.findIndex(el => el.id === action.payload)
            // console.log(indexOfNoteToRemove)
            state.items.splice(indexOfNoteToRemove, 1)
        }
    }
})

export function getNotesList(action) {
    return function(dispatch, getState) {
        fetch("/data/notes.json")
        .then(response => response.json())
        .then(data => dispatch(addNotes(data.notes)))
    }
}

export const {addNotes, addNewNote, editNote, deleteNote} = notes.actions
export default notes.reducer