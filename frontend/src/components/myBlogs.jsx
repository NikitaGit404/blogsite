import React, { useEffect } from "react";
import { useGlobalStore } from "../zustand/store";
import BlogCard from "./blogCard";
import { Navigate } from "react-router-dom";

const MyBlogs = () => {
  const { blogData, isLoggedIn, setIsLoggedIn } = useGlobalStore(
    (state) => state
  );
  const currentUser = sessionStorage.getItem("user");

  const userBlogs = blogData.filter((blog) => blog.author === currentUser);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {userBlogs.length !== 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 p-10">
          {userBlogs.map((blog, index) => {
            return <BlogCard key={index} blog={blog} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            No blogs available, create one!
          </h1>
        </div>
      )}
    </>
  );
};

export default MyBlogs;
