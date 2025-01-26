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
import CreateEvent from "./pages/Dashboard/Alumni/events/CreateEvent";
import ProtectedAlumniRoute from "./utils/ProtectedAlumniRoute";
import JobPage from "./pages/Dashboard/Alumni/jobs/JobPage";
import Posts from "./pages/Dashboard/Alumni/Explore/Posts";
import CreatePost from "./pages/Dashboard/Alumni/Explore/CreatePost";
import ErrorPage from "./pages/Home/ErrorPage";
import Settings from "./pages/Dashboard/Alumni/Settings";
import CollegeLogin from "./pages/Dashboard/College/Login";
import AdminDashboard from "./pages/Dashboard/College/AdminDashboard";
import StartupDashboard from "./pages/Dashboard/Startup/StartupDashboard";
import StartupLoginPage from "./pages/Dashboard/Startup/Login";
import StartupSignupPage from "./pages/Dashboard/Startup/Signup";
import StartupOnboard from "./pages/Dashboard/Startup/StartupOnboard";
import ProtectedStartupRoute from "./utils/ProtectedStartupRoute";
import Nearby from "./pages/Dashboard/Alumni/Nearby/Nearby";
import Inbox from "./pages/Dashboard/Alumni/Messaging/inbox";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatHome } from "./pages/CometChat/CometChatHome/CometChatHome";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AppContextProvider } from "./context/AppContext";

function App() {
  const { loading } = useSelector((state) => state.alert);
  let appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(process.env.REACT_APP_COMET_REGION)
    .autoEstablishSocketConnection(true)
    .build();
  const uiKitSettings = new UIKitSettingsBuilder()
    .setAppId(process.env.REACT_APP_COMET_APP_ID)
    .setRegion(process.env.REACT_APP_COMET_REGION)
    .setAuthKey(process.env.REACT_APP_COMET_AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build();
  CometChatUIKit.init(uiKitSettings);
  CometChat.init(process.env.REACT_APP_COMET_APP_ID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
    },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );

  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      {loading ? <Loader /> : null}
      <AppContextProvider>
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
            path="/dashboard/inbox"
            element={
              <AlumniLayout>
                <CometChatHome />
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
            path="/dashboard/nearby"
            element={
              <AlumniLayout>
                <Nearby />
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

          <Route path="/startup/login" element={<StartupLoginPage />} />
          <Route path="/startup/signup" element={<StartupSignupPage />} />
          <Route
            path="/startup/onboard"
            element={
              <ProtectedStartupRoute>
                <StartupOnboard />
              </ProtectedStartupRoute>
            }
          />
          <Route
            path="/startup/dashboard"
            element={
              <ProtectedStartupRoute>
                <StartupDashboard />
              </ProtectedStartupRoute>
            }
          />

          <Route path="/incubation" element={<StartupProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
          draggable
        />
      </AppContextProvider>
    </div>
  );
}

export default App;
