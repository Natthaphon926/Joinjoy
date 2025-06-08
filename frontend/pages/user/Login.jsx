import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import { toast } from "react-toastify";

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const actionLogin = useJoinjoyStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // เพิ่ม state สำหรับ loading
  const [isLoading, setIsLoading] = useState(false); // <--- เพิ่มตรงนี้

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ตั้งค่า isLoading เป็น true เมื่อเริ่มส่งฟอร์ม
    setIsLoading(true); // <--- เพิ่มตรงนี้

    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Login Success");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        // สำหรับ Network errors หรือข้อผิดพลาดอื่นๆ ที่มีแค่ err.message
        toast.error(err.message);
      } else {
        // กรณีที่ไม่รู้โครงสร้าง error หรือเป็น error ที่ไม่คาดคิด
        toast.error("An unexpected error occurred.");
      }
      // ไม่ว่าจะสำเร็จหรือล้มเหลว ให้ตั้งค่า isLoading กลับเป็น false เสมอ
      setIsLoading(false); // <--- เพิ่มตรงนี้
    }
  };

  const roleRedirect = (role) => {
    onClose();
    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50  backdrop-blur-sm bg-white/30 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#D9D9D9] p-7 px-12 rounded-[28px] w-full max-w-xl relative overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <p className="my-10 text-4xl font-light text-center">เข้าสู่ระบบ</p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="email">
                    อีเมล
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="กรอกอีเมล"
                    id="email"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm "
                    onChange={handleOnChange}
                    required
                    // ปิดการใช้งาน input ขณะ loading
                    disabled={isLoading} // <--- เพิ่มตรงนี้
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm" htmlFor="password">
                    รหัสผ่าน
                  </label>
                  <input
                    name="password"
                    placeholder="กรอกรหัสผ่าน"
                    type="password"
                    id="password"
                    className="flex items-center p-3 px-4 rounded-lg bg-white border-[1.5px] border-[#E2E8F0] outline-0 ring-0 placeholder:text-[#94A3B8] placeholder:font-light placeholder:text-sm"
                    onChange={handleOnChange}
                    required
                    // ปิดการใช้งาน input ขณะ loading
                    disabled={isLoading} // <--- เพิ่มตรงนี้
                  />
                </div>
                <div className="flex mt-8">
                  <button
                    type="submit"
                    className={`rounded-lg flex-1 text-white font-light py-2 transition duration-150 ease-out active:scale-90 transform
                      ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed" // สไตล์เมื่อ loading
                          : "bg-[#FA8916] hover:bg-[#FE4519] cursor-pointer hover:scale-98 hover:shadow-xl" // สไตล์ปกติ
                      }`}
                    // ปิดการใช้งานปุ่มเมื่อ loading
                    disabled={isLoading} // <--- เพิ่มตรงนี้
                  >
                    {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}{" "}
                    {/* <--- เปลี่ยนข้อความตามสถานะ loading */}
                  </button>
                </div>
              </div>
            </form>
            <p className="text-sm mt-7 text-center">JOINJOY FOR YOU</p>

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

export default Login;
