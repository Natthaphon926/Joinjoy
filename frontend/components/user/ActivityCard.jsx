import React, { useEffect } from "react";
import useJoinjoyStore from "../../global-store/joinjoy-store";

const ActivityCard = () => {
  const getAllActivity = useJoinjoyStore((state) => state.getAllActivity);
  const activities = useJoinjoyStore((state) => state.activities);

  useEffect(() => {
    getAllActivity();
  }, []);

  return (
    <div className="my-10">
      <div className="grid grid-cols-4 justify-between gap-y-12">
        {activities.map((item, index) => (
          <div key={index} className="w-[353px] rounded-lg border  shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <img
              src="public/Frame 23.png"
              alt=""
              className="w-full rounded-t-lg"
            />

            <div className=" mx-8 my-4">
              <h3 className="mt-2 mb-4">{item.title}</h3>
              <div className=" flex items-center mb-2">
                <img src="public/Place Marker.png" alt="" className="mr-4" />{" "}
                {item.location}
              </div>
              <div className=" flex items-center mb-2">
                <img src="public/Clock.png" alt="" className="mr-4" />{" "}
                {item.startDate}
              </div>
              <div className="c flex items-center mb-2">
                <img src="public/People.png" alt="" className="mr-4" /> {item.maxParticipants}
              </div>
              <p className="mt-4">ผู้จัด : {item.creator.firstName} {item.creator.lastName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
