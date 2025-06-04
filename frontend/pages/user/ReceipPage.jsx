import React from "react";
import Button, { ButtonVariant } from "../../src/assets/Button";
import { useNavigate } from "react-router-dom";

const ReceipPage = () => {
    const navigate = useNavigate();
  return (
    <div className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-1/2">
      <div className="text-center flex flex-col items-center justify-center">
        <div className="bg-green-400 w-50 h-50 rounded-[100%] flex justify-center">
            <img src="/images/Vector.png" alt="" className="object-contain" />
        </div>
        <div className="mt-8.75">
          <p className="text-2xl font-semibold leading-10">
            คุณได้สมัครเป็นอาสาเรียบร้อยแล้ว
          </p>
          <p className="text-sm">ขอบคุณที่เข้ามาเป็นส่วนหนึ่งกับเรา</p>
        </div>
        <div className="flex space-x-3 mt-9">
          <Button
            onClick={() => navigate("/")}
            className="border-[#3C60BC]"
            variant={ButtonVariant.OUTLINE}
          >
            กลับหน้าหลัก
          </Button>
          <Button
            onClick={() => navigate("/status")}
            className="bg-[#3C60BC] text-white"
          >
            ติดตามสถานะการสมัคร
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceipPage;
