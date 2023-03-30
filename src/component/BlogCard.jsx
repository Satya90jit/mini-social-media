import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import ScrollBtn from "./ScrollBtn";
import ErrorPage from "./ErrorPage";
import axios from "axios";

function BlogCard() {
  const [oneData, setOneData] = useState("");
  const [search, setSearch] = useState("");

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async (id) => {
    try {
      const response = await axios.post(`/api/v1/articles/${id}/like`);
      setIsLiked(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUnlike = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/articles/${id}/like`);
      setIsLiked(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`/api/v1/articles/${2}/like`);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikeStatus();
  }, []);
  
  const handleClick = async (e, elem) => {
    if (isLiked) {
      await handleUnlike(elem.id);
    } else {
      await handleLike(elem.id);
    }
  };

  const func1 = () => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/v1/articles?search=${search}`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let filterData = await response.json();
        setOneData(filterData);
        console.log(filterData);
      } catch (error) {}
    };
    getData();
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/v1/articles/`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const data = await response.json();
        setOneData(data);
      } catch (error) {}
    };
    fetchBlog();
  }, []);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Header search={search} setSearch={setSearch} func1={func1} />
        <ScrollBtn />
        <div className="bg-white  dark:bg-gray-900 ">
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
          />
          <div className="  bg-slate-100  lg:px-36 py-8">
            {oneData?.length === 0 ? (
              <ErrorPage />
            ) : (
              oneData?.map((elem, index) => {
                const date = new Date(elem.created_at);
                const formattedDate = date.toLocaleString();
                return (
                  <div className="container bg-white  px-10 py-5 mx-auto">
                    <div className="flex  items-center justify-center">
                      <div className="mt-8 lg:items-center">
                        <div className="mt-6 lg:w-full lg:mt-0  ">
                          <div className="flex items-center mt-6">
                            <img
                              className="object-cover object-center w-10 h-10 rounded-full"
                              src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                              alt=""
                            />
                            <div className="mx-4">
                              <h1 className="text-sm text-gray-700 dark:text-gray-200">
                                {elem.userName}
                              </h1>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formattedDate}
                              </p>
                            </div>
                          </div>
                          <p className="block mt-4 mb-4 text-2xl font-semibold text-gray-800  dark:text-white md:text-3xl">
                            {elem.title}
                          </p>
                        </div>
                        <img
                          className="object-cover w-full lg:w-full rounded-xl h-72 lg:h-96"
                          src={elem.image_url}
                          alt="blog image"
                        />
                        <div className="mt-6 lg:w-full lg:mt-0 ">
                          <p className="mt-10 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            {elem.body}
                          </p>
                        </div>
                        <hr className="h-1  lg:w-full mb-2 mt-6 "></hr>
                        <p className="text-gray-900 text-right">my Blog</p>
                        <hr className="h-1  lg:w-full mb-0 mt-4 "></hr>
                        <div className="mt-1 mb-8 flex justify-between h-auto items-center lg:w-full lg:mt-0 ">
                          <div className="mt-4">
                            <button className="text-left">view</button>
                            <button className="ml-5">comment</button>
                          </div>
                          <div  onClick={(e) => handleClick(e, elem)} className="mt-4 flex items-center cursor-pointer">
                            <button
                              className={`flex items-center ${
                                isLiked ? "text-red-500" : "text-black"
                              }`}
                              
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18.54l-.87-.79C4.67 13.28 2 10.41 2 7.5 2 4.42 4.42 2 7.5 2c1.93 0 3.7.94 4.5 2.37C12.8 2.94 14.57 2 16.5 2 19.58 2 22 4.42 22 7.5c0 2.91-2.67 5.78-7.13 10.25L10 18.54z"
                                  clipRule="evenodd"
                                />
                              </svg>{" "}
                            </button>
                              <span className="text-black mr-5">like</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <Footer />
      </motion.div>
    </>
  );
}
export default BlogCard;
