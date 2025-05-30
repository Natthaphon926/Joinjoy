import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "../../pages/user/Register";
import Login from "../../pages/user/Login";
import { AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <header>
      <nav className="flex items-center justify-between p-12 px-28">
        <p className="text-2xl">JOINJOY</p>
        <div className="flex items-center space-x-4">
          <button
            className="border-1 border-[#035DDB] flex items-center justify-center p-2.75 px-5  rounded-lg font-light cursor-pointer"
            onClick={() => setIsLoginOpen(true)}
          >
            เข้าสู่ระบบ
          </button>
          <AnimatePresence>
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
          </AnimatePresence>

          <button
            className="bg-[#FA8916] flex items-center justify-center p-2.75 px-5  rounded-lg font-light cursor-pointer"
            onClick={() => setIsRegisterOpen(true)}
          >
            สร้างบัญชี
          </button>
          <Register
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
          />
        </div>
      </nav>
      <div className="flex max-h-[250px] justify-center items-center">
        <img src="/src/assets/logo1.png" alt="logo1" />
      </div>
      <div className="text-center block space-y-3">
        <p className="text-[#FE4519] font-semibold">
          JOINJOY: เว็บที่ทุกคนสามารถค้นหาจิตอาสาและร่วมสร้างสังคมที่ดีขึ้น
        </p>
        <div className="mx-auto relative flex  w-[736px] p-2 bg-[#D9D9D9] overflow-hidden rounded-xl">
          <input type="text" className="flex-1 outline-0 ring-0" />
          {/* <SearchIcon height={28} width={28} /> */}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
