import { useEffect } from "react";
import "./App.css";
import NavigationBar from "./components/navbar";
import { useGlobalStore } from "./zustand/store";
import Home from "./components/home";
import About from "./components/about";
import MyBlogs from "./components/myBlogs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogDetails from "./components/blogDetails";

function App() {
  const { setIsLoggedIn } = useGlobalStore((state) => state);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    // <>
    //   <NavigationBar />
    //   <Home></Home>
    // </>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/blog" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
