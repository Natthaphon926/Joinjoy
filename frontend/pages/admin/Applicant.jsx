import axios from "axios";
import React, { useEffect, useState } from "react";
import CollapsibleVolunteerCard from "../../components/admin/CollapsibleVolunteerCard";
import useJoinjoyStore from "../../global-store/joinjoy-store";
const Applicant = () => {
  const [registrationList, setRegistrationList] = useState([]);
  const token = useJoinjoyStore((state) => state.token);
  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const res = await axios.get("http://localhost:3000/api/participants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        const grouped = {};

        data.forEach((item) => {
          const {
            participationID,
            activityID,
            images,
            maxParticipants,
            activityName,
            startDate,
            location,
            status,
            user,
            whyParticipate,
            emergencyPhone,
          } = item;
          console.log("item", item); 

          if (!grouped[activityID]) {
            grouped[activityID] = {
              participationID,
              images:images,
              activityID,
              title: activityName,
              date: new Date(startDate).toLocaleString("th-TH", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              location,
              capacity: maxParticipants, 
              participants: [],
              status,
            };
          }

          grouped[activityID].participants.push({
            participationID,
            images,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender === "male" ? "ชาย" : "หญิง",
            age: user.age,
            congenitalDisease: user.healthConditions ?? "ไม่ระบุ",
            contact: user.phoneNumber,
            emergencyContact: emergencyPhone,
            reason: whyParticipate, // ✅
            status,
          });
        });

        setRegistrationList(Object.values(grouped));
      } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex py-1 items-center mb-4 h-14">
        <h1 className="text-3xl font-semibold text-[#0070CC]">ผู้สมัคร</h1>
      </div>
      <div className="relative h-full w-full p-4 min-h-0 overflow-y-scroll bg-white rounded-md flex space-y-4 flex-col">
        {registrationList.map((item, i) => (
          <CollapsibleVolunteerCard
            key={item.participationID || i}
            participationID={item.participationID}
            activityID={item.activityID} 
            images={item.images} 
            title={item.title}
            location={item.location}
            capacity={item.capacity}
            date={item.date}
            participants={item.participants}
            status={item.status} 
          />
        ))}
      </div>
    </div>
  );
};

export default Applicant;
