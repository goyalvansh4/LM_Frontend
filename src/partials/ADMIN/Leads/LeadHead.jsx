import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";
import { FaFileUpload } from "react-icons/fa";

const LeadHead = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (file) => {
    const url = "/admin/leads/import_csv";

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

  const closeModal = () => {
    document.getElementById("file_upload_modal").close();
    setFileName("");
    setFile(null);
    document.getElementById("file").value = null;
  };

  return (
    <>
      <div className="w-full lead_head flex items-center justify-between px-2">
        <h3 className="text-3xl font-medium text-gray-700 dark:text-white">
          Leads
        </h3>
        <div className="flex justify-end gap-5 ">
          <button
            className="btn rounded-md text-white bg-gray-900 px-4 py-2 cursor-pointer dark:text-black dark:bg-white"
            onClick={() => {
              document.getElementById("file_upload_modal").showModal();
            }}
          >
            Import
          </button>
          <dialog
            id="file_upload_modal"
            className="modal w-3/4 py-10 modal-bottom sm:modal-middle rounded-3xl mx-auto dark:bg-gray-800"
          >
            <div className="modal-box py-12 flex flex-col gap-8 justify-center px-8">
              <div className="flex gap-4 justify-between items-center">
                <div className="flex gap-4 items-center">
                  <FaFileUpload className="font-bold text-3xl text-blue-600" />
                  <h3 className="font-bold text-lg">Upload File</h3>
                </div>
                <a
                  href="./Sample.xlsx"
                  type="text/xlsx" // Provide the path to your CSV file here
                  download
                  className="btn py-2 px-3 text-white bg-blue-600 dark:text-gray-500 dark:bg-white"
                >
                  Download Sample CSV
                </a>
              </div>
              <p className="text-sm">Data that we expect:</p>
              <p className="font-bold">Format of CSV File</p>
              <table className="w-full border-2 border-gray-500">
                <thead className="bg-gray-50">
                  <tr className="flex justify-between gap-4 px-4">
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      register_number
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      rto_location
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      register_date
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      customer_name
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      customer_mobile
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      address
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 text-gray-500">
                      status
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="modal-action flex flex-col gap-4 items-center w-full">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg"
                  onChange={handleFileChange}
                />
                {fileName && (
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                )}
                <button
                  className="w-full px-4 py-2 bg-white text-black rounded-md border-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
              {spinner && (
                <div className="flex justify-center mt-4">
                  <p>Uploading File, Please Wait...</p>
                </div>
              )}
            </div>
          </dialog>
          <button
            onClick={() => {
              navigate("/admin/leads/add");
            }}
            className="btn rounded-md text-white bg-gray-900 px-4 py-2
            dark:text-black dark:bg-white"
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
