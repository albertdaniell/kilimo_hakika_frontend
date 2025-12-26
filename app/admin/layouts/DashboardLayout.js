import TopNav from "./TopNav";
import SideNav from "./SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden">
      {/* Top Nav */}
      <TopNav />

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <SideNav />

        {/* Main Content */}
<main className="md:ml-64 w-full h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 p-6">          {children}
        </main>
      </div>
    </div>
  );
}
