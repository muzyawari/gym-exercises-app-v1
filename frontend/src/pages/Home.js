import { useState, useEffect } from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import Example from "./Example";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api/texts/62f8d41a9769f026d274e85c`);
      const jsonData = await response.json();

      if (response.ok) {
        const a = JSON.stringify(jsonData.text)
          .replace(/\\n/g, "<br/>")
          .replace(/"/g, "");

        setText(a);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="mt-24">
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
    </div>
  );
}
