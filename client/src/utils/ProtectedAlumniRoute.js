import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setAlumni } from "../redux/alumni.js";
import axios from "axios";
import { HideLoading, ShowLoading } from "../redux/alerts.js";

export default function ProtectedAlumniRoute({ children }) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const getAlumniData = async () => {
    try {
      dispatch(ShowLoading());
      const resposne = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/alumni/get-alumni`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(HideLoading());
      if (resposne.data.success) {
        dispatch(setAlumni(resposne.data.user));
        setReadyToRednder(true);
        if (resposne.data.user.onboardingStatus === false) {
          navigate("/signup/onboard");
        }
      } else {
        Cookies.remove("token");
        navigate("/login");
        dispatch(setAlumni(null));
        toast.error("Please login to continue!!");
      }
    } catch (error) {
      toast.error("Please login to continue!!");
      Cookies.remove("token");
      dispatch(HideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (token) getAlumniData();
  }, []);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return readyToRednder && children;
}
