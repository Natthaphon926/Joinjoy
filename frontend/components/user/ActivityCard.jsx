import React, { useEffect } from "react";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import { Link, useParams } from "react-router-dom";
import ActivityCardUi from "../user/ActivityCardUi";
const ActivityCard = () => {
  const getAllActivity = useJoinjoyStore((state) => state.getAllActivity);
  const activities = useJoinjoyStore((state) => state.activities);
  const { id } = useParams();

  useEffect(() => {
    getAllActivity();
  }, []);

  const filteredActivities = Array.isArray(activities)
    ? id
      ? activities.filter((item) => String(item.activityID) === String(id))
      : activities
    : [];

  return (
    <div className="my-10">
      <div className="grid grid-cols-4 justify-between gap-10">
        {filteredActivities.map((item, index) => (
          <ActivityCardUi key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
