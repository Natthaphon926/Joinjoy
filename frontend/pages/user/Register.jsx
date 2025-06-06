import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Register = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    healthConditions: "",
    phoneNumber: "",
  });
  console.log(form);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Confirm Password is not match!!");
    }

    try {
      const res = await axios.post("http://localhost:3000/api/register", form);
      console.log(res);
      toast.success(res.data);
      navigate("/");
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50  backdrop-blur-sm bg-white/30 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            className="bg-[#D9D9D9] p-7 px-12 rounded-[28px] w-full max-w-xl relative overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <p className="my-10 text-4xl font-light text-center">สร้างบัญชี</p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* ชื่อ */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="first-name">
                    ชื่อจริง <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    id="first-name"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm "
                    onChange={handleOnChange}
                    required
                  />
                </div>

                {/* นามสกุล */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="last-name">
                    นามสกุล <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    id="last-name"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                {/* เพศ + วันเกิด */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm" htmlFor="gender">
                      เพศ <span className="text-[red]">*</span>
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 text-sm text-gray-700"
                      onChange={handleOnChange}
                      required
                    >
                      <option value="">-- กรุณาเลือกเพศ --</option>
                      <option value="male">ชาย</option>
                      <option value="female">หญิง</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2 ml-5">
                    <label className="text-sm" htmlFor="dateOfBirth">
                      วันเกิด <span className="text-[red]">*</span>
                    </label>
                    <input
                      name="dateOfBirth"
                      type="date"
                      id="dateOfBirth"
                      className="flex   justify-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="phoneNumber">
                    เบอร์โทรศัพท์ <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="phoneNumber"
                    placeholder="กรอกเบอร์โทรศัพท์"
                    type="text"
                    id="phoneNumber"
                    pattern="\d*"
                    inputMode="numeric"
                    maxLength={9}
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="healthConditions">
                    โรคประจําตัว <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="healthConditions"
                    placeholder="กรอกโรคประจําตัว"
                    type="text"
                    id="healthConditions"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="email">
                    อีเมล <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="email"
                    placeholder="กรอกอีเมล"
                    type="text"
                    id="email"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="password">
                    รหัสผ่าน <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="password"
                    placeholder="กรอกรหัสผ่าน"
                    type="password"
                    id="password"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="confirm-password">
                    ยืนยันรหัสผ่าน <span className="text-[red]">*</span>
                  </label>
                  <input
                    name="confirmPassword"
                    placeholder="กรอกรหัสผ่าน"
                    type="password"
                    id="confirm-password"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                {/* ปุ่มสมัคร */}
                <div className="flex mt-8">
                  <button
                    type="submit"
                    className="bg-[#FF9700] rounded-lg flex-1 text-white font-light cursor-pointer   hover:bg-[#FE4519] py-2 transition duration-150 ease-out active:scale-90 hover:scale-98 hover:shadow-xl transform"
                  >
                    สร้างบัญชี
                  </button>
                </div>
              </div>
            </form>

            {/* ข้อตกลง */}
            <p className="text-center mt-6 text-sm mx-5 leading-5 text-[#475569]">
              เมื่อดำเนินการต่อ ถือว่าคุณยอมรับ{" "}
              <Link to="#" className="underline text-blue-600">
                ข้อกำหนดในการให้บริการ
              </Link>{" "}
              และ{" "}
              <Link to="#" className="underline text-blue-600">
                นโยบายความเป็นส่วนตัวของเรา
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Register;
