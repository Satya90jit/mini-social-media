import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "./SignUp";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [print, setPrint] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
  
    const inToUp = () => {
      setPrint(false);
    };
  
  
    const submitUser = async (e) => {
      e.preventDefault();
      let hasError = false;
    
      if (!email.includes("@")) {
        setEmailError("Please enter a valid email address");
        hasError = true;
      }
    
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        hasError = true;
      }
    
      if (hasError) {
        return;
      }
    
      console.log(email, password);
      const user = new FormData();
      user.append("email", email);
      user.append("password", password);
      const resData = await fetch("/users/sign_in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      const userData = await resData.json();
      console.log(userData);
      if (userData.status.code !== 200) {
        console.log("invalid email or password");
        window.alert(userData.status.message);
      } else {
        window.alert(userData.status.message);
        navigate("/");
      }
  
      localStorage.setItem("token", resData.headers.get("Authorization"));
      
      localStorage.setItem("user", JSON.stringify(userData.status.data.id));
      var name = userData.status.data.email;
      var userName = name.replace(/@.*/, "");
      var noNumbername = userName.replace(/[0-9]/g, "");
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      var makefirstNameCaps = capitalizeFirstLetter(noNumbername);
      localStorage.setItem("userName", JSON.stringify(makefirstNameCaps));
    };
  
  return (
    <>
      <Navbar />
      {print ? (
      <section className="bg-slate-400 min-h-screen pb-10 flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl items-center p-5">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>
            <form encType="multipart/form-data" className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-lg border"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                  }}
              />
              <p className="text-red-600 ml-2 text-xs">{emailError}</p>

              <div className="relative">
                <input
                  className="p-2 rounded-lg border w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <p className="text-red-600 ml-2 text-xs">
                  {passwordError}
                </p>
              </div>

              <button
                onClick={submitUser}
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <button
                onClick={inToUp}
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                Register
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl h-full"
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb2clMjBzaWduJTIwdXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>
      ) : (
        <SignUp/>
      )}
    </>
  );
};

export default SignIn;
