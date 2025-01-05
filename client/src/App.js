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
import Events from "./pages/Dashboard/Alumni/events/Events";
import EventPage from "./pages/Dashboard/Alumni/events/EventPage";
import StartupProfilePage from "./pages/incubation/StartupProfilePage";
import Jobs from "./pages/Dashboard/Alumni/jobs/Jobs";
import News from "./pages/Dashboard/Alumni/News";
import Connections from "./pages/Dashboard/Alumni/Connections";
import Profile from "./pages/Dashboard/Alumni/Profile";
import Loader from "./components/Loader";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateEvent from "./pages/Dashboard/Alumni/events/CreateEvent";
import ProtectedAlumniRoute from "./utils/ProtectedAlumniRoute";
import JobPage from "./pages/Dashboard/Alumni/jobs/JobPage";
import Posts from "./pages/Dashboard/Alumni/Explore/Posts";
import CreatePost from "./pages/Dashboard/Alumni/Explore/CreatePost";
import ErrorPage from "./pages/Home/ErrorPage";
import Settings from "./pages/Dashboard/Alumni/Settings";
import CollegeLogin from "./pages/Dashboard/College/Login";
import AdminDashboard from "./pages/Dashboard/College/AdminDashboard";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<AlumniSignupPage />} />
        <Route
          path="/signup/onboard"
          element={
            <ProtectedAlumniRoute>
              <Onboard />
            </ProtectedAlumniRoute>
          }
        />
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
          path="/dashboard/create-event"
          element={
            <AlumniLayout>
              <CreateEvent />
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
        <Route
          path="/dashboard/jobs"
          element={
            <AlumniLayout>
              <Jobs />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/job/:jobId"
          element={
            <AlumniLayout>
              <JobPage />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/explore"
          element={
            <AlumniLayout>
              <Posts />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/create-post"
          element={
            <AlumniLayout>
              <CreatePost />
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
          path="/dashboard/settings"
          element={
            <AlumniLayout>
              <Settings />
            </AlumniLayout>
          }
        />
        <Route
          path="/dashboard/profile/:userId"
          element={
            <AlumniLayout>
              <Profile />
            </AlumniLayout>
          }
        />
        <Route path="/college" element={<CollegeLogin />} />
        <Route path="/college/dashboard" element={<AdminDashboard />} />
        <Route path="/incubation" element={<StartupProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        draggable
      />
    </div>
  );
}

export default App;
