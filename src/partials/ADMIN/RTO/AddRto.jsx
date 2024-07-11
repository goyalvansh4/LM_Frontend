import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../Global/GlobalAxios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import "react-toastify/dist/ReactToastify.css";

const AddRto = () => {
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [rtoLocations, setRtoLocations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatesAndLocations = async () => {
      try {
        const [statesResponse, rtoLocationsResponse] = await Promise.all([
          GlobalAxios.get("admin/state_all"),
          GlobalAxios.get("admin/rtolocations"),
        ]);

        setStates(statesResponse.data.states);
        setRtoLocations(rtoLocationsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatesAndLocations();
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setValidationError("");
    setApiErrors({});
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setValidationError("");
    setApiErrors({});
  };

  const handleAddOrUpdateRto = async () => {
    if (!selectedState || !city) {
      setValidationError("Both state and city are required.");
      return;
    }

    setIsLoading(true);

    try {
      let response;
      if (editMode) {
        response = await GlobalAxios.put(`admin/rtolocations/${editId}`, {
          name: city,
          state_id: selectedState,
        });
        toast.success("RTO Location updated successfully!");
      } else {
        response = await GlobalAxios.post("admin/rtolocations", {
          name: city,
          state_id: selectedState,
        });
        toast.success("RTO Location added successfully!");
      }

      setSelectedState("");
      setCity("");
      setEditMode(false);
      setEditId(null);

      const rtoResponse = await GlobalAxios.get("admin/rtolocations");
      setRtoLocations(rtoResponse.data.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setApiErrors(error.response.data.errors);
      }
      toast.error("Failed to add/update RTO Location");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (rtoLocation) => {
    setSelectedState(rtoLocation.state_id);
    setCity(rtoLocation.name);
    setEditMode(true);
    setEditId(rtoLocation.id);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await GlobalAxios.delete(`admin/rtolocations/${deleteId}`);
      toast.success("RTO Location deleted successfully!");
      const response = await GlobalAxios.get("admin/rtolocations");
      setRtoLocations(response.data.data);
      setConfirmDelete(false);
      setDeleteId(null);
      setCheckboxChecked(false); // Reset checkbox
    } catch (error) {
      toast.error("Failed to delete RTO Location");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <HashLoader size={50} color={"#4A90E2"} loading={isLoading} />
        </div>
      ) : (
        <>
          <label
            htmlFor="state"
            className="mb-2 text-lg font-semibold text-gray-700"
          >
            Add RTO Location
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="w-full max-w-md px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          {selectedState && (
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              value={city}
              onChange={handleCityChange}
              className="w-full max-w-md px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
          {validationError && (
            <div className="mb-4 text-red-600">{validationError}</div>
          )}
          {apiErrors.name && (
            <div className="mb-4 text-red-600">{apiErrors.name[0]}</div>
          )}
          {apiErrors.state_id && (
            <div className="mb-4 text-red-600">{apiErrors.state_id[0]}</div>
          )}
          <button
            onClick={handleAddOrUpdateRto}
            className={`w-[100px] px-6 py-2 text-white ${
              editMode
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            } rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-transform duration-300 hover:scale-105`}
          >
            {editMode ? "Update" : "Add"}
          </button>

          <table className="min-w-full mt-8 bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-center">S.NO</th>
                <th className="px-6 py-3 border-b border-gray-200 text-center">Name</th>
                <th className="px-6 py-3 border-b border-gray-200 text-center">State Name</th>
                <th className="px-6 py-3 border-b border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rtoLocations.map((rtoLocation, index) => (
                <tr key={rtoLocation.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {rtoLocation.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {rtoLocation.state_name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    <button
                      onClick={() => handleEdit(rtoLocation)}
                      className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none transform transition-transform duration-300 hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(rtoLocation.id);
                        setConfirmDelete(true);
                      }}
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none transform transition-transform duration-300 hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {confirmDelete && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4">
                  Are you sure you want to delete this RTO Location?
                </p>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                    className="mr-2"
                  />
                  Yes, I want to delete
                </label>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setConfirmDelete(false);
                      setCheckboxChecked(false); // Reset checkbox
                    }}
                    className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={!checkboxChecked}
                    className={`px-4 py-2 text-white rounded-lg ${
                      checkboxChecked
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gray-400 cursor-not-allowed"
                    } transform transition-transform duration-300 hover:scale-105`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddRto;
