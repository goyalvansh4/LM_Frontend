import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = ({url}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/admin/${url}`);
  }
  return (
    <>
    <button className='px-6 py-2 bg-gray-900 dark:bg-gray-100 dark:text-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300' onClick={handleBack}>
      Back
    </button>
    </>
  )
}

export default BackButton