// /components/EditDeleteButtons.js
import { useState } from "react";

export default function EditDeleteButtons({ blogID, handleDelete, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");

  const handleSave = () => {
    handleEdit(blogID, newContent);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Edit content"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => handleDelete(blogID)}>Delete</button>
    </div>
  );
}
