import React, { useState } from "react";
import LineIcon from "../../src/assets/lineIcon";
import FacebookIcon from "../../src/assets/facebookIcon";
import Button from "../../src/assets/Button";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import ActivityCard from "../../components/user/ActivityCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Registration = () => {
  const token = useJoinjoyStore((state)=>state.token)
  const {id} = useParams()
  const [form, setForm] = useState({
    whyParticipate: "",
    emergencyContact: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post("http://localhost:3000/api/activities/"+id+"/join", form,{
        headers:{
            Authorization:`bearer ${token}`
        }
    });
      console.log(res);
      toast.success(res.data.message);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      const serverError = err.message;
      if (errMsg) {
        toast.error(errMsg);
      } else if (serverError) {
        toast.error(serverError);
      }

      console.log(err);
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
              เหตุผลที่อยากเข้าร่วม
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
              เบอร์โทรฉุกเฉิน
            </label>
            <input
              onChange={handleOnChange}
              className="border-1 border-[#A6A6A6] p-2 ring-0 outline-0 rounded-sm"
              name="emergencyContact"
              id="emergencyContact"
              type="number"
              required
            />
            <Button
              type="submit"
              className="bg-[#FF9900] text-white mt-10.75 p-4 rounded-2xl"
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
          <ActivityCard />
          <div className="space-y-7">
            <div className="text-[#383C3E]">
              <p className="font-semibold my-2">สิ่งที่จะได้รับจากกิจกรรมนี้</p>
              <ul className="space-y-1 font-light">
                <li>✅ ได้ใบประกาศเกียรติคุณ</li>
                <li>✅ ประสบการณ์จิตอาสาสุดพิเศษ</li>
                <li>✅ เพื่อนใหม่ และความทรงจำดี ๆ</li>
              </ul>
            </div>
            <div className="text-[#383C3E]">
              <p className="font-semibold my-2">กลุ่มของเรา</p>
              <ul className="space-y-1 font-light">
                <li className="flex items-center">
                  <FacebookIcon className="mr-3" />
                  kmutt
                </li>
                <li className="flex items-center">
                  <LineIcon className="mr-3" />
                  kmutt
                </li>
              </ul>
            </div>
            <div className="text-[#383C3E]">
              <p className="font-semibold my-2">ติดต่อเรา</p>
              <ul className="space-y-1 font-light">
                <li>+66 7777777777</li>
              </ul>
            </div>
          </div>
          <p className="mt-15 text-[#1B579C] font-semibold">
            มีผู้สมัครแล้ว {1} คน มาร่วมเป็นส่วนหนึ่งกับเรา!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
