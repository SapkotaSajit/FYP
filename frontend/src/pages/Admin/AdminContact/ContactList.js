// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { fetchWithAuth } from '../../../auth/api';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import DeleteConfirmationModal from '../../../components/Home/DeleteConfirmationModal';

// const ContactList = () => {
//   const [contacts, setcontacts] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedcontactId, setSelectedcontactId] = useState(null);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchcontacts = async () => {
  
//         try {
//           const response = await fetchWithAuth('get', 'contacts');
//           const sortedcontact = response.data.sort((a, b) => b.id - a.id);
//           setcontacts(response.data);
//         } catch (error) {
//           setError(error.message);
//         }
//       };
 
//     fetchcontacts();
//   }, []);

//   const handleDeletecontact = async () => {
//     try {
//       await fetchWithAuth('delete', `deletecontact/${selectedcontactId}`);
//       setcontacts(contacts.filter(contact => contact.id !== selectedcontactId));
//       toast.success('contact deleted successfully');
//       setSelectedcontactId(null);
//     } catch (error) {
//       setError(error.message);
//       toast.error('Failed to delete contact');
//     }
//   };

//   const openDeleteConfirmation = (contactId) => {
//     setSelectedcontactId(contactId);
//   };

//   const closeDeleteConfirmation = () => {
//     setSelectedcontactId(null);
//   };

//   return (
//     <div className="container mx-auto px-5 overflow-y-auto h-[100dvh] my-6">
//       <button className='text-white w-20 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 bg-blue-500 my-6'>
//         <Link to="/admin/createcontact">Create</Link>
//       </button>
//       <h2 className="text-2xl font-bold mb-4">contact List</h2>
//       {error && <div className="text-red-500 mb-4">Error: {error}</div>}
//       <div className="overflow-x-auto">
//         <table className="table-auto min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
//               <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((contact, index) => (
//               <tr key={contact.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-700">{contact.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{contact.description}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
              
//                   <button
//                     className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
//                     onClick={() => openDeleteConfirmation(contact.id)}
//                   >
//                     <i className="fa-regular fa-trash-alt"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <DeleteConfirmationModal
//         isOpen={selectedcontactId !== null}
//         onClose={closeDeleteConfirmation}
//         onConfirm={handleDeletecontact}
//       />
//     </div>
//   );
// }

// export default ContactList;


import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from '../../../components/Home/DeleteConfirmationModal';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetchWithAuth('get', 'contacts');
        const sortedContacts = response.data.sort((a, b) => b.id - a.id);
        setContacts(sortedContacts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async () => {
    try {
      await fetchWithAuth('delete', `deleteContact/${selectedContactId}`);
      setContacts(contacts.filter(contact => contact.id !== selectedContactId));
      toast.success('Contact deleted successfully');
      setShowDeleteConfirmation(false);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete contact');
    }
  };

  const openDeleteConfirmation = (contactId) => {
    setSelectedContactId(contactId);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setSelectedContactId(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container mx-auto px-5 overflow-y-auto h-[100dvh] my-6">
      <button className='text-white w-20 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 bg-blue-500 my-6'>
        <Link to="/admin/createContact">Create</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{contact.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
                    onClick={() => openDeleteConfirmation(contact.id)}
                  >
                    <i className="fa-regular fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteContact}
      />
    </div>
  );
}

export default ContactList;
