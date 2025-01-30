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
    <div className="bg-[#092734] min-h-screen !p-6">
      <div className="flex flex-col gap-2 !py-2 items-center">
        <h1 className=" text-[#51afb2] text-[20px]">Admin Users Panel</h1>
        <button
          className="bg-[#51afb2] text-[#1f4545] !px-4 !py-2 rounded hover:bg-[#3a8d90] cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          Back to Admin Panel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1c1d1e] text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#51afb2] text-white">
              <th className="!py-2 !px-4 text-[#1f4545]">ID</th>
              <th className="!py-2 !px-4 text-[#1f4545]">Name</th>
              <th className="!py-2 !px-4 text-[#1f4545]">Email</th>
              <th className="!py-2 !px-4 text-[#1f4545]">Role</th>
              <th className="!py-2 !px-4 text-[#1f4545]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border-b border-[#51afb2]"
                >
                  <td className="!py-2 !px-4">{user.id}</td>
                  <td className="!py-2 !px-4 text-nowrap">{user.name}</td>
                  <td className="!py-2 !px-4">{user.email}</td>
                  <td className="!py-2 !px-4">{user.role}</td>
                  <td className="!py-2 !px-4 flex justify-center gap-2">
                    <button
                      className="bg-[#51afb2] !px-4 !py-2 rounded hover:bg-[#3a8d90] cursor-pointer text-nowrap"
                      onClick={() => handleUpdateRole(user.id, user.role)}
                    >
                      Update Role
                    </button>
                    <button
                      className="ml-2 bg-red-500 !px-4 !py-2 rounded hover:bg-red-700 cursor-pointer"
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
