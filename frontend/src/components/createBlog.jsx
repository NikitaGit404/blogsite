import React from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useGlobalStore } from "../zustand/store";
import { IoMdAddCircle } from "react-icons/io";

const CreateBlog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const { isLoggedIn, blogData, setBlogData } = useGlobalStore(
    (state) => state
  );

  const handleCreateBlog = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("cover_picture", image);
    else {
      try {
        const response = await fetch("blog2.jpg"); // Adjust this path according to your public folder structure
        const blob = await response.blob();
        formData.append("cover_picture", blob, "blog2.jpg");
      } catch (error) {
        console.error("Error fetching default image:", error);
      }
    }
    formData.append("author", sessionStorage.getItem("user"));

    try {
      const res = await fetch(process.env.REACT_APP_BASE_API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.status === 201) {
        console.log("data", data.data);
        const newBlogData = [...blogData];
        newBlogData.push(data.data);
        setBlogData(newBlogData);
        alert("Blog created successfully");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <Button
          className="flex items-center justify-center space-x-2"
          onClick={() => setOpenModal(true)}
        >
          <span>Create</span>
          <IoMdAddCircle className="w-5 h-5 ml-0.5" />
        </Button>
      )}
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
              Create your own blog
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
                required
              ></textarea>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="picture" value="Cover Picture" />
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
                  handleCreateBlog();
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateBlog;
