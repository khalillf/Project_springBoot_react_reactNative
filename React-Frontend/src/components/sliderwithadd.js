import React from "react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../css/csss.css";

SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);


const slide_img = [
  "photo/20.jpg",
  "photo/21.jpg",
  "photo/22.jpg",
  "photo/19.jpg",
  "photo/18.jpg",
  "photo/17.jpg",
  "photo/16.jpg",
  "photo/15.jpg",
  "photo/14.jpg",
];

const Swipper = () => {
  return (
    <div className="main-swiper">
      <Swiper
        effect={"coverflow"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={img} alt="" />
              <p>SOLDE : 130DH</p>
            </SwiperSlide>
          );
        })}

        <SwiperSlide>
          <img src="photo/12.jpg" alt="" />
          <p>SOLDE : 150 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/11.jpg" alt="" />
          <p>SOLDE : 130 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/13.jpg" alt="" />
          <p>SOLDE : 110 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/14.jpg" alt="" />
          <p>SOLDE : 170 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/15.jpg" alt="" />
          <p>SOLDE : 180 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/16.jpg" alt="" />
          <p>SOLDE : 120 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/17.jpg" alt="" />
          <p>SOLDE : 40 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/18.jpg" alt="" />
          <p>SOLDE : 80 DH</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="photo/19.jpg" alt="" />
          <p>SOLDE : 90 DH</p>
        </SwiperSlide> 
      </Swiper>
    </div>
  );
};

export default Swipper;