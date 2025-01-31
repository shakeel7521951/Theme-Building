import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const navigate = useNavigate();

  // Sample user data (Replace this with actual API data if needed)
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", email: "ali.khan@example.com", role: "user" },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      role: "admin",
    },
    {
      id: 3,
      name: "Usman Raza",
      email: "usman.raza@example.com",
      role: "user",
    },
    {
      id: 4,
      name: "Aisha Noor",
      email: "aisha.noor@example.com",
      role: "admin",
    },
    {
      id: 5,
      name: "Zain Malik",
      email: "zain.malik@example.com",
      role: "user",
    },
  ]);

  // Handle Role Update (Toggle between "user" and "admin")
  const handleUpdateRole = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  // Handle User Deletion
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="bg-[#000] min-h-screen !p-6">
      <div className="flex flex-col gap-2 !py-2 items-center">
        <h1 className=" text-white text-[20px] !mb-4">Admin Users Panel</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1c1d1e] text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="!py-2 !px-4 text-[#fff]">ID</th>
              <th className="!py-2 !px-4 text-[#fff]">Name</th>
              <th className="!py-2 !px-4 text-[#fff]">Email</th>
              <th className="!py-2 !px-4 text-[#fff]">Role</th>
              <th className="!py-2 !px-4 text-[#fff]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border-b border-gray-800"
                >
                  <td className="!py-2 !px-4">{user.id}</td>
                  <td className="!py-2 !px-4 text-nowrap">{user.name}</td>
                  <td className="!py-2 !px-4">{user.email}</td>
                  <td className="!py-2 !px-4">{user.role}</td>
                  <td className="!py-2 !px-4 flex justify-center gap-2">
                    <button
                      className="bg-gray-700 rounded-md !px-3 !py-1 text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-600 shadow-md hover:shadow-lg"
                      onClick={() => handleUpdateRole(user.id, user.role)}
                    >
                      Update Role
                    </button>
                    <button
                      className="bg-red-600 rounded-md !px-3 !py-1 text-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-500 shadow-md hover:shadow-lg"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="!py-4 text-center">
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
