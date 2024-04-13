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
            <h1
              className={`lg:text-5xl md:text-4xl text-sm bg-purple text-white p-2 rounded`}
            >
              Click arrow
            </h1>
          </div>
          <div
            className={`absolute  left-[50%] right-[50%] flex  justify-center `}
          >
            <div
              className={`absolute lg:flex md:flex hidden    items-center justify-center lg:w-[1000px] md:w-[1000px]  gap-2 duration-500 ${
                isOpen ? "opacity-0" : " "
              }`}
            >
              <h1 className={`lg:text-5xl  md:text-4xl text-lg`}>
                Here we are located at
              </h1>
            </div>
            <button
              className={`${
                !isOpen ? "duration-500" : "rotate-180 duration-500"
              } absolute justify-center -bottom-48  `}
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
        <h1 className="pt-6 text-4xl text-slate-900 font-semibold text-center">
          Get in touch
        </h1>
        <h2 className="pt-1  text-slate-900 text-center">Leave a feedback</h2>
      </section>

      <section className="mt-8">
        <Fade direction="down" triggerOnce>
          <form>
            <div class="container mx-auto px-4 lg:w-4/5">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
                <div class="">
                  <div class="border border-gray-300 rounded-md p-4">
                    <label
                      for="fullname"
                      class="block text-gray-700 font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullname"
                      type="text"
                      placeholder="Your full name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div class="">
                  <div class="border border-gray-300 rounded-md p-4">
                    <label
                      for="email"
                      class="block text-gray-700 font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="text"
                      placeholder="Your email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div class="">
                  <div class="border border-gray-300 rounded-md p-4">
                    <label
                      for="phonenumber"
                      class="block text-gray-700 font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phonenumber"
                      type="text"
                      placeholder="Your phone number"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <div class="border border-gray-300 rounded-md p-4">
                  <label
                    for="message"
                    class="block text-gray-700 font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 h-32"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
              </div>

              <div class="mt-6">
                <button
                  type="submit"
                  class="py-3 px-6 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  Submit
                </button>
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



