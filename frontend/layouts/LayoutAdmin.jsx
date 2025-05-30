import React from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { House, Plus, Users } from 'lucide-react';
import Avatar from "../components/common/Avatar";
import useJoinjoyStore from "../global-store/joinjoy-store";
import { cn } from "../src/assets/ีutils/tw-merge";
const LayoutAdmin = () => {
  const navigate = useNavigate();
  const user = useJoinjoyStore((state)=>state.user)
  const navLinks = [
    {
      href: "/admin/allActivity",
      title: "กิจกรรมทั้งหมด",
      icon: <House />,
    },
    {
      href: "/admin/createActivity",
      title: "สร้างกิจกรรม",
      icon: <Plus />,
    },
    {
      href: "/admin/applicant",
      title: "ผู้สมัคร",
      icon: <Users />,
    },
  ];
  
  return (
    <div className="flex flex-col w-screen h-screen min-h-0 fixed inset-0">
      <div className="flex items-center p-2 px-5 bg-[#1E1F2C] text-white shadow-[0px_4px_4px_0px_#00000040]">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-light"
        >
          JOINJOY
        </button>
      </div>
      <div className="flex h-screen min-h-0">
        <div className="w-90 h-full min-h-0 bg-white">
          <div className="border-b flex items-center p-2 px-3 border-[#D5D5D5]">
            <Avatar className="size-14.5 p-1" src={'public/cat.png'} />
            <div className="ml-3">
              <p className="text-base font-medium">{user?.userName}</p>
              <p className="text-xs text-[#3B3B3B9C]">{user?.role}</p>
            </div>
          </div>
          <div className="p-2 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "p-4.25 px-5 flex items-center font-light rounded-sm",
                    isActive
                      ? "bg-[#EFF4FF] shadow-[0px_4px_10px_0px_#0000001F]"
                      : ""
                  )
                }
              >
                {link.icon}
                <span className="ml-4.75">{link.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col h-full min-h-0 min-w-0 w-full p-4 bg-[#EBEBEB]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
