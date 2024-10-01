// /pages/my-blogs.js
import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import EditDeleteButtons from "../components/EditDeleteButtons";
import { Button } from "@/components/ui/button";

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      if (!user) return;

      const blogsSnapshot = await getDocs(collection(db, "blogs"));
      const userBlogs = blogsSnapshot.docs
        .filter(doc => doc.data().AuthorID === user.uid)
        .map(doc => ({ id: doc.id, ...doc.data() }));

      setBlogs(userBlogs);
    };

    fetchMyBlogs();
  }, [user]);

  // Handle delete blog
  const handleDelete = async (blogID) => {
    await deleteDoc(doc(db, "blogs", blogID));
    setBlogs(prev => prev.filter(blog => blog.id !== blogID));
  };

  // Handle edit blog
  const handleEdit = async (blogID, updatedContent) => {
    await updateDoc(doc(db, "blogs", blogID), { content: updatedContent });
    setBlogs(prev => prev.map(blog => (blog.id === blogID ? { ...blog, content: updatedContent } : blog)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">My Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="mb-4">{blog.content}</p>
            <EditDeleteButtons
              blogID={blog.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}
    </div>
  );
}
