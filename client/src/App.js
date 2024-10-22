import { Route, Routes } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar";
import AlumniLoginPage from "./pages/Auth/Login";
import AlumniSignupPage from "./pages/Auth/Signup";
import "react-toastify/dist/ReactToastify.css";
import AlumniLayout from "./layouts/AlumniLayout";
import AlumniDashboard from "./pages/Dashboard/Alumni/AlumniDashboard";
import Events from "./pages/Dashboard/Alumni/Events";
import StartupProfilePage from "./pages/incubation/StartupProfilePage";
import Jobs from "./pages/Dashboard/Alumni/Jobs";

function App() {
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<AlumniSignupPage />} />
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
        <Route path="/incubation" element={<StartupProfilePage />} />
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
