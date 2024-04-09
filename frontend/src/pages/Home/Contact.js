import React, { useState } from "react";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import Slider from "../../components/Home/Slider";
import { useForm } from "react-hook-form";
import { Fade } from "react-awesome-reveal";


function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      <Nav />
      <section className="overflow-hidden">
        <div className={`relative flex flex-col justify-center `}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.65322787261!2d85.24373135767756!3d27.708935957714655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1707492932344!5m2!1sen!2snp"
            className={`w-full  border-none  duration-500 ${
              isOpen ? "h-[85vh] filter grayscale-0" : "h-96 filter grayscale "
            }`}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div
            className={`absolute top-3 lg:hidden md:hidden  right-0 w-fit gap-2 duration-500 ${
              isOpen ? "opacity-0" : " "
            }`}
          >
            <h1 className={`lg:text-5xl md:text-4xl text-sm bg-purple text-white p-2 rounded`}>
              Click arrow
            </h1>
          </div>
          <div className={`absolute  left-[50%] right-[50%] flex  justify-center `}>
            <div
              className={`absolute lg:flex md:flex hidden    items-center justify-center lg:w-[1000px] md:w-[1000px]  gap-2 duration-500 ${
                isOpen ? "opacity-0" : " "
              }`}
            >
              <h1 className={`lg:text-5xl  md:text-4xl text-lg`}>Here we are located at</h1>
              
            </div>
            <button
              className={`${!isOpen ? "duration-500" : "rotate-180 duration-500"} absolute justify-center -bottom-48  `}
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="p-1 bg-white rounded-full shadow-lg text-purple"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 7v8.25L15.25 12l.75.66l-4.5 4.5l-4.5-4.5l.75-.66L11 15.25V7zm-.5 15C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5m0-1a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section>
      <h1 className='pt-6 text-4xl text-slate-900 font-semibold text-center'>Get in touch</h1>
                <h2 className='pt-1  text-slate-900 text-center'>Leave a feedback</h2>
               
      </section>

      <section className='mt-8'>
        <Fade direction="down" triggerOnce>
                <form>

                <div className='flex flex-col justify-center gap-3 p-3 '>
                        <div className='flex flex-wrap justify-center gap-3'>
                            <div className='flex flex-col p-2 '>
                                <div className='flex border border-gray-500 items-center gap-2 p-2 lg:w-[450px] w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-purple'><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8" /></svg>
                                    <input id='fullname' type='text' placeholder='Your fullname' className='w-full outline-none' />
                                </div>
                             
                            </div>
                            <div className='flex flex-col p-2 '>
                                <div className='flex border border-gray-500 items-center gap-2 p-2 lg:w-[450px] w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-purple'><path fill="currentColor" d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z" /></svg>
                                    <input id='email' type='text' placeholder='Your email' className='w-full outline-none'  />
                                </div>
                      
                            </div>
                            <div className='flex flex-col p-2 '>
                                <div className='flex border border-gray-500 items-center gap-2 p-2 lg:w-[450px] w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className='text-purple' viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.772 14.772 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5" /></svg>

                                    <input id='phonenumber' type='text' placeholder='Your number' className='w-full outline-none'  />
                                </div>
                            
                            </div>
                            </div>



                        </div>
                    <div className='flex flex-col px-4 lg:w-4/5 mx-auto   '>
                   
                        <div className='flex flex-col  items-end w-full'>
                            <div className='flex flex-col w-full'>
                                <textarea id='message' className='w-full h-32 p-2 border border-gray-500 outline-none ' placeholder='Enter your query'  />
                                
                            </div>
                            <button type='submit' className='  py-3 mt-6 rounded-sm text-center text-white  bg-blue-500 hover:bg-blue-600 w-fit px-4'>Submit</button>
                        </div>
                    </div>
                </form>
                </Fade>
            </section>

      
      <Footer />
    </>
  );
}

export default Contact;
