import React, { useEffect, useState } from "react";
import axios from "axios";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = useJoinjoyStore((state) => state.token);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, []);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">กำลังโหลดข้อมูล...</p>
    );

  const { profile, totalCarbon } = user;

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <div className="text-4xl font-bold text-gray-800 mb-6 text-center">
        <Link to={'/'}>
          <ChevronLeft />
        </Link>
        โปรไฟล์ของคุณ
      </div>
      <div className="flex items-center justify-center my-20">
        <img src="images/Mee.png" alt="" className="w-50" />
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="text-2xl">
          <span className="font-semibold ">ชื่อ - นามสกุล:</span>{" "}
          {profile.firstName} {profile.lastName}
        </div>
        <div className="text-2xl">
          <span className="font-semibold">เพศ:</span> {profile.gender}
        </div>
        <div className="text-2xl">
          <span className="font-semibold">เบอร์โทร:</span> {profile.phoneNumber}
        </div>
        <div className="text-2xl">
          <span className="font-semibold">โรคประจำตัว:</span>{" "}
          {profile.healthConditions}
        </div>
        <div className="text-green-700 font-bold text-2xl mt-4">
          🌿 ลดคาร์บอนได้ทั้งหมด:{" "}
          <span className="text-8xl ">{totalCarbon}</span> kg CO₂/ปี
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
