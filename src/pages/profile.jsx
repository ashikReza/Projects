/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile.js";
import { actions } from "../actions";
import { motion } from "framer-motion";

import useToken from "../hooks/useToken";
import { useAuth } from "../hooks/useAuth";

import Load from "../assets/load-loading.gif";

import ProfileImg from "../components/profile/ProfileImg.jsx";
import ProfileBio from "../components/profile/ProfileBio.jsx";
import ProfileBlogs from "../components/profile/ProfileBlogs.jsx";

import { useParams } from "react-router-dom";

export default function Profile() {
  const { state, dispatch } = useProfile();

  const { api } = useToken();
  const { auth } = useAuth();
  const { id } = useParams();

  if (state?.loading) {
    return (
      <div className="w-full h-screen flex justify-center ">
        <img src={Load} alt="Loading..." className="" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-black w-full py-10"
    >
      <div className="container mx-auto ">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 px-4 text-center">
          {/* <!-- profile image --> */}
          <ProfileImg />

          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {auth.user.displayName}
            </h3>
            <p className="leading-[231%] lg:text-lg text-white">
              {auth.user.email}
            </p>
          </div>

          {/* <!-- bio --> */}
          <ProfileBio />
        </div>
        {/* <ProfileInfo /> */}
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 px-4 text-xl lg:mt-8 lg:text-2xl text-white">
          Your Blogs
        </h4>
        {/* <!-- Blog Card Start --> */}
        <ProfileBlogs />
        {/* <!-- Blog Card End --> */}
      </div>
    </motion.div>
  );
}
