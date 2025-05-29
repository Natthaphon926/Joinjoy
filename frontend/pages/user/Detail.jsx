import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
          className="!w-screen !max-w-none relative left-1/2 -translate-x-1/2 my-12"
          src="/src/assets/sample-img-1.png"
          alt="sample"
        />
        <p className="absolute"></p>
      </div>
      <div className="mt-10 flex flex-col">
        <div className="text-center">
          <p className="text-[#DF6951] font-semibold text-2xl">ประเภท : xx</p>
          <p className="text-[#181E4B] text-5xl leading-26">
            {detail.title}
          </p>
        </div>
        <div className="space-y-3 px-40">
          <div className="font-semibold text-xl">
            <p className="text-[#353A62]">วันที่จัดกิจกรรม</p>
            <div className="flex items-center p-3 px-4">
              {/* <ClockIcon className="mr-8" height={32} width={32} /> */}
              <p className="text-[#1B1D2A]">
                {detail.startDate}
              </p>
            </div>
          </div>
          <div className="font-semibold text-xl">
            <p className="text-[#353A62]">สถานที่</p>
            <div className="flex items-center p-3 px-4">
              {/* <PinIcon className="mr-8" height={32} width={32} /> */}
              <p className="text-[#1B1D2A]">{detail.location}</p>
            </div>
          </div>
          <div className="space-x-20 flex items-baseline">
            <div className="font-semibold text-xl">
              <p className="text-[#353A62]">จำนวนคนที่รับ</p>
              <div className="flex items-center p-3 px-4">
                {/* <GroupIcon className="mr-8" height={32} width={32} /> */}
                <p className="text-[#1B1D2A]">{detail.maxParticipants}</p>
              </div>
            </div>
            <div className="font-semibold text-xl text-center">
              <p className="text-[#353A62]">ค่าใช้จ่าย</p>
              <div className="flex items-center p-3 px-4 justify-center">
                <p className="text-[#1B1D2A]">ฟรี</p>
              </div>
            </div>
          </div>
          <div className="font-semibold text-xl">
            <p className="text-[#353A62]">เพิ่มเติม</p>
            <div className="flex items-center mt-3">
              <p className="text-[#1B1D2A]">{detail.reward}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto my-20">
          <Link to={'/registration/'+detail.activityID} className="bg p-4 px-40 font-semibold text-white text-3xl cursor-pointer bg-[#3C5D9C] rounded-full">
            สมัคร
          </Link>
        </div>
        <div className="text-[#1B1D2A] px-40">
          <h1 className="text-center font-semibold text-3xl">
            รายละเอียดเพิ่มเติม
          </h1>
          <div className="mt-13 mb-28 text-xl space-y-2">
            <p className="font-semibold">กิจกรรมจิตอาสา: {detail.description}</p>
            <p className="font-light">
              <span className="font-semibold">จัดโดย:</span> โครงการจิตอาสา
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)
            </p>
            <p className="font-semibold">วันและเวลา:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>{detail.startDate}</li>
              <li>เวลา 13:00 น. - 17:00 น.</li>
            </ul>
            <p className="font-semibold">สถานที่:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>{detail.location}</li>
              <li>จุดนัดพบ: หน้าศูนย์อำนวยการกิจกรรมจิตอาสา</li>
            </ul>
            <p className="font-semibold">หมายเหตุ:</p>
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
