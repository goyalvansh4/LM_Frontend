import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";

const LeadHead = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (file) => {
    const url = "/admin/leads/import_csv";

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await GlobalAxios.post(url, formData);

      const { status, message, total_successful_row } = response.data;

      if (status === "success") {
        setSpinner(false);
        toast.success(`${message}. Rows inserted: ${total_successful_row}`, {
          onClose: () => window.location.reload(),
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      setSpinner(true);
      uploadFile(file);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop().toLowerCase();
      if (fileType === "csv" || fileType === "xlsx" || fileType === "xls") {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        toast.error("Please select a CSV or Excel file.");
        setFile(null);
        setFileName("");
      }
    }
  };

  return (
    <>
      <div className="w-full lead_head flex items-center justify-between ">
        <h3 className="text-3xl font-medium text-gray-700">Leads</h3>
        <div className="flex justify-end gap-5 ">
          <form onSubmit={handleUpload} className="flex items-center gap-5">
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="btn rounded-md text-white bg-gray-900 px-4 py-2 cursor-pointer"
            >
              Import
            </label>
            {fileName && (
              <button
                type="submit"
                className="btn rounded-md text-white bg-gray-900 px-4 py-2 mt-2"
              >
                Upload
              </button>
            )}
            {spinner && <p>Uploading File Please Wait...</p>}
          </form>
          <button
            onClick={() => {
              navigate("/admin/leads/add");
            }}
            className="btn rounded-md text-white bg-gray-900 px-4 py-2"
          >
            Add Leads
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LeadHead;
