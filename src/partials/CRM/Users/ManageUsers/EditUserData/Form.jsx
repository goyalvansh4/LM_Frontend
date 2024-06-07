import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../../../redux/store/UserStore/UserSlice";

const Form = ({setShowModal }) => {
  const user = useSelector((state) => state.setUserId);
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name ||"",
    email: user.email ||"",
    username: user.username ||"",
    phone: user.phone || "",
  });

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(formData));
    // console.log("Form submitted:", formData);
    setShowModal(false);
  };

  return (
    // <div className="ml-5 max-w-xs">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className=" text-xl text-gray-500">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 ml-5 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="text-xl w-40 text-gray-500">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-60  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className=" text-xl text-gray-500">
          UserName:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="w-20 text-xl text-gray-500">
          PhoneNo:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 w-60  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        // onClick={handleSubmit}
        className="py-2 px-7 text-white bg-green-400 text-xl rounded-xl text-bold"
      >
        Edit User
      </button>
    </form>
    // </div>
  );
};

export default Form;
