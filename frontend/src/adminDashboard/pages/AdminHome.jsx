import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="bg-[#000]">
      <div className="hero heading h-[50vh] md:h-[90vh] flex  flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold !mb-6 text-center text-[#fff]">
          Welcome to Admin Panel
        </h1>
      </div>
      <div className="!mt-12">
        <div className="flex flex-col md:flex-row gap-6 flex-wrap justify-center items-center !p-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-gray-400 rounded-2xl md:max-w-[20%] !mb-4 !min-h-[70vh] bg-gray-800"
            >
              {/* Blog Image */}
              <div className="img w-full !p-1">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="rounded-2xl w-full max-w-[100%] md:h-[30vh] min-w-[25%]"
                />
              </div>

              {/* Blog Content */}
              <div className="flex flex-col md:gap-4 text-center !px-2 min-h-[8rem]">
                <h3 className="text-[20px] text-[#fff] font-bold">
                  {blog.title}
                </h3>
                <p className="text-[15px] !text-[#fff]">
                  {blog.content.split(" ").length > 30
                    ? `${blog.content.split(" ").slice(0, 30).join(" ")}...`
                    : blog.content}
                </p>
                <p className="text-[15px] !text-[#fff]">
                  <b className=" font-bold">Author</b> : {blog.author}
                </p>
              </div>

              <div className="flex gap-2 justify-center !mt-2 !mb-2">
                <button
                  className="bg-gray-700 rounded-md !px-3 !py-1 text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-600 shadow-md hover:shadow-lg"
                  onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                >
                  Update
                </button>

                <button
                  className="bg-red-600 rounded-md !px-3 !py-1 text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-500 shadow-md hover:shadow-lg"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="text-white text-center !pb-2">No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
