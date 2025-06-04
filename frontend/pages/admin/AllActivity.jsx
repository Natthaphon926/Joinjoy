import React from "react";
import ActivityCard from "../../components/user/ActivityCard";
import Pagination from "../../components/common/Pagination";
import { Search } from "lucide-react";
const AllActivity = () => {
  const getCurrentPage = (page) => {
    console.log(page);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex py-1 items-center mb-4 h-13">
        <h1 className="text-3xl font-semibold text-[#0070CC]">
          กิจกรรมทั้งหมด
        </h1>
        <div className="ml-auto relative flex  w-[736px] p-2 bg-[#D9D9D9] overflow-hidden rounded-xl">
          <Search height={28} width={28} />
          <input
            type="text"
            className="flex-1 outline-0 ring-0 ml-3 placeholder:text-[#3B3B3B]"
            placeholder="ค้นหากิจกรรม"
          />
        </div>
      </div>
      <div className="h-full w-full min-h-0 flex flex-col overflow-y-auto p-10 bg-white rounded-md">
        <ActivityCard />
        <div className="mx-auto mt-12.75">
          <Pagination
            pageLimit={10}
            onPageChange={getCurrentPage}
            total={100}
          />
        </div>
      </div>
    </div>
  );
};

export default AllActivity;
