import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [loginAttribute, setLoginAtttribute] = useState({
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/dashboard");
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginAtttribute({
      ...loginAttribute,
      [name]: value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // axios
    //     .get("http://localhost:8080/user")
    //     .then((response) => {
    //         const users = response.data;
    //         const foundUser = users.find((user) => {
    //             return user.email === loginAttribute.email && user.password === loginAttribute.password;
    //         });

    //         if (foundUser) {
    //           localStorage.setItem("userId",foundUser.id);
    //             alert("Login successful...");
    //             navigate("/dashboard");
    //         } else {
    //             alert("Email or password is incorrect...");
    //         }
    //     })
    //     .catch((error) => {
    //         alert(error);
    //     });

    try{
      const response = await axios.post("http://localhost:8080/user/login",loginAttribute);
      console.log(response.data);
      localStorage.setItem("userId", response.data);
      alert("Login Successfull...");
      navigate("/dashboard");
    }catch(error){
      // alert(error.response.status == 401 ? "hello" : "" );
      if(error.response.status == 401){
        alert("Invalid email or password");
      }
    }
};

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-col">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-4xl font-medium title-font mb-4 text-gray-900">
              Login
            </h1>
            {/* <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep.
            </p> */}
          </div>
          <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div class="relative flex-grow w-full">
              <label for="email" class="leading-7 text-base text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="full-name"
                name="email"
                placeholder="name@company.com"
                onChange={onChangeHandler}
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative flex-grow w-full">
              <label for="password" class="leading-7 text-base text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="email"
                name="password"
                placeholder="********"
                onChange={onChangeHandler}
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button onClick={onSubmitHandler} class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Login
            </button>
          </div>
          <p className=" mx-auto my-4 text-xl">
            Don't have account?{" "}
            <Link to="/signup" className="text-blue-700 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
