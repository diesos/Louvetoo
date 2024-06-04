import { useState } from 'react'
import './App.css'
import logo from "/logo.svg"

function App() {

  return (
    <>
    <div className="main--content">
    <img src="./logo.svg"/>
    <p>Adresse e-mail</p>
    <input type="text" className="login" />
    <p>Mot de passe</p>
    <input type="text" className="login" />
    <button>Connect</button>
    </div>
    </>
  )
}

export default App
