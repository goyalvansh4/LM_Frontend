import React from 'react'

const LeadHead = ({ setOpenModal }) => {  
  return (
    <div className="lead_head flex items-center justify-between">
          <h3 className="text-3xl  font-medium text-gray-700">Leads</h3>
          <button onClick={() => {
              setOpenModal(true);
            }} className="btn rounded-md text-[#fff] bg-gray-900 px-4 py-2">Add Leads</button>
    </div>
  )
}

export default LeadHead;