import React, { useState } from "react";
import LeadHead from "./LeadHead";
import Leads from "./Leads";
//import Modal from "../../../components/Modal/Modal";
import AddLead from "./ManageLeads/AddLead/AddLead";

const LeadContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container flex flex-col  gap-1 px-6 py-8 mx-auto">
        <LeadHead setOpenModal={setModalOpen} />
        {(modalOpen) ? <AddLead setModalOpen={setModalOpen} /> : <Leads />}
      </div>
    </main>
  );
};

export default LeadContainer;
