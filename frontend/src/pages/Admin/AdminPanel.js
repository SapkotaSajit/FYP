import "react-toastify/dist/ReactToastify.css";
import Chart from "chart.js/auto";
import React, { useState, useEffect } from 'react';
import { Data } from "../../components/Home/Data";
import { BarChart } from '../../components/Home/Barchart'; 

function AdminPanel() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDataFromComponent = async () => {
      try {
        const data = await Data();
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch chart data from component:', error);
      }
    };

    fetchDataFromComponent();
  }, []);
  return (
    <div className="z-10 relative">
    <div className="flex items-center h-[220px] z-[-1] justify-center bg-indigo-500 w-full">
      <div className="absolute w-[95%] z-[1] top-[140px] rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4  gap-8">
        <div
          className="rounded-lg border shadow-sm col-span-1 bg-white"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-2 p-4">
            <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Projects
            </h3>
          </div>
          <div className="py-5 px-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-gray-500">2 Completed</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
            </svg>
          </div>
        </div>
        <div
          className="rounded-lg border shadow-sm col-span-1 bg-white"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-2 p-4">
            <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Projects
            </h3>
          </div>
          <div className="py-5 px-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-gray-500">2 Completed</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
            </svg>
          </div>
        </div>
        <div
          className="rounded-lg border shadow-sm col-span-1 bg-white"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-2 p-4">
            <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Projects
            </h3>
          </div>
          <div className="py-5 px-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-gray-500">2 Completed</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
            </svg>
          </div>
        </div>
        <div
          className="rounded-lg border shadow-sm col-span-1 bg-white"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-2 p-4">
            <h3 className="text-xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Projects
            </h3>
          </div>
          <div className="py-5 px-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-gray-500">2 Completed</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
            </svg>
          </div>
        </div>
        
      </div>
      </div>
      </div>
      <div>
      {chartData && <BarChart chartData={chartData} />} 
      </div>
      {/* <div className="mt-4">
        <h2
          className="text-xl font-semibold  my-4
"
        >
          Active Projects
        </h2>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Project Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Hours
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Priority
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Members
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  )
}

export default AdminPanel