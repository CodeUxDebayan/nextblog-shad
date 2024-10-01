// /components/BlogCard.js
import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function BlogCard({ blog, likes, comments, handleLike, handleComment, user }) {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <div className="flex items-center space-x-4">
        <Button onClick={() => handleLike(blog.id)}>
          {likes.includes(user?.uid) ? "Unlike" : "Like"} ({likes.length})
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Comments</h3>
        {comments.map((comment, index) => (
          <p key={index} className="text-sm text-gray-600">{comment.text}</p>
        ))}
        {user && (
          <div className="mt-2">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <Button onClick={() => handleComment(blog.id, commentText)} className="mt-2">
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
