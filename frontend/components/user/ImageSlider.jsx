import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

const ImageSlider = () => {
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
      <SwiperSlide>
        <img src="public/trash.png" alt="1" className="w-full h-auto object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="public/trash2.png" alt="2" className="w-full h-auto object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="public/trash3.jpg" alt="3" className="w-full h-auto object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="public/trash.png" alt="3" className="w-full h-auto object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="public/trash2.png" alt="3" className="w-full h-auto object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="public/trash3.jpg" alt="3" className="w-full h-auto object-cover" />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
