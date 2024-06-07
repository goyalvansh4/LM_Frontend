import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../../redux/store/UserStore/SetUserSlice";
import { deleteUser } from "../../../redux/store/UserStore/UserSlice";


const UserRowContainer = ({setShowModal}) => {
  const userStoreData = useSelector((state) => state.userStore);
  const [userData,setUserData]=useState(userStoreData);
  const dispatch = useDispatch();
  const handleEditClick = (userId) => {
    const editUser = userData.filter((user) => user.id === userId);
    console.log(userId);
    dispatch(setUserId(editUser[0]));
    setShowModal(true);
    setUserData(userStoreData);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    setUserData(userStoreData);
  }
  return (
    <>
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Name
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
             UserName
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Email
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            PhoneNo
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
        </tr>
      </thead>
      <tbody className="bg-white">
      {userStoreData.map((user) => (
        <tr key={user.id}>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {user.name}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {user.username}
                </div>
              </div>
            </div>
          </td>

          <td className=" text-xl px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {user.email}
                </div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
            {user.phone}
          </td>

          <td className="px-6 py-4 text-sm flex flex-col gap-2 font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
            <button onClick={() => handleEditClick(user.id)}  className="text-indigo-600 hover:text-indigo-900">
              Edit
            </button>
            <button onClick={() => handleDeleteUser(user.id)}    className="text-red-600 hover:text-red-900">
              Delete
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  );
};

export default UserRowContainer;
