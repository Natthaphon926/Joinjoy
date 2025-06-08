import React from "react";
import Marquee from "react-fast-marquee";

const Membermarquee = () => {
  const members = [
    { name: "NATTHAPHON", image: "/images/nut.jpg", duty: "Full Stack" },
    { name: "WANNAWARAN", image: "/images/best.png", duty: "UX/UI Design" },
    { name: "NONNAPAT", image: "/images/tle.png", duty: "Frontend" },
  ];

  return (
    <div className="bg-[#223165] w-170  mt-10 overflow-hidden">
      <h2 className="text-2xl font-semibold text-center text-white mb-20">
        JoinJoy <span className="text-[#3986f2]">Devs</span>
      </h2>
      <Marquee
        gradient={true}
        gradientColor={[34, 49, 101]} // RGB ของ #223165
        gradientWidth={60}
        speed={50}
        direction="left"
        pauseOnHover={true}
      >
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center mx-16">
            <img
              src={member.image}
              alt={member.name}
              className="w-35 h-35 md:w-30 md:h-30 rounded-full border-2 border-[#ea8e04] shadow-md object-cover"
            />
            <span className="text-sm md:text-base text-white-300 mt-1 font-medium">
              {member.name}
            </span>
            <span className="text-sm md:text-base text-[#FE4519] mt-1 font-medium">
              {member.duty}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Membermarquee;
