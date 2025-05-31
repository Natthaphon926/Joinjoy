import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, CalendarDays, ClipboardPlus, Clock, MapPin, UserRound, UsersRound } from 'lucide-react';

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    activityID: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: "",
    reward: "",
    createdBy: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    creator: {
      profile: {
        firstName: "",
        lastName: "",
      },
    },
    images: [],
    _count: {
      participations: "",
    },
  });

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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/activities/" + id
        );
        setDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetail();
  }, []);

  console.log(detail);
  return (
    <div className="my-15">
      <div className="!w-screen !max-w-none relative left-1/2 -translate-x-1/2 my-12">
        <img
          className="!w-screen !max-w-none relative left-1/2 -translate-x-1/2 my-12 h-[700px] object-cover "
          src={detail.images[0]?.url || "/placeholder.png"}
          alt="activity"
        />
        <p className="absolute"></p>
      </div>
      <div className="mt-10 flex flex-col">
        <div className="text-center mb-15">
          <p className="text-[#181E4B] text-5xl font-bold leading-26">{detail.title}</p>
        </div>
        <div className="space-y-3 px-40">
          <div className="font-semibold text-xl">
            <p className="text-[#FA4516] text-2xl">วันที่จัดกิจกรรม</p>
            <div className="flex items-center p-3 px-4">
              <Clock className="mr-8" height={32} width={32} />
              <p className="text-[#1B1D2A]">{formatThaiDate(detail.startDate)}</p>
            </div>
          </div>
          <div className="font-semibold text-xl">
            <p className="text-[#FA4516] text-2xl">สถานที่</p>
            <div className="flex items-center p-3 px-4">
              <MapPin className="mr-8" height={32} width={32} />
              <p className="text-[#1B1D2A]">{detail.location}</p>
            </div>
          </div>
          <div className="space-x-20 flex items-baseline">
            <div className="font-semibold text-xl">
              <p className="text-[#FA4516] text-2xl">จำนวนคนที่รับ</p>
              <div className="flex items-center p-3 px-4">
                <UsersRound className="mr-8" height={32} width={32} />
                <p className="text-[#1B1D2A]">{detail.maxParticipants}</p>
              </div>
            </div>
            <div className="font-semibold text-xl text-center">
              <p className="text-[#FA4516]">ค่าใช้จ่าย</p>
              <div className="flex items-center p-3 px-4 justify-center">
                <p className="text-[#1B1D2A]">ฟรี</p>
              </div>
            </div>
          </div>
          <div className="font-semibold text-xl">
            <p className="text-[#FA4516]">เพิ่มเติม</p>
            <div className="flex items-center mt-3">
              <p className="text-[#1B1D2A]">{detail.reward}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto my-20">
          <Link
            to={"/registration/" + detail.activityID}
            className="bg p-4 px-40 font-semibold text-white text-3xl cursor-pointer bg-[#FF9900] rounded-full transition duration-150 ease-out active:scale-120 hover:scale-150 hover:shadow-xl transform"
          >
            สมัคร
          </Link>
        </div>
        <div className="text-[#1B1D2A] px-40">
          <h1 className="text-center font-semibold text-3xl">
            รายละเอียดเพิ่มเติม
          </h1>
          <div className="mt-13 mb-28 text-xl space-y-2">
            <p className="font-semibold mb-5">
              กิจกรรมจิตอาสา: <span className="font-normal">{detail.description}</span>
            </p>
            <p className="font-light flex mb-5">
              <UserRound className="mr-5 " />
              <span className="font-semibold  ">จัดโดย:</span> โครงการจิตอาสา
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)
            </p>
            <p className="font-semibold flex  ">
              <CalendarDays className="mr-5 " />
              <span>วันและเวลา:</span>
            </p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg mb-5">
              <li>{formatThaiDate(detail.startDate)}</li>
              <li>เวลา 13:00 น. - 17:00 น.</li>
            </ul>
            <p className="font-semibold flex ">
              <Building2 className="mr-5" />
              <span>สถานที่:</span>
            </p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg mb-5">
              <li>{detail.location}</li>
              <li>จุดนัดพบ: หน้าศูนย์อำนวยการกิจกรรมจิตอาสา</li>
            </ul>
            <p className="font-semibold flex ">
              <ClipboardPlus className="mr-5" />
              <span>หมายเหตุ:</span>
            </p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>มี{detail.reward}ให้สำหรับผู้ที่เข้าร่วมกิจกรรมตลอดงาน</li>
              <li>ไม่มีค่าใช้จ่าย</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
