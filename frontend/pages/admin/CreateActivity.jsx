import React, { useState, useCallback } from "react";
import Input from "../../components/common/Input";
import Button from "../../src/assets/Button";
import FileUploadDropzone from "../../components/common/UploadFile";
import axios from "axios";
import useJoinjoyStore from "../../global-store/joinjoy-store";
import { toast } from "react-toastify";

const CreateActivity = () => {
  // 1) state สำหรับไฟล์ + url พรีวิว
  const [files, setFiles] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // string[]
  const token = useJoinjoyStore((state) => state.token);

  // 2) รับไฟล์จาก Dropzone
  const onUpload = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // แค่ไฟล์เดียว
    setFiles([file]);
    setPreviews([URL.createObjectURL(file)]);
  }, []);
  const handleRemovePreview = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 3) ส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    
    files.forEach((file) => formData.append("image", file[0]));

    try {
      const res = await axios.post(
        "http://localhost:3000/api/activities",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      toast.success('Add Success')
      console.log("Response:", res.data);

      // TODO: reset form, clear preview
    } catch (err) {
      console.error("Error creating activity:", err);
      alert("เกิดข้อผิดพลาดในการสร้างกิจกรรม");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex py-1 items-center mb-4 h-14">
        <h1 className="text-3xl font-semibold text-[#0070CC]">
          สร้างกิจกรรมของคุณ
        </h1>
      </div>
      <div className="h-full w-full min-h-0 flex flex-col overflow-y-auto p-10 bg-white rounded-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 space-x-7 p-10"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="title">
                ชื่อกิจกรรม
              </label>
              <Input name="title" type="text" id="title" required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="description">
                รายละเอียดกิจกรรม
              </label>
              <Input name="description" type="text" id="description" required />
            </div>

            <div className="flex space-x-4 relative">
              <div className="flex flex-col space-y-2">
                <label className="text-sm" htmlFor="startDate">
                  วันที่เริ่มกิจกรรม
                </label>
                <div className="flex items-center space-x-4">
                  <Input name="startDate" type="date" id="startDate" required />
                  <span className="relative w-4 h-full flex items-center before:content-[''] before:self-center before:w-full before:h-0.25 before:bg-black"></span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm" htmlFor="endDate">
                  วันที่จบกิจกรรม
                </label>
                <Input name="endDate" type="date" id="endDate" required />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="maxParticipants">
                จำนวนผู้เข้าร่วม
              </label>
              <Input
                name="maxParticipants"
                type="number"
                min={0}
                id="maxParticipants"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="location">
                สถานที่จัด
              </label>
              <Input name="location" type="text" id="location" required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="reward">
                รางวัล
              </label>
              <Input name="reward" type="text" id="reward" />
            </div>
            <Button className="bg-[#FE4519] text-white transition duration-150 ease-out active:scale-90 hover:scale-105 hover:shadow-xl transform cursor-pointer ">ยืนยันการสร้าง</Button>
          </div>
          <div className="rounded-lg border border-[#D0D0D0] h-max p-5">
            <h2 className="font-semibold text-xl mb-5">อัปโหลดรูปกิจกรรม</h2>
            <FileUploadDropzone
              onDrop={onUpload}
              inputName="image" 
              accept={{ "image/jpeg": [], "image/png": [] }}
              maxFiles={1}
            />

            {previews.length > 0 && (
              <>
                <h2 className="font-semibold text-xl my-5">Preview</h2>
                <div className="flex flex-wrap gap-4">
                  {previews.map((url, i) => (
                    <div
                      key={i}
                      className="relative w-40 h-40 rounded-md overflow-hidden border"
                    >
                      <img
                        src={url}
                        alt={`preview-${i}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePreview(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold cursor-pointer"
                        aria-label="ลบรูปภาพ"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
