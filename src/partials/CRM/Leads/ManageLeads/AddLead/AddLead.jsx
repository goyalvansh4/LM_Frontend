import React from "react";
import "../main.css";
import Form from "./Form";

function AddLead({setModalOpen}) {

  const handleModal =()=>{
    //console.log("button clicked");
    setModalOpen(false);  
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
          <Form setModalOpen={setModalOpen}  />
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

export default AddLead;
