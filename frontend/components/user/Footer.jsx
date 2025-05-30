import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#223165] p-24 pb-12 text-white text-sm">
      <div className="flex space-x-40 items-end justify-center">
        <div className="w-52">
          <img
            className="min-h-max w-30 mx-auto"
            src="/src/assets/logo1.png"
            alt="logo1"
          />
          <p className="text-center text-xs text-yellow-300">
           JOINJOY เว็บที่รวมพลังจิตอาสา เพื่อสร้างสังคมที่ดีกว่า
          </p>
        </div>
        <div className="flex space-x-18">
          <div className="block">
            <h2 className="font-semibold text-xl mb-7 text-yellow-300">
              เกี่ยวกับเว็บไซต์ของเรา
            </h2>
            <ul className="block space-y-3">
              <li>
                <a href="">องค์กรอาสา</a>
              </li>
              <li>
                <a href="">สมัครเป็นองค์กรอาสา</a>
              </li>
              <li>
                <a href="">คู่มือ</a>
              </li>
            </ul>
          </div>
          <div className="block">
            <h2 className="font-semibold text-xl mb-7 text-yellow-300">
              นโยบายความเป็นส่วนตัว
            </h2>
            <ul className="block space-y-3">
              <li>
                <a href="">นโยบายการใช้คุกกี้</a>
              </li>
              <li>
                <a href="">นโยบายของเว็บไซต์</a>
              </li>
              <li>
                <a href="">นโยบายคุ้มครองข้อมูลส่วนบุคคล</a>
              </li>
            </ul>
          </div>
          <div className="block">
            <h2 className="font-semibold text-xl mb-7 text-yellow-300">ช่วยเหลือ</h2>
            <ul className="block space-y-3">
              <li>
                <a href="">แจ้งปัญหา</a>
              </li>
              <li>
                <a href="">ติดต่อเรา</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center mt-30 text-yellow-300">All rights reserved@joinjoy</p>
    </footer>
  );
};

export default Footer;
