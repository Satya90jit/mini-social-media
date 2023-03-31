import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import ScrollBtn from "./ScrollBtn";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import LikeButton from "./LikeButton";

function BlogCard() {
  const [oneData, setOneData] = useState("");
  const [search, setSearch] = useState("");

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
          <div className="  bg-slate-100  lg:px-36 ">
            {oneData?.length === 0 ? (
              <ErrorPage />
            ) : (
              oneData?.map((elem, index) => {
                const date = new Date(elem.created_at);
                const formattedDate = date.toLocaleString();
                return (
                  <div className="container bg-white h-[100%]  px-10 py-5 mx-auto">
                    <div className="flex h-[100%] items-center px-[15%] mobile:p-0 justify-center">
                      <div className="mt-8 h-[100%] lg:items-center">
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
                          <p className="block mt-4 mb-4 text-2xl font-sans text-gray-800  dark:text-white md:text-3xl">
                            {elem.title}
                          </p>
                        </div>
                        <div className="w-full border overflow-hidden mobile:h-[30vh] h-[50vh]">
                          <img
                            className="object-cover w-full lg:w-full rounded-xl !h-full"
                            src={elem.image_url}
                            alt="blog image"
                          />
                        </div>
                        <div className="mt-6 lg:w-full lg:mt-0 ">
                          <p className="mt-10 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            {elem.body}
                          </p>
                        </div>
                        <hr className="h-1  lg:w-full mb-2 mt-6 "></hr>
                        <p className="text-gray-900 text-right">my Blog</p>
                        <hr className="h-1  lg:w-full mb-0 mt-4 "></hr>
                        <div className="mt-1 mb-8 flex justify-between h-auto items-center lg:w-full lg:mt-0">
                          <div className="mt-4 flex items-center">
                            <button className="text-left flex items-center">
                              <svg
                                className="w-5 h-5 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                              </svg>
                              <span className="hidden lg:flex mr-1">View</span>
                              <span className="bg-gray-400 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                                1
                              </span>
                            </button>

                            <button className="ml-5 flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                />
                              </svg>
                              <span className="hidden lg:flex">Comment</span>
                            </button>
                          </div>
                          <div className="mt-4 flex items-center cursor-pointer">
                            <LikeButton
                              articleId={elem.id}
                              userId={elem.user_id}
                            />
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
