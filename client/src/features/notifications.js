import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "@reduxjs/toolkit"

const initialState = {
  notifications: [
  ]
}

export const notifications = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.items.push(action.payload)
        },
    },
    extraReducers: {
      ["notes/deleteNote"]: (state, action) => {
        state.notifications.push(
          {
            id: nanoid(4),
            type: "deletedNote"
          },
        )
      },
      ["notes/addNewNote"]: (state, action) => {
        state.notifications.push(
          {
            id: nanoid(4),
            type: "addedNote"
          },
        )
      },
      ["notes/editNote"]: (state, action) => {
        state.notifications.push(
          {
            id: nanoid(4),
            type: "editedNote"
          },
        )
      },
    },
})


export const {editNotes} = notifications.actions
export default notifications.reducer