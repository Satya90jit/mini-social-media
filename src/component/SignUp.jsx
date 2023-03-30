import React, { useState } from "react";
import Navbar from "./Navbar";
import SignIn from "./SignIn";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    const UpToIn = () => {
      setLogin(false);
    };
  
    const createAccount = async (e) => {
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
      console.log("formdata ", user);
      const resp = await fetch("/users", {
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

      const userData = await resp.json();
      console.log(userData);
  
      if (userData.status.code !== 200) {
        window.alert(userData.status.message);
      } else {
        window.alert(userData.status.message);
        UpToIn();
      }
    };
  
  return (
    <>
      <Navbar />
      {/* // style={{ backgroundImage: `url('${post.featuredImage.url}')` }} */}
      {login ? (
      <section className="bg-slate-400 min-h-screen pb-10 flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-max items-center p-5">
          <div className="md:w-1/2 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              Register if you don't have an account
            </p>
            <form encType="multipart/form-data" className="flex flex-col gap-4">
              <input
                className="p-2 rounded-lg  "
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                
              />
              <p className="text-red-600 ml-2 text-xs">{emailError}</p>


              <div className="relative">
                <input
                  className="p-2 rounded-lg  w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  
                />
              <p className="text-red-600 ml-2 text-xs">{passwordError}</p>

              </div>

              <button
                 onClick={createAccount}
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Register
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Have an account?</p>
              <button
                onClick={UpToIn}
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                Log In
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl h-full"
              src="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMHJlZ2lzdHJhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>
      ) : (
            <SignIn/>
          )}
    </>
  );
};

export default SignUp;
