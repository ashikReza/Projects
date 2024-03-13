import Footer from "../components/common/Footer";

import { motion } from "framer-motion";

import SingleBlogsContent from "../components/single blog/SingleBlogsContent.jsx";

export default function SingleBlog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <SingleBlogsContent />

      <Footer />
    </motion.div>
  );
}
