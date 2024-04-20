import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Fade, Slide } from "react-awesome-reveal";

export default function Slider() {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="relative w-full h-[100dvh]">
          <img
            src="img1 (1).jpg"
            className="w-full h-full object-cover"
            alt="Slide 1"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Fade direction="up" cascade delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                Quality Waterproofing Solutions
              </h1>
            </Fade>
            <Slide direction="up" cascade delay={1000}>
              <p className="text-lg md:text-xl text-white text-center mb-8">
                Protect your property from water damage with our reliable
                waterproofing services.
              </p>
            </Slide>
            <Fade direction="up" cascade delay={1500}>
              <div className="flex justify-center items-center space-x-4">
                <a href="#about-us">
                  <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Learn More
                  </button>
                </a>

                <a href="contact">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Contact Us
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="w-full h-[100dvh] relative z-[-1] mx-auto">
          <img
            src="img1 (2).jpg"
            className="w-full h-full object-cover"
            alt="Slide 2"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Fade direction="up" cascade delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                Premium Waterproofing Solutions
              </h1>
            </Fade>
            <Slide direction="up" cascade delay={1000}>
              <p className="text-lg md:text-xl text-white text-center mb-8">
                Experience the best waterproofing services for your property.
              </p>
            </Slide>
            <Fade direction="up" cascade delay={1500}>
              <div className="flex justify-center items-center space-x-4">
                <a href="#about-us">
                  <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Learn More
                  </button>
                </a>

                <a href="contact">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Contact Us
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[100dvh] relative z-[-1] mx-auto">
          <img
            src="img1 (3).jpg"
            className="w-full h-full object-cover"
            alt="Slide 3"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Fade direction="up" cascade delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                Efficient Waterproofing Solutions
              </h1>
            </Fade>
            <Slide direction="up" cascade delay={1000}>
              <p className="text-lg md:text-xl text-white text-center mb-8">
                Protect your property with our efficient waterproofing services.
              </p>
            </Slide>
            <Fade direction="up" cascade delay={1500}>
              <div className="flex justify-center items-center space-x-4">
                <a href="#about-us">
                  <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Learn More
                  </button>
                </a>

                <a href="contact">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Contact Us
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[100dvh] relative z-[-1] mx-auto">
          <img
            src="img1 (4).jpg"
            className="w-full h-full object-cover"
            alt="Slide 4"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Fade direction="up" cascade delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                Durable Waterproofing Solutions
              </h1>
            </Fade>
            <Slide direction="up" cascade delay={1000}>
              <p className="text-lg md:text-xl text-white text-center mb-8">
                Ensure durability with our waterproofing solutions for your
                property.
              </p>
            </Slide>
            <Fade direction="up" cascade delay={1500}>
              <div className="flex justify-center items-center space-x-4">
                <a href="#about-us">
                  <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Learn More
                  </button>
                </a>

                <a href="contact">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Contact Us
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[100dvh] relative z-[-1] mx-auto">
          <img
            src="img1 (5).jpg"
            className="w-full h-full object-cover"
            alt="Slide 5"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Fade direction="up" cascade delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                Reliable Waterproofing Solutions
              </h1>
            </Fade>
            <Slide direction="up" cascade delay={1000}>
              <p className="text-lg md:text-xl text-white text-center mb-8">
                Rely on us for the best waterproofing solutions and services.
              </p>
            </Slide>
            <Fade direction="up" cascade delay={1500}>
              <div className="flex justify-center items-center space-x-4">
                <a href="#about-us">
                  <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Learn More
                  </button>
                </a>

                <a href="contact">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Contact Us
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[100dvh] relative z-[-1] mx-auto">
          <img
            src="img1 (6).jpg"
            className="w-full h-full object-cover"
            alt="Slide 6"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Fade direction="up" cascade delay={500}>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                Professional Waterproofing Services
              </h1>
            </Fade>
            <Slide direction="up" cascade delay={1000}>
              <p className="text-lg md:text-xl text-white text-center mb-8">
                Experience professionalism with our expert waterproofing
                services.
              </p>
            </Slide>
            <Fade direction="up" cascade delay={1500}>
              <div className="flex justify-center items-center space-x-4">
                <a href="#about-us">
                  <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Learn More
                  </button>
                </a>

                <a href="contact">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white">
                    Contact Us
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
