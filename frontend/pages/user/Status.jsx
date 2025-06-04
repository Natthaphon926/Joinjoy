import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActivityCardUi from "../../components/user/ActivityCardUi";
import axios from "axios";
import useJoinjoyStore from "../../global-store/joinjoy-store";

const Status = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("approve");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useJoinjoyStore((state) => state.token);
  const handleSetTab = useCallback((e) => {
    setTab(e.currentTarget.value);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/participations/me",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    return activities.filter((a) => a.status === tab);
  }, [activities, tab]);

  return (
    <div className="max-w-[1200px] mx-auto p-7 space-y-6">
     
      <div className="flex items-center text-2xl font-semibold">
        <button onClick={() => navigate("/")} className="mr-7 cursor-pointer">
          <ArrowLeft width={39} height={39} />
        </button>
        <p className="text-[#7DB5E3]">ติดตามสถานะการสมัคร</p>
      </div>

      
      <div className="text-2xl font-semibold bg-[#3C5D9C] text-white py-3.5 px-10 rounded-t-2xl">
        กิจกรรมที่คุณสมัคร
      </div>

      
      <div className="border-2 border-[#939090] p-8.5 rounded-xl space-y-8.5">
        
        <div className="grid grid-cols-3 gap-7.5">
          {[
            { value: "approved", label: "สำเร็จ" },
            { value: "pending", label: "รอดำเนินการ" },
            { value: "rejected", label: "ถูกปฏิเสธ" },
          ].map(({ value, label }) => (
            <button
              key={value}
              value={value}
              onClick={handleSetTab}
              className="text-2xl font-semibold flex items-center justify-center border-2 py-4.5 rounded-2xl cursor-pointer"
              style={{
                borderColor: tab === value ? "#3C60BC" : "#939090",
                backgroundColor: tab === value ? "#E6F0FF" : "white",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        
        {loading ? (
          <p className="text-center py-10">กำลังโหลด...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : filteredActivities.length === 0 ? (
          <p className="text-center py-10">ไม่มีรายการในสถานะนี้</p>
        ) : (
          <div className="grid grid-cols-3 gap-7.5">
            {filteredActivities.map((a) => (
              <ActivityCardUi
                item={a.activity} status={a.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
