import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProductHome from "./ProductHome";
import AddUser from "./ManageProducts/AddUser/AddUser";
import EditUser from "./ManageProducts/EditUserData/EditUser";


const ProductContainer = () => {

  return (
    <main className="dark:bg-slate-800 dark:text-white">
      <div className="container flex flex-col gap-1 px-6 py-8 mx-auto">
        <Routes>
          <Route path="/" element={<ProductHome/>}/>
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </main>
  );
};

export default ProductContainer;
