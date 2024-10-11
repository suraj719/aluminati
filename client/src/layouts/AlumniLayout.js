import AlumniSidebar from "../components/AlumniSidebar";
import ProtectedAlumniRoute from "../utils/ProtectedAlumniRoute";

export default function AlumniLayout({ children }) {
  return (
    <>
      <ProtectedAlumniRoute>
        <div className="flex items-center justify-between h-[90%] text-white">
          <div className=" h-full flex items-center">
            <AlumniSidebar></AlumniSidebar>
          </div>
          <div
            className=" scrollbar-custom"
            style={{
              height: "90%",
              overflow: "auto",
            }}
          >
            {children}
          </div>
        </div>
      </ProtectedAlumniRoute>
    </>
  );
}
