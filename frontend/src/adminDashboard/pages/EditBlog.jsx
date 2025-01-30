import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = ({ blogs, setBlogs }) => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  // Convert ID to number and find the blog
  const blogToEdit = blogs.find((blog) => blog.id === parseInt(id));

  // Handle case where blog is not found
  if (!blogToEdit) {
    return <h2 className="text-center text-red-500">Blog not found!</h2>;
  }

  const [editedBlog, setEditedBlog] = useState({ ...blogToEdit });

  // Update function
  const handleUpdate = (e) => {
    e.preventDefault();
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === editedBlog.id ? editedBlog : blog))
    );
    navigate("/admin"); // Redirect back to AdminBlogs after update
  };

  return (
    <div className="main bg-[#1e3a4c] !p-4 flex flex-col items-center w-full">
      <div className="!p-6 bg-[#092734] border border-[#51afb2] text-white mt-4 w-full md:w-[35%] mx-auto rounded-3xl shadow-md">
        <h2 className="text-center text-xl mb-4 text-white font-bold">
          Edit Blog
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="form-content flex flex-col gap-4">
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={editedBlog.title}
                onChange={(e) =>
                  setEditedBlog({ ...editedBlog, title: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="content">
                Content:
              </label>
              <textarea
                value={editedBlog.content}
                id="content"
                onChange={(e) =>
                  setEditedBlog({ ...editedBlog, content: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                rows="5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="url">
                Image URL:
              </label>
              <input
                type="text"
                id="url"
                value={editedBlog.image}
                onChange={(e) =>
                  setEditedBlog({ ...editedBlog, image: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="author">
                Author:
              </label>
              <input
                type="text"
                id="author"
                value={editedBlog.author}
                onChange={(e) =>
                  setEditedBlog({ ...editedBlog, author: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                required
              />
            </div>
            <div className="btns w-full flex gap-4 justify-center">
              <button
                type="submit"
                className="bg-[#51afb2] !px-4 !py-2 rounded hover:bg-[#3a8d90] cursor-pointer"
              >
                Update Blog
              </button>
              <button
                type="button"
                className="ml-2 bg-red-500 !px-4 !py-2 rounded hover:bg-red-700 cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
