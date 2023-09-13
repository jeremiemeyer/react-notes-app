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
    await axios.post(`https://jm-notes-app.fly.dev/notes/`, noteData)
  } catch (error) {
    return console.log("error")
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
    //get all notes from DB and put them in redux store
    addNotes: (state, action) => {
      state.items = action.payload
      state.folders = getFolders(action.payload)
      // console.log(state.folders)
    },
    createNewFolder: (state, action) => {
      state.folders.push(action.payload)
      // console.log(state.folders)
    },
    addNewNote: (state, action) => {
      state.items.push(action.payload)
      console.log(action.payload)
      addNewNoteToDB(action.payload)
    },
    editNote: (state, action) => {
      state.items.find((el) => el._id === action.payload.id).folder = action.payload["folder"]
      state.items.find((el) => el._id === action.payload.id).title = action.payload["title"]
      state.items.find((el) => el._id === action.payload.id).subtitle = action.payload["subtitle"]
      state.items.find((el) => el._id === action.payload.id).bodyText = action.payload["bodyText"]
      editNoteToDB(action.payload)
    },
    deleteNote: (state, action) => {
      const indexOfNoteToRemove = state.items.findIndex(el => el._id === action.payload)
      state.items.splice(indexOfNoteToRemove, 1)
      deleteNoteFromDB(action.payload)
    },
  },
})


export function getNotesList(userEmail) {

  return async function (dispatch, getState) {
    try {
      const response = await fetch(`https://jm-notes-app.fly.dev/notes/${userEmail}`)
      
      // above here i can't use process.env in the fetch! why?
      const data = await response.json()

      // Permet de gérer le problème de refresh. Explications :
      // Lorsqu'on créé une nouvelle note, on veut qu'elle soit selectionnée quand le modal de création se ferme,
      // et elle a un bg de couleur foncée pour mettre en avant qu'elle est selectionnée.
      // Pour cela on vérifie si selectedNote.id === el.id (cf NotesList.jsx)
      // Attention à bien comprendre que "id", c'est l'id dans le store redux. A ne pas confondre avec "_id",
      // géré par mongoDB.
      // Mais, problème : si on refresh, le store redux disparait, et la note n'a donc plus d'id dans le store.
      // On ne peut donc plus vérifier la condition selectedNote.id === el.id
      // Comme à chaque refresh, les notes sont re-fetchées dans la BDD, je fais en sorte qu'à chaque refresh,
      // lorsqu'on recup les notes dans la BDD, on assigne à ce moment là un id grâce à nanoid.
      
      const dataWithIds = data.map((item) => ({
        ...item,
        id: nanoid(4),
      }));

      dispatch(addNotes(dataWithIds));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }

  }
}

export const { addNotes, createNewFolder, addFolders, addNewNote, editNote, deleteNote } =
  notes.actions
export default notes.reducer
