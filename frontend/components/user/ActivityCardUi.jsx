import React from "react";
import { Link } from "react-router-dom";

const statusMapping = (status) => {
  switch (status) {
    case "approved":
      return { color: "#4CAF50", title: "สำเร็จ" };
    case "pending":
      return { color: "#FFC107", title: "รอดำเนินการ" };
    case "rejected":
      return { color: "#F44336", title: "ถูกปฏิเสธ" };
    default:
      return { color: "#999", title: "ไม่ทราบสถานะ" };
  }
};

const ActivityCardUi = ({ item, status }) => {
  const activity = item.activity || item; //
  const { color, title } = status ? statusMapping(status) : {};
  if (!activity) return null;
  return (
    <Link to={`/detail/${activity.activityID}`}>
      <div className="rounded-lg border shadow-md bg-white w-[310px] ">
        <img src="/Frame 23.png" alt="" className="w-full rounded-t-lg object-cover" />
        <div className="mx-6 my-4">
          <h3 className="mt-2 mb-4 text-lg font-semibold">{item.title}</h3>
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <img src="/Place Marker.png" alt="" className="mr-2 w-5 h-5" />
            {item.location}
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <img src="/Clock.png" alt="" className="mr-2 w-5 h-5" />
            {item.startDate}
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <img src="/People.png" alt="" className="mr-2 w-5 h-5" />
            {item.maxParticipants} คน
          </div>
          <p className="mt-4 text-sm">
            ผู้จัด : {item.creator?.firstName} {item.creator?.lastName}
          </p>

          {status && (
            <div
              className="mt-5 flex items-center justify-center p-2 border rounded-md"
              style={{ borderColor: color, color }}
            >
              <p>{title}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ActivityCardUi;
