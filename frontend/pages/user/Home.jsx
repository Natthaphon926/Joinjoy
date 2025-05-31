import React, { useState } from "react";
import ActivityCard from "../../components/user/ActivityCard";
import ImageSlider from "../../components/user/ImageSlider";

const Home = () => {
  const categories = [
    "ทั้งหมด",
    "สิ่งแวดล้อม",
    "การศึกษา",
    "สาธารณสุข",
    "ศิลปวัฒนธรรม",
    "สังคมและชุมชน",
    "สัตว์และธรรมชาติ",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="border-b border-gray-200 mt-15 mb-0">
        <div className="flex justify-between space-x-6 px-4 overflow-x-auto">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-3xl whitespace-nowrap -mb-px cursor-pointer ${
                activeIndex === index
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-800 hover:text-blue-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <ImageSlider />
      <p className="text-[#015FDB] font-bold text-[40px]">
        งานอาสา <span className="text-[#FA4516]">ประกาศล่าสุด</span>
      </p>
      <ActivityCard />
    </div>
  );
};

export default Home;
