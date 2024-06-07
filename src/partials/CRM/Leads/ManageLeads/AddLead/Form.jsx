import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLead } from "../../../../../redux/store/LeadsStore/LeadSlice";

const Form = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    department: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to API
    dispatch(addLead(formData));
    console.log("Form submitted:", formData);
    setModalOpen(false);
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
          // value={formData.name}
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
            // value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-60  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className=" text-xl text-gray-500">
          Title:
          <input
            type="text"
            name="title"
            // value={formData.title}
            onChange={handleChange}
            required
            className="mt-1  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="w-20 text-xl text-gray-500">
          Department:
          <input
            type="text"
            name="department"
            // value={formData.dept}
            onChange={handleChange}
            required
            className="mt-1 w-60  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="w-20 text-xl text-gray-500">
          Status:
          <select
            name="status"
            // value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 ml-5 border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>
      <div className="mb-6">
        <label className=" text-xl text-gray-500">
          Role:
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        // onClick={handleSubmit}
        className="py-2 px-7 text-white bg-green-400 text-xl rounded-xl text-bold"
      >
        Add Lead
      </button>
    </form>
    // </div>
  );
};

export default Form;
