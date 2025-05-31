import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/images");
        setImages(res.data);
      } catch (err) {
        console.error("ไม่สามารถดึงข้อมูลรูปภาพได้:", err);
      }
    };

    fetchImages();
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      autoplay={{ delay: 3000 }}
      navigation
      loop={true}
      spaceBetween={3}
      slidesPerView={3}
      className="!w-screen !max-w-none relative left-1/2 -translate-x-1/2 my-12"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img.url}
            alt={`Slide ${index + 1}`}
            className="h-100 w-full "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
