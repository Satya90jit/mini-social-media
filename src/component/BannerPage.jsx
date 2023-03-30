import React from 'react'

const BannerPage = () => {
  return (
    <>
      <div className="min-h-screen ">
        <article
          className="relative w-full min-h-screen  bg-cover bg-center group rounded-lg overflow-hidden  "
          style={{
            backgroundImage:
              'url("https://st2.depositphotos.com/4107269/7705/i/600/depositphotos_77053627-stock-photo-journalist-working-on-his-new.jpg")',
            height: "450px",
          }}
        >
          <div className="absolute  inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out" />
          <div className="relative  w-full h-full px-4 sm:px-6 lg:px-4">
            <h3 className="text-left text-2xl sm:text-gray-800  font-medium mt-40 ml-20">
              <a
                className="text-white text-4xl   font-bold text-center"
                href="#"
              >
                <span className="absolute inset-0" />
                Welcome to Your Blog
              </a>
            </h3>
            <p
              style={{ maxWidth: "900px" }}
              className=" mt-10 ml-20 text-white text-2xl font-light text-left"
            >
              Blogging is good for your career. A well-executed blog sets you{" "}
              <br />
              apart as an expert in your field. <br />
              <br />
            </p>
            <span className="ml-20 text-white">
              Select the blog category you want to explore...
            </span>
          </div>
          <div className="z-50 absolute top-96 left-24">
            
          </div>
          <button className="absolute top-0 left-0 z-50">Create Blogs</button>
        </article>
      </div>
    </>
  )
}

export default BannerPage