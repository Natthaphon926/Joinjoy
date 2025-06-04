import React, { useState } from "react";
import Button from "../../src/assets/Button";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import TreeSelect from "../../components/user/TreeSelect";
import ActivityCard from "../../components/user/ActivityCard";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { Facebook, LineChart } from "lucide-react";
const Registration = () => {
  const navigate = useNavigate();
  const [selectedTreeID, setSelectedTreeID] = useState(null);
  const token = useJoinjoyStore((state) => state.token);
  const activities = useJoinjoyStore((state) => state.activities);
  const { id } = useParams();
  const [form, setForm] = useState({
    whyParticipate: "",
    emergencyContact: "",
  });
  console.log(activities)

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (selectedTreeID.length === 0) {
      toast.error("กรุณาเลือกต้นไม้อย่างน้อย 1 ต้น");
      return;
    }

    const payload = {
      ...form,
      treeIDs:selectedTreeID
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/activities/" + id + "/join",
        payload,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      const result = await Swal.fire({
        title: "สมัครสำเร็จ!",
        text: "คุณได้เข้าร่วมกิจกรรมเรียบร้อยแล้ว",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "ติดตามสถานะ",
        cancelButtonText: "กลับหน้าหลัก",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/status");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/");
        }
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: errMsg,
        confirmButtonText: "ตกลง",
      });

      console.error("เกิดข้อผิดพลาด:", err);
    }
  };

  return (
    <div className="max-w-330 p-5 flex flex-col m-auto mt-10 mb-40">
      <div className="flex space-x-50">
        <div className="flex-2 space-y-7">
          <p className="text-4xl font-semibold text-[#383C3E]">
            สมัครเป็นจิตอาสา
          </p>
          <form onSubmit={handleSubmit} className="space-y-1 flex flex-col">
            <label className="text-sm font-light" htmlFor="whyParticipate">
              เหตุผลที่อยากเข้าร่วม <span className="text-[red]">*</span>
            </label>
            <textarea
              onChange={handleOnChange}
              className="border-1 border-[#A6A6A6] p-2 ring-0 outline-0 rounded-sm"
              rows={10}
              name="whyParticipate"
              id="whyParticipate"
              required
            ></textarea>
            <label
              className="text-sm font-light mt-5"
              htmlFor="emergencyContact"
            >
              เบอร์โทรฉุกเฉิน <span className="text-[red]">*</span>
            </label>
            <input
              onChange={handleOnChange}
              className="border-1 border-[#A6A6A6] p-2 ring-0 outline-0 rounded-sm"
              name="emergencyContact"
              id="emergencyContact"
              type="number"
              min={0}
              required
            />
            <TreeSelect onSelect={setSelectedTreeID} />
            <Button
              type="submit"
              className="bg-[#FF9900] text-white mt-10.75 p-4 rounded-2xl transition duration-150 ease-out active:scale-90 hover:scale-98 hover:shadow-xl transform"
            >
              เข้าร่วม
            </Button>
            <div className="flex items-center space-x-3 mt-7">
              <input
                className="size-5"
                type="checkbox"
                id="consent"
                name="consent"
              />
              <label className="text-[#383C3E] font-light" htmlFor="consent">
                ฉันเข้าใจและยินยอมเข้าร่วมกิจกรรมอย่างสมัครใจ
              </label>
            </div>
          </form>
        </div>

        <div className="flex-1 flex flex-col space-y-5">
          <div className="w-full">
            <ActivityCard />
          </div>

          <div className="space-y-7">
            <div className="text-[#383C3E]">
              <p className="font-semibold my-2 text-2xl">สิ่งที่จะได้รับจากกิจกรรมนี้</p>
              <ul className="space-y-1 font-light">
                <li>✅ ได้ใบประกาศเกียรติคุณ</li>
                <li>✅ ประสบการณ์จิตอาสาสุดพิเศษ</li>
                <li>✅ เพื่อนใหม่ และความทรงจำดี ๆ</li>
              </ul>
            </div>
            <div className="text-[#383C3E]">
              <p className="font-semibold my-2 text-2xl">กลุ่มของเรา</p>
              <ul className="space-y-1 font-light">
                <li className="flex items-center">
                  <Facebook className="mr-3" />
                  kmutt
                </li>
                <li className="flex items-center">
                  <LineChart className="mr-3" />
                  kmutt
                </li>
              </ul>
            </div>
            <div className="text-[#383C3E]">
              <p className="font-semibold my-2 text-2xl">ติดต่อเรา</p>
              <ul className="space-y-1 font-light">
                <li>+66 7777777777</li>
              </ul>
            </div>
          </div>
          <p className="mt-15 text-[#1B579C] font-semibold">
            มีผู้สมัครแล้ว <span className="text-[#FE4519]">?</span> คน มาร่วมเป็นส่วนหนึ่งกับเรา!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
