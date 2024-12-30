import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import AlumniLoginPage from "./pages/Auth/Login";
import AlumniSignupPage from "./pages/Auth/Signup";
import Onboard from "./pages/Auth/Onboard";
import AlumniLayout from "./layouts/AlumniLayout";
import AlumniDashboard from "./pages/Dashboard/Alumni/AlumniDashboard";
import Events from "./pages/Dashboard/Alumni/Events";
import EventPage from "./pages/Dashboard/Alumni/EventPage";
import StartupProfilePage from "./pages/incubation/StartupProfilePage";
import Jobs from "./pages/Dashboard/Alumni/Jobs";
import Explore from "./pages/Dashboard/Alumni/Explore";
import Batch from "./pages/Dashboard/Alumni/Batch";
import News from "./pages/Dashboard/Alumni/News";
import Connections from "./pages/Dashboard/Alumni/Connections";
import Profile from "./pages/Dashboard/Alumni/Profile";
import Loader from "./components/Loader";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<AlumniSignupPage />} />
        <Route path="/signup/onboard" element={<Onboard />} />
        <Route path="/login" element={<AlumniLoginPage />} />
        <Route
          path="/dashboard"
          element={
            <AlumniLayout>
              <AlumniDashboard />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <AlumniLayout>
              <Events />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/jobs"
          element={
            <AlumniLayout>
              <Jobs />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/explore"
          element={
            <AlumniLayout>
              <Explore />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/batch"
          element={
            <AlumniLayout>
              <Batch />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/news"
          element={
            <AlumniLayout>
              <News />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/connect"
          element={
            <AlumniLayout>
              <Connections />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <AlumniLayout>
              <Profile />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/event/:eventId"
          element={
            <AlumniLayout>
              <EventPage />
            </AlumniLayout>
          }
        />
        <Route path="/incubation" element={<StartupProfilePage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        draggable
      />
      {/* </>
      )} */}
    </div>
  );
}

export default App;
