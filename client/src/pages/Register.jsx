// import React, { useState } from "react";
// import axiosInstance from "../axiosInstance";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//     rno: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = "Full name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Invalid email format";
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     if (!formData.phone) newErrors.phone = "Phone is required";
//     else if (!/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Phone must be 10 digits";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/register/user", formData);
//       setMessage(response.data.message);
//       setTimeout(() => navigate("/login"), 1000);
//       setError("");
//       setErrors({});
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//       setMessage("");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h2 className="text-center">Register As Student</h2>
//           {message && <div className="alert alert-success">{message}</div>}
//           {error && <div className="alert alert-danger">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">
//                 FullName
//               </label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.username && "is-invalid"}`}
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               {errors.username && (
//                 <div className="invalid-feedback">{errors.username}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className={`form-control ${errors.email && "is-invalid"}`}
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <div className="invalid-feedback">{errors.email}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className={`form-control ${errors.password && "is-invalid"}`}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               {errors.password && (
//                 <div className="invalid-feedback">{errors.password}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.phone && "is-invalid"}`}
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               {errors.phone && (
//                 <div className="invalid-feedback">{errors.phone}</div>
//               )}
//             </div>

//             <button type="submit" className="btn btn-primary w-100 mb-3">
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

//code modified+working

// import React, { useState } from "react";
// import axiosInstance from "../axiosInstance";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "", // added
//     phone: "",
//     rno: "",
//   });

//   const navigate = useNavigate();

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setMessage("");
//       return;
//     }

//     try {
//       // Exclude confirmPassword from the data sent to server
//       const { confirmPassword, ...submitData } = formData;

//       const response = await axiosInstance.post("/register/user", submitData);
//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);

//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//       setMessage("");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="card">
//         <h2 className="text-center mb-4">Register As Student</h2>
//         {message && <div className="alert alert-success">{message}</div>}
//         {error && <div className="alert alert-danger">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="phone" className="form-label">Phone</label>
//             <input
//               type="text"
//               className="form-control"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

//code modified latest + working
// import React, { useState } from "react";
// import axiosInstance from "../axiosInstance";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     rno: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.username.trim())
//       newErrors.username = "Full name is required";

//     if (!formData.email)
//       newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Invalid email format";

//     if (!formData.password)
//       newErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";

//     if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";

//     if (!formData.phone)
//       newErrors.phone = "Phone is required";
//     else if (!/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Phone must be 10 digits";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setError("");
//       setMessage("");
//       return;
//     }

//     try {
//       const { confirmPassword, ...submitData } = formData;
//       const response = await axiosInstance.post("/register/user", submitData);
//       setMessage(response.data.message);
//       setTimeout(() => navigate("/login"), 1000);
//       setError("");
//       setErrors({});
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//       setMessage("");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="card">
//         <h2 className="text-center mb-4">Register As Student</h2>
//         {message && <div className="alert alert-success">{message}</div>}
//         {error && <div className="alert alert-danger">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Full Name</label>
//             <input
//               type="text"
//               className={`form-control ${errors.username ? "is-invalid" : ""}`}
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//             {errors.username && <div className="invalid-feedback">{errors.username}</div>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               className={`form-control ${errors.email ? "is-invalid" : ""}`}
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className={`form-control ${errors.password ? "is-invalid" : ""}`}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="phone" className="form-label">Phone</label>
//             <input
//               type="text"
//               className={`form-control ${errors.phone ? "is-invalid" : ""}`}
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//           </div>

//           <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;





// code modified latest2
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await axiosInstance.post("/register/user", submitData);
      setMessage(response.data.message);
      setError("");
      setErrors({});
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="login-container">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}>
        <h2 className="text-center mb-4">Register As Student</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;










