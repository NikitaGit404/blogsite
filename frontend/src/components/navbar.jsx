import React from "react";
import { Navbar } from "flowbite-react";
import CreateBlog from "./createBlog";
import Login from "./login";
import { Link } from "react-router-dom";
import { useGlobalStore } from "../zustand/store";

const NavigationBar = () => {
  const { isLoggedIn } = useGlobalStore((state) => state);
  return (
    <Navbar fluid className="bg-slate-900 text-white">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold mx-2">
          BlogSite
        </span>
      </Navbar.Brand>
      <div className="flex gap-2 md:order-2 mx-2">
        <CreateBlog />
        <Login />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/about" className="text-white">
          About
        </Link>
        {isLoggedIn && (
          <Link to="/myblogs" className="text-white">
            My Blogs
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
