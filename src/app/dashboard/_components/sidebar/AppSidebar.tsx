import { Sidebar, SidebarContent } from "@/components/ui/sidebar";


import { auth } from "@/auth";
import { menuItems } from "../../_menu/menu";
import { NavMain } from "./NavMain";

const AppSidebar = async () => {
  const session = await auth();
  const userRole = session?.user?.role as "ADMIN";
  console.log(userRole);
 

  return (
    <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-lg transition-transform duration-300 z-50">
      <SidebarContent className="p-4 mt-[30%]">
        <NavMain items={menuItems[userRole!]} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
