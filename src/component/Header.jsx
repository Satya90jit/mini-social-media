import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ search, setSearch, func1 }) {
  const [item, setItems] = useState({
    family: "family",
    lifestyle: "lifestyle",
    food: "food",
  });

  return (
    <>
      <header>
        <div
          className="w-full bg-cover bg-center"
          style={{
            height: "15rem",
            backgroundImage:
              "url(https://img.freepik.com/free-photo/calathea-orbifolia-natural-leaves-background_53876-129663.jpg?w=826&t=st=1671094391~exp=1671094991~hmac=4edefd71ff9c75ca4aa56ca4f76d9bffd1ebfc44e4765e52eebc02255834e381",
          }}
        >
          <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
                Build Your new{" "}
                <span className="underline text-blue-400">Blog</span>
              </h1>
              <span className=" ">
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  func1={func1}
                />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
