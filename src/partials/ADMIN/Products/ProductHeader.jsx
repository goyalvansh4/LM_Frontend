import React from 'react'

const ProductHeader = () => {  
  return (
    <div className="lead_head flex items-center justify-between">
          <h3 className="text-3xl  font-medium text-gray-700 dark:text-white">Products</h3>
          <button onClick={
            () => {
              window.location.href = "/admin/Products/add";
            }
          } className="btn rounded-md text-[#fff] bg-gray-900 px-4 py-2 dark:text-black dark:bg-white">Add Products</button>
    </div>
  )
}

export default ProductHeader;