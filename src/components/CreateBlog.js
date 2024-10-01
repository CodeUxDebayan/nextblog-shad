// src/components/CreateBlog.js
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { Modal, Input, Button } from "@shadcn/ui";

const CreateBlog = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const handleCreate = async () => {
    if (title && content) {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        userId: user.uid,
        createdAt: new Date(),
      });
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Create Blog</h2>
      <Input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <Input
        type="textarea"
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
      />
      <Button className="bg-green-500" onClick={handleCreate}>
        Create
      </Button>
    </Modal>
  );
};

export default CreateBlog;
