import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import App2 from './App2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/alt" element={<App2 />} />
            </Routes>
        </BrowserRouter>
  </StrictMode>,
)
