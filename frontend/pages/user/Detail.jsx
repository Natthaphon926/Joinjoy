import React from "react";

const Detail = () => {
  return (
    <div className="my-15">
      <div className="relative flex flex-col justify-center items-center">
        <img
          className="w-full min-h-full"
          src="/src/assets/sample-img-1.png"
          alt="sample"
        />
        <p className="absolute"></p>
      </div>
      <div className="mt-10 flex flex-col">
        <div className="text-center">
          <p className="text-[#DF6951] font-semibold text-2xl">ประเภท : xx</p>
          <p className="text-[#181E4B] text-5xl leading-26">
            อาสาเก็บขยะ ทะเล KMUTT
          </p>
        </div>
        <div className="space-y-3 px-40">
          <div className="font-semibold text-xl">
            <p className="text-[#353A62]">วันที่จัดกิจกรรม</p>
            <div className="flex items-center p-3 px-4">
              {/* <ClockIcon className="mr-8" height={32} width={32} /> */}
              <p className="text-[#1B1D2A]">
                13:00 อาทิตย์ 27 เม.ย. 2568 - 17:00 อาทิตย์ 27 เม.ย. 2568
              </p>
            </div>
          </div>
          <div className="font-semibold text-xl">
            <p className="text-[#353A62]">สถานที่</p>
            <div className="flex items-center p-3 px-4">
              {/* <PinIcon className="mr-8" height={32} width={32} /> */}
              <p className="text-[#1B1D2A]">ทะเล KMUTT</p>
            </div>
          </div>
          <div className="space-x-20 flex items-baseline">
            <div className="font-semibold text-xl">
              <p className="text-[#353A62]">จำนวนคนที่รับ</p>
              <div className="flex items-center p-3 px-4">
                {/* <GroupIcon className="mr-8" height={32} width={32} /> */}
                <p className="text-[#1B1D2A]">80 คน</p>
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
              <p className="text-[#1B1D2A]">มีใบประกาศเกียรติคุณ</p>
            </div>
          </div>
        </div>
        <div className="mx-auto my-20">
          <button className="bg p-4 px-40 font-semibold text-white text-3xl cursor-pointer bg-[#3C5D9C] rounded-full">
            สมัคร
          </button>
        </div>
        <div className="text-[#1B1D2A] px-40">
          <h1 className="text-center font-semibold text-3xl">
            ลายละเอียดเพิ่มเติม
          </h1>
          <div className="mt-13 mb-28 text-xl space-y-2">
            <p className="font-semibold">กิจกรรมจิตอาสา: ทำความสะอาดทะเล 🌊</p>
            <p className="font-light">
              <span className="font-semibold">จัดโดย:</span> โครงการจิตอาสา
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)
            </p>
            <p className="font-semibold">วันและเวลา:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>วันอาทิตย์ที่ 27 เมษายน 2568</li>
              <li>เวลา 13:00 น. - 17:00 น.</li>
            </ul>
            <p className="font-semibold">สถานที่:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>บริเวณทะเล (KMUTT พื้นที่โครงการ)</li>
              <li>จุดนัดพบ: หน้าศูนย์อำนวยการกิจกรรมจิตอาสา</li>
            </ul>
            <p className="font-semibold">สิ่งที่ควรเตรียม:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>หมวก, แว่นกันแดด</li>
              <li>ถุงมือสำหรับเก็บขยะ</li>
              <li>น้ำดื่มส่วนตัว (หลีกเลี่ยงขวดพลาสติกใช้ครั้งเดียว)</li>
              <li>แต่งกายสุภาพ เรียบร้อย เคลื่อนไหวง่าย</li>
            </ul>
            <p className="font-semibold">กิจกรรมในวันงาน:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>ลงทะเบียน / รับอุปกรณ์</li>
              <li>บรีฟการทำงาน</li>
              <li>เก็บขยะชายฝั่งและบริเวณน้ำตื้น</li>
              <li>สรุปผล / ถ่ายรูปร่วมกัน</li>
            </ul>
            <p className="font-semibold">หมายเหตุ:</p>
            <ul className="list-inside list-disc font-light px-4 marker:text-lg">
              <li>มีใบประกาศเกียรติคุณมอบให้ผู้เข้าร่วมทุกคน</li>
              <li>ไม่มีค่าใช้จ่าย</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
