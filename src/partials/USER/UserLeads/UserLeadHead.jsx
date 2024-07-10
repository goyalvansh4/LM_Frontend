import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLeadHead = () => {
  
  
  return (
    <>
      <div className="w-full lead_head flex items-center justify-between ">
        <h3 className="text-3xl font-medium text-gray-700 dark:text-white">
          Leads
        </h3>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserLeadHead;
