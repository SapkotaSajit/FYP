// import "react-toastify/dist/ReactToastify.css";
// import Chart from "chart.js/auto";
// import React, { useState, useEffect } from 'react';
// import { Data } from "../../components/Home/Data";
// import { BarChart } from '../../components/Home/Barchart'; 

// function AdminPanel() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchDataFromComponent = async () => {
//       try {
//         const data = await Data();
//         setChartData(data);
//       } catch (error) {
//         console.error('Failed to fetch chart data from component:', error);
//       }
//     };

//     fetchDataFromComponent();
//   }, []);
//   return (
//     <div className="z-10 relative">
//     <div className="flex items-center h-[220px] z-[-1] justify-center bg-indigo-500 w-full">
//       <div className="absolute w-[95%] z-[1] top-[140px] rounded-lg">
//       <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4  gap-8">
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
        
//       </div>
//       </div>
//       </div>
//       <div>
//       {chartData && <BarChart chartData={chartData} />} 
//       </div>
//       {/* <div className="mt-4">
//         <h2
//           className="text-xl font-semibold  my-4
// "
//         >
//           Active Projects
//         </h2>
//         <div className="relative w-full overflow-auto">
//           <table className="w-full caption-bottom text-sm">
//             <thead className="[&amp;_tr]:border-b">
//               <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Project Name
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Hours
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Priority
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Members
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Progress
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="[&amp;_tr:last-child]:border-0">
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//     </div>
//   )
// }

// export default AdminPanel




// import "react-toastify/dist/ReactToastify.css";
// import Chart from "chart.js/auto";
// import React, { useState, useEffect } from 'react';
// import { Data } from "../../components/Home/Data";
// import { BarChart } from '../../components/Home/Barchart'; 

// // import Users from "../../../../backend/models/User";

// function AdminPanel() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchDataFromComponent = async () => {
//       try {
//         const data = await Data();
//         setChartData(data);
//       } catch (error) {
//         console.error('Failed to fetch chart data from component:', error);
//       }
//     };

//     fetchDataFromComponent();
//   }, []);
//   return (
//     <div className="z-10 relative">
//     <div className="flex items-center h-[220px] z-[-1] justify-center bg-gray-300 w-full">
//       <div className="absolute w-[95%] z-[1] top-[140px] rounded-lg">
//       <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4  gap-8">
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
//         <div
//           className="rounded-lg border shadow-sm col-span-1 bg-white"
//           data-v0-t="card"
//         >
//           <div className="flex flex-col space-y-2 p-4">
//             <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
//               Projects
//             </h3>
//           </div>
//           <div className="py-5 px-4 flex items-center justify-between">
//             <div>
//               <div className="text-2xl font-bold">18</div>
//               <div className="text-sm text-gray-500">2 Completed</div>
//             </div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-400"
//             >
//               <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
//             </svg>
//           </div>
//         </div>
        
//       </div>
//       </div>
//       </div>
      
//     </div>
//   )
// }

// export default AdminPanel

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalStaff, setTotalStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch total number of users and staff from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch total number of users
      const usersResponse = await axios.get('/totalUsers');
      // Fetch total number of staff
      const staffResponse = await axios.get('/totalStaff');
      // Update state variables with fetched data
      setTotalUsers(usersResponse.data.totalUsers);
      setTotalStaff(staffResponse.data.totalStaff);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  // Call fetchData function when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle data refresh
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="admin-panel">
      <div className="flex items-center justify-center h-[220px] bg-gray-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Card 1: Total Users */}
          <div className="rounded-lg border shadow-sm bg-white">
            <div className="p-4">
              <h3 className="text-xl font-semibold">Total Users</h3>
            </div>
            <div className="py-5 px-4 flex items-center justify-center">
              <div className="text-2xl font-bold">
                {loading ? 'Loading...' : error ? 'Error' : totalUsers}
              </div>
            </div>
          </div>

          {/* Card 2: Total Staff */}
          <div className="rounded-lg border shadow-sm bg-white">
            <div className="p-4">
              <h3 className="text-xl font-semibold">Total Staff</h3>
            </div>
            <div className="py-5 px-4 flex items-center justify-center">
              <div className="text-2xl font-bold">
                {loading ? 'Loading...' : error ? 'Error' : totalStaff}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display error message if there's an error */}
      {error && (
        <div className="text-red-500 text-center mt-4">{error}</div>
      )}

      {/* Button to refresh data */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRefresh}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
