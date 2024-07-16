import React, { useEffect } from "react";
import { useGlobalStore } from "../zustand/store";
import BlogCard from "./blogCard";

const Home = () => {
  const { blogData, setBlogData } = useGlobalStore((state) => state);

  useEffect(() => {
    handleGetBlogs();
  }, []);

  const handleGetBlogs = async () => {
    const res = await fetch(process.env.REACT_APP_BASE_API_URL + "blogposts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setBlogData(data);
  };
  return (
    <>
      {blogData.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            No blogs available
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 p-10">
          {blogData.map((blog, index) => {
            return <BlogCard key={index} blog={blog} />;
          })}
        </div>
      )}
    </>
  );
};

export default Home;
