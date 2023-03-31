import React, { useState } from "react";
import Navbar from "./Navbar";
import background from "./images/blog4.avif";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

function CreateBlogs() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImage_url] = useState("");

  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [imageError, setImageError] = useState("");

  const onImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    setImageError("");
  };

  const validate = () => {
    let titleError = "";
    let bodyError = "";
    let imageError = "";

    if (title.length < 30) {
      titleError = " A Title is required.";
    }

    if (body.length < 30) {
      bodyError = "Body must be at least 30 characters long.";
    }

    if (!image) {
      imageError = "An image is required.";
    }

    if (titleError || bodyError || imageError) {
      setTitleError(titleError);
      setBodyError(bodyError);
      setImageError(imageError);
      return false;
    }

    return true;
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const img_data = new FormData();
      img_data.append("file", image);
      img_data.append("upload_preset", "postimages");
      console.log("image", img_data);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgdnuhrfs/image/upload",
        {
          method: "post",
          body: img_data,
        }
      );
      const file = await response.json();
      const user_id = localStorage.getItem("user");
      const userName = localStorage.getItem("userName");

      console.log(title, body, image_url, user_id, userName);
      const data = {
        title,
        body,
        image_url: file.secure_url,
        user_id,
        userName,
      };
      const res = await fetch("/api/v1/articles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const articleData = await res.json();
      console.log(articleData);

      localStorage.setItem("existUser", JSON.stringify(articleData.user_id[0]));
      localStorage.setItem("article", JSON.stringify(articleData.id[0]));

      if (articleData.status.code == 200) {
        window.alert(articleData.status.message);
      } else {
        window.alert(articleData.status.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ width: 2 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1 } }}
    >
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
        className="min-h-screen sm:flex sm:flex-col sm:justify-center sm:items-center py-8 px-4 sm:py-16 md:py-24 lg:py-32"
      >
        <Navbar />
        <h1 className="text-center mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Explore yourself better
        </h1>
        <p className="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-4 md:px-16 lg:px-24 xl:px-48 dark:text-gray-400">
          Here you can create your blog
        </p>
        <div className="bg-white p-4 md:w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-slate-300 shadow-sm">
          <form action="">
            <div className="flex flex-col mb-4">
              <label
                className="text-left font-bold text-gray-600 mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError("");
                }}
                placeholder="Enter blog title"
                className="py-2 border-b-2 border-gray-400 focus:border-blue-800 text-gray-600 placeholder-gray-400 outline-none"
              />
              <p className="text-red-600 mt-2 text-xs">{titleError}</p>
            </div>

            <div className="flex flex-col mb-4">
              <label
                className="text-left font-bold text-gray-600 mb-2"
                htmlFor="body"
              >
                Description
              </label>
              <textarea
                type="text"
                name="body"
                onChange={(e) => {
                  setBody(e.target.value);
                  setBodyError("");
                }}
                placeholder="Enter blog description"
                className="overflow-y-scroll py-2 border-b-2 border-gray-400 text-gray-600 placeholder-gray-400"
              />
              <p className="text-red-600 mt-2 text-xs">{bodyError}</p>
            </div>

            <div className="flex flex-col mb-4">
              <label
                className="text-left font-bold text-gray-600 mb-2"
                htmlFor="image_url"
              >
                <span className="mr-2">
                  <i className="fas fa-image"></i>
                </span>
                Upload Image
              </label>
              <p className="text-gray-500 text-sm mb-2">
                Maximum file size is 5MB.
              </p>
              <input
                type="file"
                name="image_url"
                onChange={onImageChange}
                accept="image/*"
                className="hidden"
                id="image_url"
              />
              <label
                htmlFor="image_url"
                className="bg-slate-400 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-lg cursor-pointer"
              >
                Choose File
              </label>
              <p className="text-red-600 mt-2 text-xs">{imageError}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch sm:flex-wrap">
              <button
                onClick={saveUser}
                className="bg-yellow-400 hover:bg-cyan-700 text-black font-bold py-2 px-4 rounded-lg mb-2 sm:mb-0 sm:mr-2"
              >
                Post
              </button>

              <Link
                className="bg-cyan-800 hover:bg-orange-500 text-slate-100 font-bold py-2 px-4 rounded-r"
                to={`/blogs`}
              >
                Show post
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
export default CreateBlogs;
