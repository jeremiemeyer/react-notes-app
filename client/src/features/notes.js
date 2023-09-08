import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
  notes: undefined,
}

const addNewNoteToDB = async(noteData) => {
    await axios.post('http://localhost:3000/notes', noteData)
}
const deleteNoteFromDB = async(noteID) => {
    await axios.delete(`http://localhost:3000/notes/${noteID}`)
}
const editNoteToDB = async(noteData) => {
    await axios.patch(`http://localhost:3000/notes/${noteData.id}`, noteData)
    .then(res => console.log(res.data))
}

export const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNotes: (state, action) => {
            state.items = action.payload
        },
        addNewNote: (state, action) => {
            // state.items.push(action.payload)
            addNewNoteToDB(action.payload)
        },
        editNote: (state, action) => {
            editNoteToDB(action.payload)
            // state.items.find((el) => el.id === action.payload.id).title = action.payload["title"]
            // state.items.find((el) => el.id === action.payload.id).subtitle = action.payload["subtitle"]
            // state.items.find((el) => el.id === action.payload.id).bodyText = action.payload["bodyText"]
        },
        deleteNote: (state, action) => {
            deleteNoteFromDB(action.payload)
            // console.log(action.payload)
            // const indexOfNoteToRemove = state.items.findIndex(el => el.id === action.payload)
            // console.log(action.payload)
            // state.items.splice(indexOfNoteToRemove, 1)
        }
    }
})

export function getNotesList(action) {
    return function(dispatch, getState) {
        fetch("http://localhost:3000/notes")
        .then(response => response.json())
        .then(data => dispatch(addNotes(data)))
    }
}

export const {addNotes, addNewNote, editNote, deleteNote} = notes.actions
export default notes.reducer