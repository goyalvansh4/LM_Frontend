import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { editLead } from "./leadSlice"; // Import the editLead action
import { editLead } from "../../../../../redux/store/LeadsStore/LeadSlice";

const Form = ({ setShowModal}) => {
   
   const lead = useSelector((state) => state.setLeadId);
    const userStoreData = useSelector((state) => state.userStore);
    const [userData, setUserData] = useState(userStoreData);
  const [formData, setFormData] = useState({
    id: lead.id,
    name: lead.name || "",
    email: lead.email || "",
    title: lead.title || "",
    department: lead.department || "",
    assign: lead.assign || "",
    status: lead.status || "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (lead) {
      setFormData({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        title: lead.title,
        department: lead.department,
        assign: lead.assign,
        status: lead.status,
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editLead(formData)); // Dispatch the editLead action with the updated lead data
    console.log("Form submitted:", formData);
    setShowModal(false);
    setUserData(userStoreData);
  };
  const handleToast =()=>{
    toast.success("Lead Edited Successfully");
  }
  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="text-xl text-gray-500">Name:</label>
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
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-60 ml-5 border-gray-300 rounded-md shadow-sm"
          />
      </div>
      <div className="mb-6">
        <label className="text-xl text-gray-500">
          Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 ml-5 border-gray-300 rounded-md shadow-sm"
          />
      </div>
      <div className="mb-6">
        <label className="text-xl text-gray-500">
          Dept:
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="mt-1 ml-5 border-gray-300 rounded-md shadow-sm"
          />
      </div>
      <div className="mb-6">
        <label className="text-xl text-gray-500">
          Status:
        </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 w-60 ml-5 border-gray-300 rounded-md shadow-sm"
          >
          
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        
      </div>
      <div className="mb-6">
        <label htmlFor="assign" className=" text-xl text-gray-500">
          Assign:
        </label>
        <select
            name="assign"
            value={formData.assign}
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
        onClick={handleToast}
        className="py-2 px-7 text-white bg-green-400 text-xl rounded-xl text-bold"
      >
        Edit Lead
      </button>
    </form>
    
    </>
  );
};

export default Form;
