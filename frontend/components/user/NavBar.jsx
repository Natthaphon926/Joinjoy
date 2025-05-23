import React from "react";

const NavBar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between p-12 px-28">
        <p className="text-2xl">JOINJOY</p>
        <div className="flex items-center space-x-4">
          <button
            className="border-1 border-[#3C9AFB] flex items-center justify-center p-2.75 px-5  rounded-lg font-light cursor-pointer"
            // onClick={() => handleClick("login")}
          >
            เข้าสู่ระบบ
          </button>
          <button
            className="bg-[#7DB5E3] flex items-center justify-center p-2.75 px-5  rounded-lg font-light cursor-pointer"
            // onClick={() => handleClick("register")}
          >
            สร้างบัญชี
          </button>
        </div>
      </nav>
      <div className="flex max-h-[250px] justify-center items-center">
        <img src="/src/assets/jjj.png" alt="logo" />
      </div>
      <div className="text-center block space-y-3">
        <p className="text-[#DF6951] font-semibold">
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
