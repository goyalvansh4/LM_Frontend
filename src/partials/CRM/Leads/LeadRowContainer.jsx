import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeadId } from "../../../redux/store/LeadsStore/SetLeadSlice";
import { deleteLead } from "../../../redux/store/LeadsStore/LeadSlice";
const LeadRowContainer = ({setShowModal}) => {
   const leadStoreData = useSelector((state) => state.leadStore);
   const [leadData,setLeadData]=useState(leadStoreData);
  const dispatch = useDispatch();
  const handleEditClick = (leadId) => {
    const editLead = leadData.filter((lead) => lead.id === leadId);
    dispatch(setLeadId(editLead[0]));
    setShowModal(true);
    setLeadData(leadStoreData);
  };
  const handleDeleteLead = (leadId) => {
    dispatch(deleteLead(leadId));
    setLeadData(leadStoreData);
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
            Title
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Status
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Role
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
        </tr>
      </thead>
      <tbody className="bg-white">
      {leadStoreData.map((lead) => (
        <tr key={lead.id}>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  {lead.name}
                </div>
                <div className="text-sm leading-5 text-gray-500">
                  {lead.email}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div className="text-sm leading-5 text-gray-900">{lead.title}</div>
            <div className="text-sm leading-5 text-gray-500">
              {lead.department}
            </div>
          </td>

          <td className=" text-xl px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <span
              className={`inline-flex px-2 text-xs font-semibold leading-5 
         ${
          lead.status === "Active" || lead.status === "Completed"
             ? `${"text-green-800 bg-green-100 "}`
             : "text-red-700 bg-red-100"
         }    rounded-full`}
            >
              {lead.status}
            </span>
          </td>

          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
            {lead.role}
          </td>

          <td className="px-6 py-4 flex flex-col gap-2 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
            <button onClick={() => handleEditClick(lead.id)}    href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit
            </button>
            <button onClick={() => handleDeleteLead(lead.id)}    href="#" className="text-red-600 hover:text-red-900">
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

export default LeadRowContainer;
