import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LogOutPage from "./LogOutPage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const user_id = localStorage.getItem("user");
  const active = user_id;

  const navigate = useNavigate();

  function handleCreateBlogClick() {
    if (active) {
      navigate("/createBlog");
    } else {
      const result = window.confirm("Please login to create a blog.");
      if (result) {
        navigate("/loginpage");
      }
    }
  }

  return (
    <Disclosure
      as="nav"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/03/36/00/98/360_F_336009887_yI4fLOqWbm8rNLCCIgmCuR3XY1caADIy.jpg')`,
      }}
      className=" w-full shadow-lg shadow-slate-600 fixed top-0 z-50 "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12  items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://i.pinimg.com/564x/b7/ca/6e/b7ca6e0493884d85fea192863f8be220.jpg"
                    alt="Your Company"
                  /> */}
                  <a href="javascript:void(0)">
                    <h2 className="text-2xl font-bold text-white">
                      My <span className="text-green-500">Blog</span>
                    </h2>
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block mr-10">
                  <div className="flex space-x-4">
                    <Link
                      to={`/`}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to={`/blogs`}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Blogs
                    </Link>
                    <button
                      onClick={handleCreateBlogClick}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium"
                    >
                      CreateBlogs
                    </button>
                    <Link
                      to={`/aboutUs`}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white
                          px-3 py-2 rounded-md text-sm font-medium"
                    >
                      AboutUs
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {active ? (
                  " "
                ) : (
                  <Link
                    to={`/loginpage`}
                    type="button"
                    className="px-4 py-1 mr-5 rounded-l-lg text-white m-0 bg-lime-600 hover:bg-red-600 transition"
                  >
                    Register
                  </Link>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex items-center mr-4 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>

                      <img
                        className="hidden h-8 w-auto lg:block rounded-full"
                        src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg"
                        alt="Your Company"
                      />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 ml-1 text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/aboutpage`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <LogOutPage />
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                to={`/`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white
                    block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to={`/blogs`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white
                    block px-3 py-2 rounded-md text-base font-medium"
              >
                Blogs
              </Link>
              <button
                onClick={handleCreateBlogClick}
                className="text-gray-300 hover:bg-gray-700 hover:text-white
                    block px-3 py-2 rounded-md text-base font-medium"
              >
                CreateBlogs
              </button>
              <Link
                to={`/aboutUs`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white
                    block px-3 py-2 rounded-md text-base font-medium"
              >
                AboutUs
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
export default Navbar;
