// components/CommentSection.js
import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function CommentSection({ blogId, user }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = async () => {
    if (!user) return alert("You need to be logged in to comment!");
    
    const blogRef = doc(db, "blogs", blogId);
    await updateDoc(blogRef, {
      comments: arrayUnion({
        userId: user.uid,
        commentText,
        timestamp: new Date(),
      }),
    });
    setComments([...comments, { userId: user.uid, commentText }]);
    setCommentText("");
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment, idx) => (
        <p key={idx}>{comment.commentText}</p>
      ))}
      {user && (
        <div>
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
      )}
    </div>
  );
}
