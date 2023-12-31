import Editor from "./components/Editor";
import "./styles/Editor.css"
import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={`/docs/${uuidv4()}`} />} />
        <Route path="/docs/:id" element={<Editor />} /> 
      </Routes>
    </BrowserRouter>
  )
}
