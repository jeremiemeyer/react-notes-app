import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { store } from "./store.js"
import { Provider } from "react-redux/es/exports"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
)
