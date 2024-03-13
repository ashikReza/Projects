/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Footer from "../components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import LogoutTimeHeader from "../components/LogoutTimeHeader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for controlling the loading animation

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      setLoading(true); // Show loading animation
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setAuth(user);

      console.log(auth);
      toast.success("Login successful.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      console.error(error.message);
    } finally {
      setLoading(false); // Hide loading animation after login attempt
    }
  };

  return (
    <>
      <LogoutTimeHeader />

      <div className="w-full h-screen bg-[#030317] flex flex-col justify-center ">
        <section className="container mx-auto bg-[#030317] flex justify-center ">
          {/* <!-- Login Form into a box center of the page --> */}
          <div className=" md:w-1/2 mx-auto bg-[#030317] text-white p-6 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
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
                    type="button"
                    className=" absolute right-0 top-0 bottom-0 w-12 flex justify-center items-center"
                    onClick={togglePassword}
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
                  className={`w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Logging..." : "Login"}
                </button>
              </div>
              <p className="text-center">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-indigo-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
