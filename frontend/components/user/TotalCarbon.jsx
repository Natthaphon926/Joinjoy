import { useEffect, useState } from "react";
import axios from "axios";

const TotalCarbon = () => {
  const [totalCarbon, setTotalCarbon] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/totalcarbon").then((res) => {
      setTotalCarbon(res.data.totalCarbon);
    });
  }, []);

  return (
    <div className="text-center my-10">
      <h3 className="text-4xl font-bold text-green-700 animate-pulse">
        🌍 ร่วมกันลด CO₂ แล้วทั้งหมด
      </h3>
      <p className="text-6xl text-[#0ea5e9] font-extrabold mt-7 drop-shadow-sm">
        {totalCarbon.toLocaleString()} <span className="text-lg font-medium">kg / ปี</span>
      </p>
    </div>
  );
};

export default TotalCarbon;
