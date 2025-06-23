// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

//   console.log(user);

//   // Check if token exists in localStorage
//   const isLoggedIn = !!localStorage.getItem("token");

//   const handleLogout = () => {
//     // Remove token from localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Navigate to the home page or login page
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           CODE GENERATOR
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Home
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link className="nav-link" to="/dashboard">
//                 Dashboard
//               </Link>
//             </li> */}
//             {/* <li className="nav-item">
//               <Link className="nav-link" to="/profile">Profile</Link>
//             </li> */}
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/profile">
//                     Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">
//                     Dashboard
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <button
//                     className="btn btn-link nav-link"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">
//                     Register
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Login
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

//new code

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css"; // Custom styles

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <button
            type="button"
            className="navbar-brand d-flex align-items-center btn btn-link p-0 text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#aboutModal"
          >
            <img
              src="/images/logo m2.png"
              alt="Logo"
              className="me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="brand-text">AGENT CODER</span>
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <>
                 <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* About Modal */}
      <div
        className="modal fade"
        id="aboutModal"
        tabIndex="-1"
        aria-labelledby="aboutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="aboutModalLabel">About</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
  <p><strong>Agent Coder</strong> is a modern coding education platform built for students and educators to collaborate, learn, and grow together.</p>
  <p>It features user roles like students and admins, secure login, dashboards, and a sleek user interface to ensure the best learning experience.</p>
  <p>Our mission is to make coding education accessible, engaging, and impactful.</p>

  <hr />

  <h5><strong>What is Agent Coder?</strong></h5>
  <p><strong>Agent Coder</strong> is your intelligent, AI-powered coding assistant built to inspire, educate, and accelerate the way you code.</p>
  <p>Whether you're a <strong>student</strong> just starting out, or a <strong>developer</strong> seeking quick solutions and explanations, Agent Coder is designed to empower your coding journey with simplicity and speed.</p>

  <h6>🚀 Features:</h6>
  <ul>
    <li><strong>Code Generation:</strong> Generate efficient, error-free code in <em>Python</em> and <em>JavaScript</em> just by describing what you want.</li>
    <li><strong>Code Execution:</strong> Run and test your code instantly, right in your browser.</li>
    <li><strong>Code Explanation:</strong> Get simple, easy-to-understand explanations of how your code works.</li>
  </ul>

  <h6>🎓 For Students:</h6>
  <ul>
    <li>Interactive and intuitive for learning programming basics</li>
    <li>Experiment with real code and learn from explanations</li>
    <li>Perfect for assignments, exercises, and building confidence</li>
  </ul>

  <h6>👨‍💻 For Developers:</h6>
  <ul>
    <li>Speed up development with AI-generated code snippets</li>
    <li>Use during prototyping and debugging</li>
    <li>Explore alternative logic or syntax with examples</li>
  </ul>

  <p><em>Empower your code. Empower your learning. Empower your future.</em>  
     Start building smarter with <strong>Agent Coder</strong> — your trusted partner in code generation, execution, and explanation.</p>
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;


