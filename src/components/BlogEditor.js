// components/BlogEditor.js
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function BlogEditor({ blog }) {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const handleUpdateBlog = async () => {
    const blogRef = doc(db, "blogs", blog.id);
    await updateDoc(blogRef, {
      title,
      content,
    });
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdateBlog}>Update Blog</button>
    </div>
  );
}
