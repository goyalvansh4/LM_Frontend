import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "../../../../../redux/store/LeadsStore/LeadSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const Form = ({ setModalOpen}) => {
  const userStoreData = useSelector((state) => state.userStore);
  const [userData, setUserData] = useState(userStoreData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    department: "",
    assign: "",
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
    toast.success("Lead Added Successfully");
    setModalOpen(false);
    setUserData(userStoreData);
    
  };

  return (
    // <div className="ml-5 max-w-xs">
    <>
    <form
      onSubmit={handleSubmit}
      className=  "w-100 flex flex-col bg-white shadow-md rounded pt-6 pb-8 mb-4"
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
        <label className="text-xl  text-gray-500">
          Email:
          </label>
          <input
            type="email"
            name="email"
            // value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-60  ml-5 border-gray-300 rounded-md shadow-sm"
          />
      </div>
      <div className="mb-6">
        <label className=" text-xl text-gray-500">
          Title:
        </label>
          <input
            type="text"
            name="title"
            // value={formData.title}
            onChange={handleChange}
            required
            className="mt-1  ml-5 border-gray-300 rounded-md shadow-sm"
          />
        
      </div>
      <div className="mb-6">
        <label className="text-xl text-gray-500">
          Dept:
        </label>
          <input
            type="text"
            name="department"
            // value={formData.dept}
            onChange={handleChange}
            required
            className="mt-1 w-60  ml-5 border-gray-300 rounded-md shadow-sm"
          />
      </div>
      <div className="mb-6">
        <label htmlFor="status" className="w-20 text-xl text-gray-500">
          Status:
        </label>
          <select
            name="status"
            // value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 w-60 ml-5 border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        
      </div>
      <div className="mb-6">
        <label htmlFor="assign" className=" text-xl text-gray-500">
          Assign:
        </label>
        <select
            name="assign"
            // value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 w-60 ml-5 border-gray-300 rounded-md shadow-sm"
          >
          <option value="">Select User</option>
           {userData.map((user) => {
            return (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            );
           })}
        </select>
      </div>
      <button
        type="submit"
        // onClick={handleSubmit}
        className="py-2 px-7 text-white bg-green-400 text-xl rounded-xl text-bold"
      >
        Add Lead
      </button>
    </form>
    {/* <ToastContainer autoClose={1000} /> */}
    </>
    // </div>
  );
};

export default Form;
