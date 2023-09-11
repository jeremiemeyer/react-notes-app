import { configureStore } from "@reduxjs/toolkit"
import notes from "./features/notes"
import shownotes from "./features/shownotes"
import notifications from "./features/notifications"

export const store = configureStore({
  reducer: {
    notes,
    shownotes,
    notifications,
  },
})
