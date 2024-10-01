// /pages/index.js
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import BlogList from "../components/BlogList";
import { useAuthState } from "react-firebase-hooks/auth";


export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [user] = useAuthState(auth);

  // Fetch blogs and populate likes and comments
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsSnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch likes and comments
      const likesSnapshot = await getDocs(collection(db, "likes"));
      const likesData = likesSnapshot.docs.reduce((acc, likeDoc) => {
        const { BlogID, UserID } = likeDoc.data();
        acc[BlogID] = acc[BlogID] ? [...acc[BlogID], UserID] : [UserID];
        return acc;
      }, {});

      const commentsSnapshot = await getDocs(collection(db, "comments"));
      const commentsData = commentsSnapshot.docs.reduce((acc, commentDoc) => {
        const { BlogID, CommentText, UserID } = commentDoc.data();
        acc[BlogID] = acc[BlogID] ? [...acc[BlogID], { text: CommentText, userID: UserID }] : [{ text: CommentText, userID: UserID }];
        return acc;
      }, {});

      setBlogs(blogsData);
      setLikes(likesData);
      setComments(commentsData);
    };

    fetchBlogs();
  }, []);

  // Handle like/unlike
  const handleLike = async (blogID) => {
    if (!user) return alert("You must be logged in to like blogs");
    const userID = user.uid;

    if (likes[blogID]?.includes(userID)) {
      // Unlike
      const newLikes = likes[blogID].filter(id => id !== userID);
      await updateDoc(doc(db, "blogs", blogID), { LikesCount: newLikes.length });
      setLikes(prev => ({ ...prev, [blogID]: newLikes }));
    } else {
      // Like
      await addDoc(collection(db, "likes"), { BlogID: blogID, UserID: userID });
      const newLikes = likes[blogID] ? [...likes[blogID], userID] : [userID];
      await updateDoc(doc(db, "blogs", blogID), { LikesCount: newLikes.length });
      setLikes(prev => ({ ...prev, [blogID]: newLikes }));
    }
  };

  // Handle comment
  const handleComment = async (blogID, commentText) => {
    if (!user) return alert("You must be logged in to comment on blogs");
    const userID = user.uid;

    await addDoc(collection(db, "comments"), { BlogID: blogID, CommentText: commentText, UserID: userID });
    setComments(prev => ({
      ...prev,
      [blogID]: [...(prev[blogID] || []), { text: commentText, userID }]
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">All Blogs</h1>
      <BlogList
        blogs={blogs}
        likes={likes}
        comments={comments}
        handleLike={handleLike}
        handleComment={handleComment}
        user={user}
      />
    </div>
  );
}

