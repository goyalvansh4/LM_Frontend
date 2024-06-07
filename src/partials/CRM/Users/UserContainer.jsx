import React, { useState } from "react";
import UserHeader from "./UserHeader";
import Users from "./Users";
import AddUser from "./ManageUsers/AddUser/AddUser";


const UserContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-aut">
      <div className="container flex flex-col gap-1 px-6 py-8 mx-auto">
        <UserHeader setOpenModal={setModalOpen} />
        {modalOpen ? <AddUser setModalOpen ={setModalOpen} /> : <Users />}
      </div>
    </main>
  );
};

export default UserContainer;
