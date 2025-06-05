import React from "react";
import axios from "axios";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import { useState } from "react";
import { useEffect } from "react";
const ListAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useJoinjoyStore((state)=>state.token)

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data); 
        setError(null);
        console.log(res)
      } catch (err) {
        setError("โหลดข้อมูลผู้ใช้ไม่สำเร็จ");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex py-1 items-center mb-4 h-14">
        <h1 className="text-3xl font-semibold text-[#0070CC]">รายชื่อผู้ใช้</h1>
      </div>
      <div className="overflow-x-auto bg-white rounded-md">
        <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 border-b">ลำดับ</th>
              <th className="px-4 py-3 border-b">อีเมล</th>
              <th className="px-4 py-3 border-b">ชื่อ-นามสกุล</th>
              <th className="px-4 py-3 border-b">เพศ</th>
              <th className="px-4 py-3 border-b">วันเกิด</th>
              <th className="px-4 py-3 border-b">บทบาท</th>
              <th className="px-4 py-3 border-b">เปิดใช้งาน</th>
              <th className="px-4 py-3 border-b">วันที่สร้าง</th>
              <th className="px-4 py-3 border-b">วันที่อัปเดต</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userID} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.email || "-"}</td>
                <td className="px-4 py-3">
                  {user.profile?.firstName} {user.profile?.lastName}
                </td>
                <td className="px-4 py-3">{user.profile?.gender || "-"}</td>
                <td className="px-4 py-3">
                  {user.profile?.dateOfBirth
                    ? new Date(user.profile.dateOfBirth).toLocaleDateString(
                        "th-TH",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  {user.enabled ? "ใช้งาน" : "ปิดใช้งาน"}
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  {new Date(user.updatedAt).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAllUsers;
