import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalStore } from "../zustand/store";

const BlogDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = parseInt(queryParams.get("id"));
  const { blogData } = useGlobalStore((state) => state);
  const [currentBlog, setCurrentBlog] = useState({});

  useEffect(() => {
    setCurrentBlog(blogData.filter((blog) => blog.id === id)[0]);
  }, [id, blogData]);

  //   const title = queryParams.get("title");
  //   const description = queryParams.get("description");
  //   const cover_picture = queryParams.get("cover_picture");
  //   const content = queryParams.get("content");
  //   const author = queryParams.get("author");
  //   const published_date = queryParams.get("published_date");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      {currentBlog && (
        <div className="lg:w-3/4 w-full mx-auto mt-4 border rounded-lg font-serif border-gray-400">
          <div className="lg:h-96 h-42">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={`http://localhost:8000${currentBlog.cover_picture}`}
              alt=""
            />
          </div>
          <div className="w-full p-4">
            <span className="text-gray-800 lg:text-5xl text:3xl">
              {currentBlog.title}
            </span>
          </div>
          <div className="w-full p-4 bg-gray-100">
            <span className="text-gray-500 font-thin lg:text-xl text-base">
              {currentBlog.description}
            </span>
          </div>
          <div className="w-full p-4">
            <span className="text-gray-800 lg:text-lg text-base">
              {currentBlog.content}
            </span>
          </div>
          <div className="w-full p-4 bg-gray-100 flex justify-end">
            <span className="font-thin text-gray-500 text-sm italic">
              Published by: {currentBlog.author} on{" "}
              {formatDate(currentBlog.published_date)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
