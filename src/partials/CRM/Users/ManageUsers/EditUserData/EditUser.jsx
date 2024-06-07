import React from "react";
import "../main.css";
import Form from "./Form";

function EditUser({setShowModal}) {
  const handleModal =()=>{
    console.log("Button Clicked");
    setShowModal(false);
    
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={handleModal}
          >
            X
          </button>
        </div>
        <div className="body">
          <Form setShowModal={setShowModal} />
        </div>
        <div className="footer">
          <button
            onClick={handleModal}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
