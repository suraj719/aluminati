import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HideLoading, ShowLoading } from "../redux/alerts.js";
import { setStartup } from "../redux/startup.js";

export default function ProtectedStartupRoute({ children }) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("startup-token");
  const getStartupData = async () => {
    try {
      dispatch(ShowLoading());
      const resposne = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/startup/get-startup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(HideLoading());
      if (resposne.data.success) {
        dispatch(setStartup(resposne.data.user));
        setReadyToRednder(true);
        if (resposne.data.user.onboardingStatus === false) {
          navigate("/startup/onboard");
        }
      } else {
        Cookies.remove("startup-token");
        navigate("/startup/login");
        dispatch(setStartup(null));
        toast.error("Please login to continue!!");
      }
    } catch (error) {
      toast.error("Please login to continue!!");
      Cookies.remove("startup-stoken");
      dispatch(HideLoading());
      navigate("/startup/login");
    }
  };

  useEffect(() => {
    if (token) getStartupData();
  }, []);
  if (!token) {
    return <Navigate to="/startup/login" replace />;
  }

  return readyToRednder && children;
}
