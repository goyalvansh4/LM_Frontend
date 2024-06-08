// import { useState, useEffect } from 'react';

// const useLeadData = () => {
//   const [data, setData] = useState([
//     {
//       id: 1,
//       name: "Aharon Lisett",
//       email: "alisett0@symantec.com",
//       title: "Computer Systems Analyst IV",
//       department: "Services",
//       status: "Active",
//       role: "Construction Worker",
//     },
//   ]);
//   useEffect(() => {
//     const leads = JSON.parse(localStorage.getItem("leads")) || [];
//     setData(leads);
//   }, [data]);

//   return data;
// };

// export default useLeadData;