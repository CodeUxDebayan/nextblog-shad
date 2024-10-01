// /components/BlogList.js
import BlogCard from "./BlogCard";

export default function BlogList({
  blogs,
  likes,
  comments,
  handleLike,
  handleComment,
  user,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          likes={likes[blog.id] || []}
          comments={comments[blog.id] || []}
          handleLike={handleLike}
          handleComment={handleComment}
          user={user}
        />
      ))}
    </div>
  );
}
