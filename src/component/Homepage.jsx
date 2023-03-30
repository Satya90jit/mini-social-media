import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollBtn from "./ScrollBtn";
import { motion } from "framer-motion";
import BannerPage from "./BannerPage";
import BlogCard from "./BlogCard";
import Header from "./Header";

function HomePage() {

  return (
    <>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Navbar/>
        <ScrollBtn/>
        <BannerPage/>
        <Footer/>
        

      </motion.div>
    </>
  );
}
export default HomePage;
