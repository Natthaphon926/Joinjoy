import React from "react";
import FadeInSection from "../common/FadeInSection";
import Membermarquee from "../common/MemberMarquee";
const Footer = () => {
  return (
    <FadeInSection>
      <footer className="bg-[#223165] p-15 pb-12 text-white text-sm">
        <div className="flex space-x-40 items-end justify-center">
          <div className="w-52">
            <img
              className="min-h-max w-30 mx-auto"
              src="/images/logo1.png"
              alt="logo1"
            />
            <p className="text-center text-xs text-yellow-300">
              JOINJOY เว็บที่รวมพลังจิตอาสา เพื่อสร้างสังคมที่ดีกว่า
            </p>
          </div>
          <div className="flex space-x-18">
            <Membermarquee />
          </div>
        </div>
        <p className="text-center mt-30 text-yellow-300">
          All rights reserved@joinjoy
        </p>
      </footer>
    </FadeInSection>
  );
};

export default Footer;
