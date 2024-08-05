import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../../Header";
import Card from "./Card";
import CategoryContainer from "../Categories/CategoryContainer";
import ProductContainer from "../Products/ProductContainer";
import AddCategory from "../Category/AddCategory";
import AddProduct from "../Product/AddProduct";
// import useAuth from "../../../hooks/useAuth";
// import Cookies from "js-cookie";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="categories/*" element={<CategoryContainer />} />
            <Route path="products/*" element={<ProductContainer />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="addProducts" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
