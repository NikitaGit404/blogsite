import React, { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useGlobalStore } from "../zustand/store";
import { FaTrashCan } from "react-icons/fa6";

const BlogCard = ({ blog }) => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(null);
  const { blogData, setBlogData, isLoggedIn } = useGlobalStore(
    (state) => state
  );
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("user") || ""
  );

  useEffect(() => {
    if (isLoggedIn) {
      const user = sessionStorage.getItem("user");
      setCurrentUser(user);
    }
  }, [isLoggedIn]);

  const handleUpdateBlog = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("cover_picture", image);
    formData.append("author", sessionStorage.getItem("user"));
    try {
      const res = await fetch(
        process.env.REACT_APP_BASE_API_URL + "blogposts/" + blog.id,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        const newBlogData = [...blogData];
        const index = newBlogData.findIndex((item) => item.id === blog.id);
        newBlogData[index] = data.data;
        setBlogData(newBlogData);
        alert("Blog updated successfully");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BASE_API_URL + "blogposts/" + id,
        {
          method: "DELETE",
        }
      );

      if (res.status === 204) {
        const newBlogData = blogData.filter((item) => item.id !== id);
        setBlogData(newBlogData);
        alert("Blog deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      <div className="w-full h-96 bg-white border border-gray-200 rounded-lg shadow flex flex-col">
        <div className="relative">
          <img
            className="rounded-t-lg h-40 w-full object-cover"
            src={`${process.env.REACT_APP_BASE_API_URL + blog.cover_picture}`}
            alt=""
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {blog.author}
          </div>
          {isLoggedIn && currentUser === blog.author && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded transform cursor-pointer hover:scale-125 transition duration-300 ease-in-out">
              <MdOutlineEdit
                className="cursor-pointer "
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {blog.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 flex-grow ">
            <span className="line-clamp-2">{blog.description}</span>
          </p>
          <div className="flex flex-row items-center justify-between">
            {isLoggedIn && currentUser === blog.author && (
              <div className="transform cursor-pointer hover:scale-125 transition duration-300 ease-in-out">
                <FaTrashCan
                  size={20}
                  className="text-red-500"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this blog?"
                      )
                    )
                      handleDeleteBlog(blog.id);
                  }}
                />
              </div>
            )}
            <Link
              to={`/blog?id=${encodeURIComponent(blog.id)}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 self-end mt-auto ml-auto"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="3xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit your blog
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                placeholder="Top 10 mobile phones in 2024"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput
                id="description"
                type="text"
                placeholder="Here are the top rated mobile phone of the year..."
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="content" value="Content" />
              </div>
              <textarea
                id="content"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                placeholder="Write your thoughts here..."
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                value={content}
                required
              ></textarea>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="picture" value="Modify Cover Picture" />
              </div>
              <input
                className="block w-full text-sm text-gray-500 placeholder-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="picture"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </div>
            <div className="w-full">
              <Button
                disabled={title === "" || description === "" || content === ""}
                onClick={() => {
                  setOpenModal(false);
                  setTitle("");
                  setDescription("");
                  setContent("");
                  setImage("");
                  handleUpdateBlog();
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BlogCard;
