import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AdminNavbar from "./adminDashboard/components/AdminNavbar";
import AdminFooter from "./adminDashboard/components/AdminFooter";
import AdminHome from "./adminDashboard/pages/AdminHome";
import EditBlog from "./adminDashboard/pages/EditBlog";
import AddBlog from "./adminDashboard/pages/AddBlog";
import AdminUsers from "./adminDashboard/pages/AdminUsers";

function App() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg",
      title: "First Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "jon",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9NxVa2mbygkogxqj0VCfaBmAYTj6ZBCsiEA&s",
      title: "Second Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "bob",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_QT9kvgpcVvrp_SX0RQbfjtDv0pbq1gOKLw&s",
      title: "Third Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "stev",
    },
    {
      id: 4,
      image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg",
      title: "Four Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "peter",
    },
    {
      id: 5,
      image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg",
      title: "Four Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "peter",
    },
    {
      id: 6,
      image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg",
      title: "Four Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "peter",
    },
    {
      id: 7,
      image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg",
      title: "Four Blog Post",
      content:
        "This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post. This is the content of the first blog post.",
      author: "peter",
    },
  ]);

  const MainLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };
  const AdminLayout = () => {
    return (
      <>
        <AdminNavbar />
        <Outlet />
        <AdminFooter />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/services", element: <Services /> },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminHome blogs={blogs} setBlogs={setBlogs} />,
        },
        { path: "/admin/users", element: <AdminUsers /> },
        {
          path: "/admin/blogs/edit/:id",
          element: <EditBlog blogs={blogs} setBlogs={setBlogs} />,
        },
        {
          path: "/admin/add-blog",
          element: <AddBlog blogs={blogs} setBlogs={setBlogs} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
