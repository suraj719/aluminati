import Sidebar from "../components/SideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center h-[90%]">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
