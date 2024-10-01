// src/components/DeleteBlog.js
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Modal, Button } from "@shadcn/ui";

const DeleteBlog = ({ blogId, onClose }) => {
  const handleDelete = async () => {
    const blogRef = doc(db, "blogs", blogId);
    await deleteDoc(blogRef);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
      <p>Are you sure you want to delete this blog?</p>
      <div className="mt-4 flex justify-between">
        <Button className="bg-gray-500" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-red-500" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteBlog;
