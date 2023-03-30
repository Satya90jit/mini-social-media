import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import { useLocation } from "react-router";

import { AnimatePresence } from "framer-motion";
import Registration from "./Registration";
import AboutUs from "./AboutUs";
import CreateBlogs from "./CreateBlogs";
import BlogCard from "./BlogCard";

const AnimatedRoute = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<Registration/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/createBlog" element={<CreateBlogs/>} />
        <Route path="/blogs" element={<BlogCard/>} />


       
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoute;
