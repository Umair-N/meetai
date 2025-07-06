import { SidebarProvider } from "@/components/ui/sidebar";
import DashbaordSidebar from "@/features/dashboard/components/sidebar";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashbaordSidebar />
      <main className="flex flex-col h-screen">{children}</main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
