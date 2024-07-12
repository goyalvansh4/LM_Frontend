import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchUserData from "./FetchUserData/FetchUserData";
import moment from "moment";
import { RiDeleteBinFill } from "react-icons/ri";
import GlobalAxios from "../../../Global/GlobalAxios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const UserRowContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    refreshUserData();
  }, []);

  const refreshUserData = () => {
    setLoading(true);
    FetchUserData()
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleUserModal = (id) => {
    setUserId(id);
    document.getElementById("my_modal_7").showModal();
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await GlobalAxios.delete(`/admin/users/${id}`);
      if (response.data.status === "success") {
        document.getElementById("my_modal_7").close();
        toast.success("User deleted successfully!");
        refreshUserData();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user!");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 items-center">
      {loading ? (
        <HashLoader color="#4A90E2" size={50} />
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-700 dark:to-gray-600 text-white">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                S.No
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                Phone No
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                Assign Lead
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                Created On
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase border-b border-gray-200 dark:border-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase border-b border-gray-200 dark:border-gray-700">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
                      {user.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  {user.mobile}
                </td>
                <td className="px-4 py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium leading-4 text-white bg-blue-500 rounded-full dark:bg-blue-600 dark:text-gray-100">
                    {user.assign_lead_count}
                  </span>
                </td>
                <td className="px-6 text-center py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  {moment(user.createdAt).format("D - MMMM - YYYY")}
                </td>
                <td className="px-6 py-4 text-sm leading-5 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {user.status === "active" ? (
                    <span className="text-center inline-flex items-center px-3 justify-center py-1 text-xs font-medium leading-4 text-white bg-green-500 rounded-full dark:bg-green-600 dark:text-gray-100">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex text-center items-center px-3 py-1 text-xs justify-center font-medium leading-4 text-white bg-red-500 rounded-full dark:bg-red-600 dark:text-gray-100">
                      Not Active
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm flex flex-col gap-2 font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleEditClick(user.id)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleUserModal(user.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <dialog
        id="my_modal_7"
        className="modal modal-bottom sm:modal-middle rounded-3xl"
      >
        <div className="modal-box py-12 flex flex-col gap-4 justify-center px-8 dark:bg-gray-800 dark:text-gray-200">
          <h3 className="font-bold flex justify-center">
            <RiDeleteBinFill className="text-red-400 text-6xl text-center" />
          </h3>
          <p className="text-center">Are you sure</p>
          <p className="text-center">Do you really want to delete this user?</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex justify-center gap-4 items-center"
            >
              <button className="px-4 py-2 bg-white text-black rounded-xl border-2 dark:bg-gray-700 dark:text-gray-300">
                Close
              </button>
              <button
                onClick={() => handleDeleteUser(userId)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl border-2"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserRowContainer;
