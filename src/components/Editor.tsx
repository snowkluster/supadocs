import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Socket, io } from "socket.io-client";
import Delta from "quill-delta";
import { useParams } from "react-router-dom";

const Component = styled.div`
  background: #f5f5f5;
`;

export default function Editor() {
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();
  const { id } = useParams();

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
    const quillServer = new Quill("#container", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
    quillServer.disable();
    quillServer.setText("Loading the document...");
    setQuill(quillServer);
  }, []);
  useEffect(() => {
    const socketServer = io("http://localhost:3000");
    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    };
  }, []);

  useEffect(() => {
    if ((socket as Socket) === null || (quill as Quill) === null) return;

    const handleChange = (
      delta: unknown,
      _oldData: unknown,
      source: string
    ) => {
      if (source !== "user") return;
      (socket as Socket).emit("send-changes", delta);
    };

    (quill as Quill) && (quill as Quill).on("text-change", handleChange);

    return () => {
      (quill as Quill) && (quill as Quill).off("text-change", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if ((socket as Socket) === null || (quill as Quill) === null) return;
    type Delta = InstanceType<typeof Delta>;
    const handleChange = (delta: Delta) => {
      (quill as Quill).updateContents(delta);
    };

    socket && socket.on("receive-changes", handleChange);

    return () => {
      socket && socket.off("receive-changes", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if ((socket as Socket) === null || (quill as Quill) === null) return;
    socket &&
      socket.once("load-document", (document) => {
        (quill as Quill).setContents(document);
        (quill as Quill).enable();
      });

    socket && socket.emit("get-document", id);
  }, [quill, socket, id]);

  return (
    <Component>
      <Box id="container" className="container"></Box>
    </Component>
  );
}
