import Editor from "./components/Editor";
import "./styles/Editor.css"
import { supabase } from "./config/supabaseClient";

export default function App() {
  console.log(supabase)
  return (
    <>
      <Editor />
    </>
  )
}
