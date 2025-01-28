import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AdminNavbar from "./adminDashboard/components/AdminNavbar";
import AdminFooter from "./adminDashboard/components/AdminFooter";
import AdminHome from "./adminDashboard/pages/AdminHome";
import AdminBlogs from "./adminDashboard/pages/AdminBlogs";
import AddBlog from "./adminDashboard/pages/AddBlog";

function App() {
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
        { path: "/admin", element: <AdminHome /> },
        { path: "/admin/blogs", element: <AdminBlogs /> },
        { path: "/admin/add-blog", element: <AddBlog /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
