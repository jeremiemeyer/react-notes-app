import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { nanoid } from "@reduxjs/toolkit"
import getFolders from "../utils/getFolders"

const initialState = {
  items: undefined,
  folders: [
    // {
    //   name: "ok",
    //   id: 1,
    // },
    // {
    //   name: "pd",
    //   id: 2,
    // },
  ],
}

const addNewNoteToDB = async (noteData) => {
  try {
    await axios.post("https://jm-notes-app.fly.dev/notes", noteData)
  } catch (error) {
    return console.log(error)
  }
}
const deleteNoteFromDB = async (noteID) => {
  await axios.delete(`https://jm-notes-app.fly.dev/notes/${noteID}`)
}
const editNoteToDB = async (noteData) => {
  await axios
    .patch(`https://jm-notes-app.fly.dev/notes/${noteData.id}`, noteData)
    .then((res) => console.log(res.data))
}

export const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.items = action.payload
      state.folders = getFolders(action.payload)
      console.log(state.folders)
    },
    createNewFolder: (state, action) => {
      state.folders.push(action.payload)
      console.log(state.folders)
    },
    // addFolders: (state, action) => {
    //   action.payload.forEach((el) => {
    //     const storeState = getState()
    //     const isAlreadyPresent = storeState.folders.find(
    //       (el) => el.name === action.payload.folder
    //     )

    //     (!isAlreadyPresent) ?
    //       state.folders.push(
    //         {
    //           name: el.folder,
    //           id: nanoid(4)
    //         },
    //       )
    //       :
    //       console.log("already present, not added")
    //   })

    // },
    addNewNote: (state, action) => {
      state.items.push(action.payload)
      console.log(action.payload)
      addNewNoteToDB(action.payload)
    },
    editNote: (state, action) => {
      state.items.find((el) => el._id === action.payload.id).folder = action.payload["folder"]
      editNoteToDB(action.payload)
      // state.items.find((el) => el.id === action.payload.id).subtitle = action.payload["subtitle"]
      // state.items.find((el) => el.id === action.payload.id).bodyText = action.payload["bodyText"]
    },
    deleteNote: (state, action) => {
      const indexOfNoteToRemove = state.items.findIndex(el => el._id === action.payload)
      state.items.splice(indexOfNoteToRemove, 1)
      deleteNoteFromDB(action.payload)
    },
  },
})

export function getNotesList(action) {
  return async function (dispatch, getState) {
    try {
      await fetch("https://jm-notes-app.fly.dev/notes")
        .then((response) => response.json())
        .then((data) => dispatch(addNotes(data)))
      // .then((data) => dispatch(addFolders(data)))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

// export function getNotesList(action) {
//     return function(dispatch, getState) {
//         fetch("https://jm-notes-app.fly.dev/notes")
//         .then(response => response.json())
//         .then(data => dispatch(addNotes(data)))
//     }
// }

export const { addNotes, createNewFolder, addFolders, addNewNote, editNote, deleteNote } =
  notes.actions
export default notes.reducer
