import "./styles/global.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import Rotas from "./rotas.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer autoClose={3000} position="top-right" />
    <Rotas />
  </StrictMode>,
)
