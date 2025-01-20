import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import MainContent from "../components/Dashboard/MainContent";

export default function DashboardLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <section className="flex min-h-screen">
      {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
      <MainContent
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
    </section>
  );
}
