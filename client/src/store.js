import { configureStore } from "@reduxjs/toolkit";
import notes from "./features/notes";
import shownotes from "./features/shownotes";

export const store = configureStore({
    reducer: {
        notes,
        shownotes
    },
})