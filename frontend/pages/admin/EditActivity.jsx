import React, { useEffect } from "react";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const EditActivity = () => {
  const getAllActivity = useJoinjoyStore((state) => state.getAllActivity);
  const activities = useJoinjoyStore((state) => state.activities);
  const token = useJoinjoyStore((state) => state.token);

  const onDelete = async (activityID) => {
    const result = await Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรมนี้?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบเลย",
      cancelButtonText: "ยกเลิก",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`http://localhost:3000/api/activities/${activityID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("ลบกิจกรรมเรียบร้อยแล้ว");
    } catch (error) {
      console.error("ลบกิจกรรมไม่สำเร็จ:", error);
      toast.error("ลบกิจกรรมไม่สำเร็จ");
    }
  };

  const onEdit = async (activityID) => {
    const result = await Swal.fire({
      title: "⛏ อยู่ระหว่างการพัฒนา",
      text: "ขออภัยในความไม่สะดวก ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "เข้าใจแล้ว",
      cancelButtonText: "ปิด",
    });
    if (!result.isConfirmed) return;
  };

  useEffect(() => {
    getAllActivity();
  }, []);
  console.log(activities);
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex py-1 items-center mb-4 h-14">
        <h1 className="text-3xl font-semibold text-[#3C60BC]">จัดการกิจกรรม</h1>
      </div>
      <div className="overflow-x-auto bg-white rounded-md">
        <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 border-b">ลำดับ</th>
              <th className="px-4 py-3 border-b">ชื่อกิจกรรม</th>
              <th className="px-4 py-3 border-b">ผู้จัด</th>
              <th className="px-4 py-3 border-b">สถานที่</th>
              <th className="px-4 py-3 border-b">วันจัดกิจกรรม</th>
              <th className="px-4 py-3 border-b">จำนวนผู้สมัคร</th>
              <th className="px-4 py-3 border-b">จำนวนที่รับ</th>
              <th className="px-4 py-3 border-b">สถานะ</th>
              <th className="px-4 py-3 border-b text-center">แก้ไข</th>
              <th className="px-4 py-3 border-b text-center">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={activity.activityID}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{activity.title || "-"}</td>
                <td className="px-4 py-3">
                  {activity.creator?.firstName} {activity.creator?.lastName}
                </td>
                <td className="px-4 py-3">{activity.location}</td>
                <td className="px-4 py-3">
                  {new Date(activity.startDate).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">{activity.participantsCount}</td>
                <td className="px-4 py-3">{activity.maxParticipants}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {activity.status === "ACTIVE" ? "เปิดรับสมัคร" : "ปิดแล้ว"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => onEdit?.(activity.activityID)}
                  >
                    <Pencil />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="text-red-600 hover:underline cursor-pointer"
                    onClick={() => onDelete?.(activity.activityID)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditActivity;
