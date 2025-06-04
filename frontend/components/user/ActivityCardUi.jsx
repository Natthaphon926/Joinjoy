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
  function formatThaiDate(dateString) {
    return new Date(dateString).toLocaleString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    });
  }
  const activity = item.activity || item; //
  const { color, title } = status ? statusMapping(status) : {};
  if (!activity) return null;
  const images = activity.images || [];
  return (
    <Link
      to={`/detail/${activity.activityID}`}
      className="w-[285px] transition duration-150 ease-out active:scale-90 hover:scale-105 hover:shadow-xl transform"
    >
      <div className="rounded-lg border shadow-md bg-white w-[285px] max-w-sm h-110 ">
        <img
          src={images.length > 0 ? images[0].url : "/placeholder.png"}
          alt="Activity"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="mx-6 my-4">
          <h3 className="mt-2 mb-4  text-center text-xl font-bold">
            {item.title}
          </h3>
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <img src="images/Place Marker.png" alt="" className="mr-2 w-5 h-5" />
            {item.location.length > 30
              ? item.location.slice(0, 30) + "..."
              : item.location}
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <img src="images/Clock.png" alt="" className="mr-2 w-5 h-5" />
            <p>{formatThaiDate(item.startDate)}</p>
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <img src="images/People.png" alt="" className="mr-2 w-5 h-5" />
            {item.maxParticipants} คน
          </div>
          <p className="mt-4 text-sm">
            ผู้จัด : {item.creator?.firstName} {item.creator?.lastName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCardUi;
