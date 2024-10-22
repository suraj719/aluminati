import { useState } from "react";
import AlumniSidebar from "../components/AlumniSidebar";
import ProtectedAlumniRoute from "../utils/ProtectedAlumniRoute";

export default function AlumniLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ProtectedAlumniRoute>
        <div className="w-full flex items-center h-[90%] text-white">
          <div className={`${open && "w-[13%]"} h-full flex items-center`}>
            <AlumniSidebar open={open} setOpen={setOpen}></AlumniSidebar>
          </div>
          <div
            className="w-full scrollbar-custom"
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
