// components/ActivityForm.jsx
import React, { useState, useEffect, useCallback } from "react";
import Input from "../common/Input";
import Button from "../../src/assets/Button";
import FileUploadDropzone from "../common/UploadFile";
import { toast } from "react-toastify";
import axios from "axios";

const ActivityForm = ({ mode = "create", activityID, token }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    reward: "",
    maxParticipants: 0,
  });

  // โหลด activity หากแก้ไข
  useEffect(() => {
    if (mode === "edit" && activityID) {
      const fetchActivity = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/activities/${activityID}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const a = res.data;
          setFormValues({
            title: a.title,
            description: a.description,
            startDate: a.startDate.slice(0, 10),
            endDate: a.endDate.slice(0, 10),
            location: a.location,
            reward: a.reward || "",
            maxParticipants: a.maxParticipants,
          });
          if (a.image) {
            setPreviews([a.image.secureUrl]);
          }
        } catch {
          toast.error("โหลดกิจกรรมไม่สำเร็จ");
        }
      };
      fetchActivity();
    }
  }, [mode, activityID, token]);

  const onUpload = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFiles([file]);
    setPreviews([URL.createObjectURL(file)]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValues).forEach(([k, v]) => formData.append(k, v));
    if (files[0]) formData.append("image", files[0]);

    try {
      const url =
        mode === "edit"
          ? `http://localhost:3000/api/activities/${activityID}`
          : `http://localhost:3000/api/activities`;

      const method = mode === "edit" ? axios.put : axios.post;

      await method(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(
        mode === "edit" ? "อัปเดตกิจกรรมสำเร็จ" : "สร้างกิจกรรมสำเร็จ"
      );
    } catch (err) {
      console.error(err);
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 space-x-7 p-10">
      <div className="flex flex-col space-y-3">
        {[
          ["title", "ชื่อกิจกรรม"],
          ["description", "รายละเอียดกิจกรรม"],
          ["location", "สถานที่จัด"],
          ["reward", "รางวัล"],
        ].map(([name, label]) => (
          <div className="flex flex-col space-y-2" key={name}>
            <label htmlFor={name} className="text-sm">
              {label}
            </label>
            <Input
              name={name}
              id={name}
              value={formValues[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="flex space-x-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="startDate" className="text-sm">
              วันที่เริ่ม
            </label>
            <Input
              type="date"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="endDate" className="text-sm">
              วันที่สิ้นสุด
            </label>
            <Input
              type="date"
              name="endDate"
              value={formValues.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="maxParticipants" className="text-sm">
            จำนวนผู้เข้าร่วม
          </label>
          <Input
            type="number"
            name="maxParticipants"
            value={formValues.maxParticipants}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <Button className="bg-[#FE4519] text-white hover:scale-105 active:scale-95">
          {mode === "edit" ? "บันทึกการแก้ไข" : "ยืนยันการสร้าง"}
        </Button>
      </div>

      <div className="border border-gray-300 p-5 rounded-lg">
        <h2 className="font-semibold text-xl mb-5">อัปโหลดรูปกิจกรรม</h2>
        <FileUploadDropzone
          onDrop={onUpload}
          inputName="image"
          accept={{ "image/jpeg": [], "image/png": [] }}
          maxFiles={1}
        />
        {previews.length > 0 && (
          <div className="mt-5 flex gap-4">
            {previews.map((url, i) => (
              <div
                key={i}
                className="relative w-40 h-40 rounded overflow-hidden border"
              >
                <img
                  src={url}
                  alt={`preview-${i}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFiles((prev) => prev.filter((_, index) => index !== i));
                    setPreviews((prev) =>
                      prev.filter((_, index) => index !== i)
                    );
                  }}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold cursor-pointer"
                  aria-label="ลบรูปภาพ"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default ActivityForm;
