import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import GlobalAxios from "../../../../../Global/GlobalAxios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const AddBulkLeads = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [stopOnFailure, setStopOnFailure] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successDetails, setSuccessDetails] = useState(null);
  const [rowFailures, setRowFailures] = useState([]);
  const navigate = useNavigate();

  const uploadFile = async (file) => {
    const url = "/admin/leads/import_csv";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("stop_on_failure", stopOnFailure);

    try {
      const response = await GlobalAxios.post(url, formData);
      const {
        status,
        message,
        total_successful_row,
        skipped_rows,
        row_failures,
      } = response.data;
      console.log(response.data);

      setSpinner(false);

      if (status === "success") {
        toast.success(`${message}. Rows inserted: ${total_successful_row}`);
        setErrorMessages([]);
        setSuccessDetails({
          total_successful_row,
          skipped_rows,
        });
        setRowFailures(row_failures || []);
      } else {
        toast.error(message);
        setErrorMessages([message]);
        setSuccessDetails(null);
        setRowFailures([]);
      }
    } catch (error) {
      setSpinner(false);
      console.log("Error uploading file:", error.response.data.error);
      toast.error("Error uploading file");
      setErrorMessages([error.response.data.error]);
      setSuccessDetails(null);
      setRowFailures([]);
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
        setErrorMessages([]);
        setSuccessDetails(null);
        setRowFailures([]);
      } else {
        toast.error("Please select a CSV or Excel file.");
        setFile(null);
        setFileName("");
      }
    }
  };

  return (
    <div className="w-full py-1 bg-white-900 rounded-3xl mx-auto dark:bg-gray-800">
      <ToastContainer />
      <div className="py-12 flex flex-col gap-8 justify-center px-8">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-4 items-center">
            <FaFileUpload className="font-bold text-3xl text-blue-600" />
            <h3 className="font-bold text-lg">Upload File</h3>
          </div>
          <a
            href="/Sample.xlsx"
            download="Sample.xlsx"
            className="btn py-2 px-3 text-white bg-blue-600 dark:text-gray-500 dark:bg-white rounded-md"
          >
            Download Sample Excel
          </a>
        </div>
        <div className="p-4 border border-gray-500 rounded-lg">
          <p className="text-sm">Data that we expect:</p>
          <p className="font-bold">Format of CSV File</p>
          <table className="w-full border-2 border-gray-500 mb-4">
            <thead className="bg-gray-50">
              <tr className="flex flex-wrap justify-between gap-4 px-4">
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
            <tbody>
              <tr className="flex flex-wrap justify-between gap-4 px-4">
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  UP11AN7678
                </td>
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  Saharanpur
                </td>
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  2022-12-20
                </td>
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  Abhay Raj
                </td>
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  7674646xxx
                </td>
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  Some, Saharanpur
                </td>
                <td className="py-3 text-xs font-medium leading-4 text-gray-800">
                  hot
                </td>
              </tr>
            </tbody>
          </table>
          <ul className="list-disc list-inside text-red-600">
            <li>The date must be in this format YYYY-MM-DD.</li>
            <li>The rto_location and status must be added in the DB.</li>
            <li>The register_name and mobile must be unique.</li>
          </ul>
        </div>
        <div className="modal-action flex flex-col gap-4 w-full">
          <input
            type="file"
            name="file"
            id="file"
            className="w-full p-2 border-2 border-dashed border-gray-500 rounded-lg"
            onChange={handleFileChange}
          />
          {fileName && (
            <>
              <div className="flex my-2 gap-2 px-2 items-center">
                <input
                  type="checkbox"
                  checked={stopOnFailure}
                  onChange={(e) => setStopOnFailure(e.target.checked)}
                />
                <label htmlFor="stopOnFailure">
                  Stop on validation error of any row and roll back
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleUpload}
              >
                Upload
              </button>
            </>
          )}
        </div>
        {spinner && (
          <div className="flex justify-center items-center mt-4">
            <HashLoader size={50} color={"#36D7B7"} />
            <p className="ml-4">Uploading File, Please Wait...</p>
          </div>
        )}
        {successDetails && (
          <div className="mt-4 p-4 border border-green-500 bg-green-100 rounded">
            <h4 className="text-green-600 font-bold text-lg mb-2">
              Upload Summary:
            </h4>
            <p className="font-semibold mb-1">
              Total Successful Rows:{" "}
              <span className="font-bold text-green-800 text-lg">
                {successDetails.total_successful_row}
              </span>
            </p>
            <p className="font-semibold mb-1">
              Skipped Rows:{" "}
              <span className="font-bold text-green-800 text-lg">
                {successDetails.skipped_rows}
              </span>
            </p>
            {rowFailures.length > 0 && (
              <div className="mt-4">
                <table className="w-full border border-gray-500">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b">Row Number</th>
                      <th className="py-2 px-4 border-b">Row Data</th>
                      <th className="py-2 px-4 border-b">Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowFailures.map((failure, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b font-bold text-red-600">
                          {failure.row_number}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <table className="w-full border border-gray-300">
                            <tbody>
                              <tr>
                                {Object.entries(failure.row_data).map(
                                  ([key, value], idx) => (
                                    <td
                                      key={idx}
                                      className="py-1 px-2 border-b"
                                    >
                                      {value}
                                    </td>
                                  )
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <ul className="list-disc list-inside">
                            {failure.errors.map((error, idx) => (
                              <li key={idx} className="text-red-600">
                                {error}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {errorMessages.length > 0 && (
          <div className="mt-4 p-4 border border-red-500 bg-red-100 rounded">
            <h4 className="text-red-600 font-bold text-lg mb-2">
              Validation Errors:
            </h4>
            <ul className="list-disc list-inside text-red-600">
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBulkLeads;
