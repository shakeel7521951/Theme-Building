import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="bg-[#000]">
      <div className="hero heading h-[100vh] flex  flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold !mb-6 text-center text-[#fff]">
          Welcome to Admin Panel
        </h1>
      </div>
      <div className="">
        <div className="flex flex-col md:flex-row gap-4 flex-wrap justify-center items-center !p-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-[#51afb2] rounded md:max-w-[25%] !mb-4 !min-h-[50vh] bg-[#000]"
            >
              {/* Blog Image */}
              <div className="img w-full !p-1">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="rounded w-full max-w-[100%] md:h-[30vh] min-w-[25%]"
                />
              </div>

              {/* Blog Content */}
              <div className="flex flex-col text-center !px-2 min-h-[8rem]">
                <h3 className="text-[20px] text-[#51afb2]">{blog.title}</h3>
                <p className="text-[15px] !text-[#ffffff]">
                  {blog.content.split(" ").length > 30
                    ? `${blog.content.split(" ").slice(0, 30).join(" ")}...`
                    : blog.content}
                  {/* {blog.content.length === 0 && <p>No Card Content</p>} */}
                </p>
                <p className="text-[15px] !text-[#ffffff]">
                  <b className=" text-[#51afb2]">Author</b> : {blog.author}
                </p>
              </div>

              <div className="flex gap-2 justify-center !mt-2 !mb-2">
                <button
                  className="bg-[#51afb2] rounded !px-1 !py-[2px] text-[#1f4545] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#3a8d90] hover:scale-105 shadow-md hover:shadow-lg"
                  onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                >
                  Update
                </button>

                <button
                  className="bg-[#ff2359] rounded !px-1 !py-[2px] text-[#ffffff] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#d91e4d] hover:scale-105 shadow-md hover:shadow-lg"
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
