import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setAlumni } from "../redux/alumni.js";
import axios from "axios";

export default function ProtectedAlumniRoute({ children }) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const getAlumniData = async () => {
    try {
      // dispatch(ShowLoading());
      // dispatch(HideLoading());
      const resposne = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/get-alumni`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resposne.data.success) {
        dispatch(setAlumni(resposne.data.data));
        setReadyToRednder(true);
      }
    } catch (error) {
      toast.error("Please login to continue!!");
      Cookies.remove("token");
      // dispatch(HideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (token) getAlumniData();
  }, []);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// import axios from "axios";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { ShowLoading, HideLoading } from "../../redux/alerts.js";
// import { SetTeacher } from "../../redux/teachers.js";
// import { useNavigate } from "react-router-dom";
// import DefaultLayout from "./DefaultLayout";
// import { SetAlumni } from "../redux/alumni.js";
// function ProtectedTeacherRoute(props) {

//   const geEmployeeData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const token = localStorage.getItem("token");
//       dispatch(HideLoading());
//       const resposne = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/api/teacher/get-teacher-by-id`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (resposne.data.success) {
//         dispatch(SetTeacher(resposne.data.data));
//         setReadyToRednder(true);
//       }
//     } catch (error) {
//       localStorage.removeItem("token");
//       dispatch(HideLoading());
//       navigate("/auth/teacher/login");
//     }
//   };

//   useEffect(() => {
//     geEmployeeData();
//   }, []);

//   return readyToRednder && <DefaultLayout>{props.children}</DefaultLayout>;
// }

// export default ProtectedTeacherRoute;
