
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/sidebar/AppSidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Sidebar Trigger to toggle Sidebar */}
        <SidebarTrigger />

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}
