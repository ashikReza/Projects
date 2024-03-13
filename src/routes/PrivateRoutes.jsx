// import { useAuth } from "../hooks/useAuth";
// import { Navigate, Outlet } from "react-router-dom";

// import Header from "../components/common/Header";

// import ProfileProvider from "../providers/ProfileProvider";
// import BlogsProvider from "../providers/BlogsProvider";

// import { SingleBlogProvider } from "../context/SingleBlogContext.jsx";

// export default function PrivateRoutes() {
//   const { auth } = useAuth();

//   // Check if auth exists and auth.user exists before rendering the Outlet
//   if (!auth || !auth.user) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <BlogsProvider>
//       <ProfileProvider>
//         <Header />
//         <SingleBlogProvider>
//           <Outlet />
//         </SingleBlogProvider>
//       </ProfileProvider>
//     </BlogsProvider>
//   );
// }

// PrivateRoutes.js
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";
import BlogsProvider from "../providers/BlogsProvider";
import { SingleBlogProvider } from "../context/SingleBlogContext.jsx";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  console.log(auth.user);

  // Check if user is authenticated and extract user's name
  const isAuthenticated = !!auth;

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <BlogsProvider>
      <ProfileProvider>
        <Header />
        <SingleBlogProvider>
          <Outlet />
        </SingleBlogProvider>
      </ProfileProvider>
    </BlogsProvider>
  );
}
