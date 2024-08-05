import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const LeadHead = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full lead_head flex items-center justify-between px-2">
        <h3 className="text-3xl font-medium text-gray-700 dark:text-white">
          Category
        </h3>
        <div className="flex justify-end gap-5 ">
          <button
            className="btn rounded-md text-white bg-gray-900 px-4 py-2 cursor-pointer dark:text-black dark:bg-white"
            onClick={() => {navigate("/admin/leads/import")}}
          >
            Import
          </button>
          
          <button
            onClick={() => {
              navigate("/admin/leads/add");
            }}
            className="btn rounded-md text-white bg-gray-900 px-4 py-2
            dark:text-black dark:bg-white"
          >
            Add Leads
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LeadHead;
