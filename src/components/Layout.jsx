import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {

  return (
    <div className="grid grid-cols-5">
        <SideBar />
        <div className="p-10 px-6 md:px-10 col-span-5 md:col-span-4 h-screen bg-[#F5F7F8] overflow-y-auto">
          <Outlet />
        </div>
    </div>
  )
}
export default Layout;