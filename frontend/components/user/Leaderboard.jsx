import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import TotalCarbon from "./TotalCarbon";
import useJoinjoyStore from "../../global-store/joinjoy-store";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [totalUser, setTotalUser] = useState();
  const token = useJoinjoyStore((state) => state.token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalUserRes, leadersRes, userRes] = await Promise.all([
          axios.get("http://localhost:3000/api/user-count"),
          axios.get("http://localhost:3000/api/leaderboard/carbon"),
          axios.get("http://localhost:3000/api/leaderboard/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        
        setTotalUser(totalUserRes.data.totalUsers);
        setLeaders(leadersRes.data);
        
        const userRankData = userRes.data;
        setCurrentUserRank(userRankData);
      } catch (err) {
        console.error("Error fetching leaderboard data", err);
      }
    };

    fetchData();
  }, []);
  

  const colors = ["#16A34A", "#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0"];
  const userColor = "#3B82F6";

  const chartData =
    currentUserRank &&
    !leaders.find((user) => user.userID === currentUserRank.userID)
      ? [
          ...leaders,
          { ...currentUserRank, name: `คุณ (อันดับ ${currentUserRank.rank})` },
        ]
      : leaders;

  return (
    <div className="max-w-7xl mx-auto p-6 my-15 mt-20 bg-white rounded-2xl shadow-xl">
      <h2
        className="text-5xl font-bold text-center text-green-500 mb-10 relative z-10"
        style={{
          animation: "electricFlicker 2s infinite ease-in-out",
          textShadow: "0 0 3px #38bdf8",
        }}
      >
        ⚡ ฮีโร่ลดคาร์บอน (Top 10) ⚡
      </h2>

      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} />
          <YAxis unit=" kg" />
          <Tooltip formatter={(value) => [`${value} kg CO₂`, "ลดคาร์บอน"]} />
          <Bar
            dataKey="totalCarbon"
            barSize={60}
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.userID === currentUserRank?.userID
                    ? userColor
                    : colors[index % colors.length]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {currentUserRank && (
        <motion.p
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-center text-[#6b6e72] mt-15 text-xl"
        >
          คุณอยู่อันดับ{" "}
          <span className="text-blue-600 font-semibold text-5xl">
            {currentUserRank.rank}
          </span>{" "}
          จากผู้ใช้ทั้งหมด{" "}
          <span className="text-[#FE4519] font-semibold text-3xl">{totalUser}</span>{" "}คน
          ด้วยคาร์บอนรวม{" "}
          <span className="text-green-600 font-semibold text-3xl">
            {currentUserRank.totalCarbon} kg
          </span>
        </motion.p>
      )}

      <TotalCarbon />

      <motion.p
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="text-center text-[#6b6e72] mt-15 text-15 drop-shadow-md"
      >
        ปลูกต้นไม้{" "}
        <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text animate-bounce">
          =
        </span>{" "}
        ช่วยโลก 🌍 | {new Date().getFullYear()}
      </motion.p>
    </div>
  );
};

export default Leaderboard;
