

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/core';
import { Fade, Slide } from 'react-awesome-reveal';

export default function ServiceSlider() {
  return (
    <Swiper
      pagination={{
        type: 'progressbar',
      }}
      navigation={true}
      className="mySwiper"
    >
      <SwiperSlide>
  <div className='w-full h-[100dvh] relative z-[-1] mx-auto'>
    <img src='img1 (6).jpg' className='w-full h-full object-cover' alt='Slide 6'/>
    <div className='absolute inset-0 flex flex-col justify-center items-center'>
      <Fade direction='up' triggerOnce delay={500}>
        <h1 className='text-4xl md:text-6xl font-bold text-white text-center mb-4'>Professional Waterproofing Services</h1>
      </Fade>
      <Slide direction='down' triggerOnce delay={500}>
        <p className='text-lg md:text-xl text-white text-center mb-8'>Experience professionalism with our expert waterproofing services.</p>
      </Slide>
      <Fade direction='left' triggerOnce delay={1500}>
        <div className='flex justify-center items-center space-x-4'>
          <a href='#our-service'>   <button className='bg-gray-700 px-6 py-3 rounded-lg hover:bg-blue-600 text-white'>View Services</button></a>
       
          <a href='guide'> 
          <button className='bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 text-white'>View Guide</button>
          </a>
        </div>
      </Fade>
    </div>
  </div>
</SwiperSlide>


      {/* Add more SwiperSlides here */}
    </Swiper>
  );
}
