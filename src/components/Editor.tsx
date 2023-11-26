import { Box } from "@mui/material";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";

export default function Editor() {
  useEffect(() => {
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
    
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
    
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
    
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
    
        ["clean"], // remove formatting button
      ];
    new Quill("#container", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
  }, []);
  return (
    <Box>
      <Box id="container"></Box>
    </Box>
  );
}
