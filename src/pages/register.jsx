/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { toast } from "react-toastify";
import LogoutTimeHeader from "../components/LogoutTimeHeader";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "../components/common/Footer";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Track registration process

  const togglePassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      setIsRegistering(true); // Set state to indicate registration process started
      const { firstName, lastName, email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      toast.success("Registration successful.");
      setIsRegistering(false); // Set state to indicate registration process completed
      navigate("/login");
    } catch (error) {
      console.error(error);
      setIsRegistering(false); // Set state to indicate registration process completed
      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "Email is already in use. Please use a different email.",
        });
      } else {
        setError("root.random", {
          type: "random",
          message: `Something went wrong: ${error.message}`,
        });
      }
    }
  };

  return (
    <>
      <LogoutTimeHeader />

      <div className="w-full h-screen bg-[#030317] flex flex-col justify-center">
        <section className="container mx-auto bg-[#030317] flex justify-center ">
          <div className=" md:w-1/2 mx-auto bg-[#030317] text-white p-6 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-6">
                <label htmlFor="firstName" className="block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.firstName ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="lastName" className="block mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.lastName ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email is invalid",
                    },
                  })}
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.email ? "border-red-500" : "border-white/20"
                  } rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.password ? "border-red-500" : "border-white/20"
                    } rounded-md focus:outline-none focus:border-indigo-500`}
                  />
                  <button
                    type="button" // Add type="button" to prevent default form submission behavior
                    className=" absolute right-0 top-0 bottom-0 w-12 flex justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from propagating to the form
                      togglePassword();
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isRegistering} // Disable button during registration process
                  className={`w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200 ${
                    isRegistering && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isRegistering ? "Registering..." : "Register"}
                </button>
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>

      <Footer/>
    </>
  );
}
