import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserHome from "./UserHome";
import AddUser from "./ManageUsers/AddUser/AddUser";
import EditUser from "./ManageUsers/EditUserData/EditUser";


const UserContainer = () => {

  return (
    <main className="dark:bg-slate-800 dark:text-white">
      <div className="container flex flex-col gap-1 px-6 py-8 mx-auto">
        <Routes>
          <Route path="/" element={<UserHome/>}/>
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </main>
  );
};

export default UserContainer;
