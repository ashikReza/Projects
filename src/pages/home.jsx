/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import Footer from "../components/common/Footer";

// import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import BlogsContent from "../components/blog feed/BlogsContent.jsx";

import PopularBlogs from "../components/blog feed/PopularBlogs.jsx";
import FavoriteBlogs from "../components/blog feed/FavoriteBlogs.jsx";

export default function Home() {
  // const { auth } = useAuth();
  // console.log(auth);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <section className="w-full bg-[#030317] px-4 pt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {/* <!-- Blog Contents --> */}
            <BlogsContent />

            {/* <!-- Sidebar --> */}
            <div className="md:col-span-2 h-full w-full space-y-5">
              <PopularBlogs />

              <FavoriteBlogs />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}
