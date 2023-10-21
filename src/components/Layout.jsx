import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { MenuBars, XMark } from "../assets/icons";
import { useState } from "react";

const Layout = () => {

  const [openNav, setOpenNav] = useState(false)

  return (
    <div className="grid grid-cols-5">
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
        <div className="flex flex-col  col-span-5 md:col-span-4 h-screen bg-[#F1EFEF] overflow-y-auto">
          <nav className="p-7 py-4 w-full flex justify-end md:hidden">
            <button
            onClick={() => setOpenNav(!openNav)} 
            >
              {openNav ? <XMark /> : <MenuBars />}
            </button>
          </nav>
          <div className="w-full pt-3 md:pt-10 p-10 px-6 md:px-10">
            <Outlet />
          </div>
        </div>
    </div>
  )
}
export default Layout;