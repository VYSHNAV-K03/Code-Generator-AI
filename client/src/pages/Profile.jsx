// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../index.css";


// const Profile = () => {
//   const [user] = useState(JSON.parse(localStorage.getItem("user")));
//   const [codes, setCodes] = useState([]);

//   const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

//   useEffect(() => {
//     fetchUserCodes();
//   }, [user.id]);

//   const fetchUserCodes = async () => {
//     try {
//       const res = await axios.get(`http://localhost:7000/user/${user.id}`);
//       setCodes(res.data);
//     } catch (error) {
//       console.error("Error fetching user codes:", error);
//     }
//   };

//   const handleDelete = async (codeId) => {
//     if (window.confirm("Are you sure you want to delete this code?")) {
//       try {
//         await axios.delete(`http://localhost:7000/code/${codeId}`);
//         setCodes((prev) => prev.filter((code) => code._id !== codeId));
//       } catch (error) {
//         console.error("Error deleting code:", error);
//       }
//     }
//   };

//   // return (
//   //   <div className="container mt-5">
//   //     <div className="row justify-content-center">
//   //       <div className="col-md-8">
//   //         <div className="card shadow-lg border-0 rounded-4 mb-4">
//   //           <div className="card-body text-center p-5">
//   //             <div className="mb-4">
//   //               <div
//   //                 className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
//   //                 style={{ width: "100px", height: "100px", fontSize: "40px" }}
//   //               >
//   //                 {getInitial(user?.username)}
//   //               </div>
//   //             </div>
//   //             <h3 className="mb-3">{user?.username}</h3>
//   //             <p className="text-muted mb-4">{user?.email}</p>

//   //             <div className="row text-start justify-content-center">
//   //               <div className="col-md-6">
//   //                 <p>
//   //                   <strong>Role:</strong> {user?.role}
//   //                 </p>
//   //                 <p>
//   //                   <strong>Phone:</strong> {user?.phone}
//   //                 </p>
//   //                 <p>
//   //                   <strong>Register No:</strong> {user?.rno}
//   //                 </p>
//   //                 <p>
//   //                   <strong>Verified:</strong>{" "}
//   //                   {user?.isVerified ? "Yes ✅" : "No ❌"}
//   //                 </p>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>

//   //         {/* User's Uploaded Codes */}
//   //         <div className="card shadow border-0 rounded-4 p-4">
//   //           <h4 className="mb-4 text-center">Your Saved Code Snippets</h4>
//   //           {codes.length === 0 ? (
//   //             <p className="text-center">No code is Saved  yet.</p>
//   //           ) : (
//   //             codes.map((code) => (
//   //               <div key={code._id} className="mb-4">
//   //                 <h5>{code.prompt}</h5>
//   //                 <pre className="bg-light p-3 rounded">{code.code}</pre>
//   //                 <div className="d-flex justify-content-between align-items-center">
//   //                   <p className="text-muted mb-0">
//   //                     Uploaded: {new Date(code.createdAt).toLocaleString()}
//   //                   </p>
//   //                   <button
//   //                     className="btn btn-danger btn-sm"
//   //                     onClick={() => handleDelete(code._id)}
//   //                   >
//   //                     Delete
//   //                   </button>
//   //                 </div>
//   //                 <hr />
//   //               </div>
//   //             ))
//   //           )}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

// return (
//   <div className="container py-5">
//     <div className="row justify-content-center align-items-start min-vh-100">
//       <div className="col-md-8">

//         {/* Centered Profile Card */}
//         <div className="d-flex justify-content-center align-items-center">
//           <div className="card shadow-lg border-0 rounded-4 mb-5 w-100">
//             <div className="card-body text-center p-5">
//               <div className="mb-4">
//                 <div
//                   className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
//                   style={{ width: "100px", height: "100px", fontSize: "40px" }}
//                 >
//                   {getInitial(user?.username)}
//                 </div>
//               </div>
//               <h3 className="mb-3">{user?.username}</h3>
//               <p className="text-muted mb-4">{user?.email}</p>

//               <div className="row text-start justify-content-center">
//                 <div className="col-md-6">
//                   <p><strong>Role:</strong> {user?.role}</p>
//                   <p><strong>Phone:</strong> {user?.phone}</p>
//                   <p><strong>Register No:</strong> {user?.rno}</p>
//                   <p><strong>Verified:</strong> {user?.isVerified ? "Yes ✅" : "No ❌"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Snippets Section */}
//         <div className="card shadow border-0 rounded-4 p-4">
//           <h4 className="mb-4 text-center">Your Saved Code Snippets</h4>
//           {codes.length === 0 ? (
//             <p className="text-center">No code is saved yet.</p>
//           ) : (
//             codes.map((code) => (
//               <div key={code._id} className="mb-4">
//                 <h5>{code.prompt}</h5>
//                 <pre className="bg-light p-3 rounded">{code.code}</pre>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <p className="text-muted mb-0">
//                     Uploaded: {new Date(code.createdAt).toLocaleString()}
//                   </p>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(code._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 <hr />
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   </div>
// );

