import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Avatar from "../common/Avatar";
import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
import { AnimatePresence } from "framer-motion";
import useJoinjoyStore from "../../global-store/joinjoy-store";

const NavBar = () => {
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useJoinjoyStore((state) => state.user);
  const logoutStore = useJoinjoyStore((state) => state.logout);

  const logout = () => {
    logoutStore(); 
    navigate("/"); 
  };

  const profile = () => {
    navigate('/profile')
  }
  
  useEffect(() => {
    const data = localStorage.getItem("joinjoy-store");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.user) {
          setUser(parsed.user);
        }
      } catch (e) {
        console.error("Invalid localStorage format");
      }
    }
  }, []);

  const menuList =
    user?.role === "admin"
      ? [{ href: "/admin", title: "จัดการกิจกรรม" }]
      : [{ href: "/status", title: "ติดตามสถานะ" }];

  return (
    <header>
      <nav className="flex items-center justify-between p-12 px-28">
        <p className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
          JOINJOY
        </p>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu.Root onOpenChange={setIsDropdownOpen}>
              <div className="flex items-center relative">
                <DropdownMenu.Trigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <Avatar className="mr-2" src={user.avatar} />
                    <ChevronDown
                      className={isDropdownOpen ? "rotate-180" : "rotate-0"}
                    />
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="start"
                    className="border-1 rounded-lg p-2 text-sm font-light mt-5 bg-white shadow-md"
                  >
                    <DropdownMenu.Item
                      onClick={profile}
                      className="outline-0 p-2 cursor-pointer hover:bg-[#0057FF26] rounded-sm "
                    >
                      โปรไฟล์ของคุณ
                    </DropdownMenu.Item>
                    {menuList.map((item) => (
                      <DropdownMenu.Item
                        key={item.title}
                        onClick={() => navigate(item.href)}
                        className="outline-0 p-2 cursor-pointer hover:bg-[#0057FF26] rounded-sm"
                      >
                        {item.title}
                      </DropdownMenu.Item>
                    ))}
            
                    <DropdownMenu.Item
                      onClick={logout}
                      className="text-[red] outline-0 p-2 cursor-pointer hover:bg-[#0057FF26] rounded-sm "
                    >
                      ออกจากระบบ
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </div>
            </DropdownMenu.Root>
          ) : (
            <>
              <button
                className="border-1 border-[#035DDB] p-2.75 px-5 rounded-lg font-light transition duration-150 ease-out active:scale-90 hover:scale-105 hover:shadow-xl transform cursor-pointer hover:bg-blue-400"
                onClick={() => setIsLoginOpen(true)}
              >
                เข้าสู่ระบบ
              </button>
              <AnimatePresence>
                <Login
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
                />
              </AnimatePresence>

              <button
                className="bg-[#FA8916] p-2.75 px-5 rounded-lg font-light cursor-pointer transition duration-150 ease-out active:scale-90 hover:scale-105 hover:shadow-xl transform hover:bg-[#FE4519]"
                onClick={() => setIsRegisterOpen(true)}
              >
                สร้างบัญชี
              </button>
              <Register
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
              />
            </>
          )}
        </div>
      </nav>

      <div className="flex max-h-[250px] justify-center items-center">
        <img src="/images/logo1.png" alt="logo1" />
      </div>
      <div className="text-center block space-y-3">
        <p className="text-[#FE4519] font-semibold">
          JOINJOY: เว็บที่ทุกคนสามารถค้นหาจิตอาสาและร่วมสร้างสังคมที่ดีขึ้น
        </p>
        <div className="mx-auto relative flex w-[736px] p-2 bg-[#D9D9D9] overflow-hidden rounded-xl">
          <input type="text" className="flex-1 outline-0 ring-0" />
          <Search height={28} width={28} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
