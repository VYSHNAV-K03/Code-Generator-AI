// import React from "react";

// const Home = () => {
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100 position-relative text-white"
//       style={{
//         backgroundImage:
//           "url('https://source.unsplash.com/1600x900/?technology,coding')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div
//         className="position-absolute top-0 start-0 w-100 h-100"
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.6)",
//           zIndex: 1,
//         }}
//       ></div>

//       {/* Content */}
//       <div className="text-center position-relative" style={{ zIndex: 2 }}>
//         <h1 className="display-3 fw-bold mb-3">Welcome to Agent Coder</h1>
//         <p className="lead fs-4">Please login or sign up to continue.</p>
//       </div>
//     </div>
//   );
// };

// export default Home;

// newcode
import React from "react";
import "../index.css";
const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className="home-overlay"></div> {/* Dark overlay for readability */}
      <div className="text-center text-white position-relative">
        <h1 className="display-4 fw-bold">Welcome to Agent Coder</h1>
        <p className="lead">Please login or sign up to continue.</p>
      </div>
    </div>
  );
};

export default Home;