// };

// export default Profile;

// new code

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../index.css";
// const Profile = () => {
//   const [user] = useState(JSON.parse(localStorage.getItem("user")));
//   const [codes, setCodes] = useState([]);

//   const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

//   useEffect(() => {
//     fetchUserCodes();
//   }, [user.id]);

//   const fetchUserCodes = async () => {
//     try {
//       const res = await axios.get(`http://localhost:7000/user/${user.id}`);
//       setCodes(res.data);
//     } catch (error) {
//       console.error("Error fetching user codes:", error);
//     }
//   };

//   const handleDelete = async (codeId) => {
//     if (window.confirm("Are you sure you want to delete this code?")) {
//       try {
//         await axios.delete(`http://localhost:7000/code/${codeId}`);
//         setCodes((prev) => prev.filter((code) => code._id !== codeId));
//       } catch (error) {
//         console.error("Error deleting code:", error);
//       }
//     }
//   };

//   return (
//     <div className="d-flex flex-column align-items-center py-5 px-3 bg-light min-vh-100">
//       {/* Profile Card */}
//       <div className="card shadow-lg border-0 rounded-4 mb-5" style={{ maxWidth: "600px", width: "100%" }}>
//         <div className="card-body text-center p-5">
//           <div className="mb-4">
//             <div
//               className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
//               style={{ width: "100px", height: "100px", fontSize: "40px" }}
//             >
//               {getInitial(user?.username)}
//             </div>
//           </div>
//           <h3 className="mb-3">{user?.username}</h3>
//           <p className="text-muted mb-4">{user?.email}</p>

//           <div className="row text-start justify-content-center">
//             <div className="col-md-6">
//               <p><strong>Role:</strong> {user?.role}</p>
//               <p><strong>Phone:</strong> {user?.phone}</p>
//               <p><strong>Register No:</strong> {user?.rno}</p>
//               <p><strong>Verified:</strong> {user?.isVerified ? "Yes ✅" : "No ❌"}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Code Snippets */}
//       <div className="card shadow border-0 rounded-4 p-4 mb-5" style={{ maxWidth: "800px", width: "100%" }}>
//         <h4 className="mb-4 text-center">Your Saved Code Snippets</h4>
//         {codes.length === 0 ? (
//           <p className="text-center">No code is saved yet.</p>
//         ) : (
//           codes.map((code) => (
//             <div key={code._id} className="mb-4">
//               <h5>{code.prompt}</h5>
//               <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
//                 {code.code}
//               </pre>
//               <div className="d-flex justify-content-between align-items-center">
//                 <p className="text-muted mb-0">
//                   Uploaded: {new Date(code.createdAt).toLocaleString()}
//                 </p>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(code._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//               <hr />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

//new modified code
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Profile.css";

const Profile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [codes, setCodes] = useState([]);

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

  useEffect(() => {
    fetchUserCodes();
  }, [user.id]);

  const fetchUserCodes = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/user/${user.id}`);
      setCodes(res.data);
    } catch (error) {
      console.error("Error fetching user codes:", error);
    }
  };

  const handleDelete = async (codeId) => {
    if (window.confirm("Are you sure you want to delete this code?")) {
      try {
        await axios.delete(`http://localhost:7000/code/${codeId}`);
        setCodes((prev) => prev.filter((code) => code._id !== codeId));
      } catch (error) {
        console.error("Error deleting code:", error);
      }
    }
  };

  return (
    <div className="profile-background">
      <div className="overlay">
        <div className="profile-container">
          {/* Profile Card */}
          <div className="card shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: "600px" }}>
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: "100px", height: "100px", fontSize: "40px" }}
                >
                  {getInitial(user?.username)}
                </div>
              </div>
              <h3 className="mb-3">{user?.username}</h3>
              <p className="text-muted mb-4">{user?.email}</p>

              <div className="row text-start justify-content-center">
                <div className="col-md-8">
                  <p><strong>Role:</strong> {user?.role}</p>
                  <p><strong>Phone:</strong> {user?.phone}</p>
                  <p><strong>Register No:</strong> {user?.rno}</p>
                  <p><strong>Verified:</strong> {user?.isVerified ? "Yes ✅" : "No ❌"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Snippets */}
          <div className="card shadow border-0 rounded-4 p-4 w-100" style={{ maxWidth: "800px", backgroundColor: "rgba(255,255,255,0.95)" }}>
            <h4 className="mb-4 text-center">Your Saved Code Snippets</h4>
            {codes.length === 0 ? (
              <p className="text-center">No code is saved yet.</p>
            ) : (
              codes.map((code) => (
                <div key={code._id} className="mb-4">
                  <h5>{code.prompt}</h5>
                  <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>{code.code}</pre>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-muted mb-0">
                      Uploaded: {new Date(code.createdAt).toLocaleString()}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(code._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



