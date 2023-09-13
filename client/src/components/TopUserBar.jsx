import { Component } from "react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function TopUserBar({userData, setToken}) {

  function handleLogout() {
    setToken(null)
    window.localStorage.setItem("token", null)
    console.log("User logged out")
  }

  return (
    <div className="h-[40px] bg-slate-800 text-slate-100 px-12 pt-2 text-center">
      {`Bienvenue, ${userData.firstname} ! `}
      <span
        onClick={handleLogout}
        className="text-slate-500 underline hover:text-slate-100 cursor-pointer"
      >
        Se déconnecter
      </span>
    </div>
  )
}
