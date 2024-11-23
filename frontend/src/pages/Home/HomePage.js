import React from "react";
import Nav from "../../components/Home/Nav";
import Slider from "../../components/Home/Slider";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";


function HomePage() {
  return (
    <>
      <Nav />
      <Slider />
      <header>
        <div className="main md:h-[60vh]   my-6 place-items-center lg:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2">
          <Fade cascade direction="up" >
            <h1 className="text-3xl lg:text-4xl xl:text-5xl my-6 font-bold mx-4 tracking-wider">
              Providing Expert Waterproofing Solutions for Your Peace of Mind
            </h1>

            <div className="md:border-l-4 border-blue-500 mx-4 md:ml-4 md:pl-4 flex items-center">
              <p className="mx-auto mb-6 md:mb-0">
                At our waterproofing company, we have years of experience and a
                dedicated team of professionals who are committed to delivering
                high-quality waterproofing solutions. We understand the
                importance of protecting your property from water damage, and we
                strive to provide exceptional service and customer satisfaction.
                Whether you need waterproofing for your basement, roof, or any
                other area, you can trust us to get the job done right.
              </p>
            </div>
          </Fade>
        </div>
  

     
      </header>

      <main className="about-section  " id="about-us">
       

        <div className="container lg:w-4/5 lg:mx-auto  my-6 ">
          <div className="about-company grid place-items-center bg-white  rounded-lg">
          <a href="#about-us"><h2 className="text-center text-3xl lg:text-4xl xl:text-5xl tracking-wide font-bold text-blue-400 my-8 md:my-0">
              About Company
            </h2></a>
          

            <div className="main md:h-[80vh] place-items-center  grid grid-cols-1 md:grid-cols-2">
              <Fade direction="right" cascade>
                <div className="content px-4  space-y-5">
                  <p className="text-xl md:text-2xl  text-gray-700 font-semibold">
                    Quality
                  </p>
                  <h3 className="text-3xl md:text-3xl lg:text-4xl text-gray-700 font-bold">
                    Experience the best in waterproofing solutions
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Made last it seen went no just when of by. Occasional
                    entreaties comparison me difficulty so themselves. At
                    brother inquiry of offices without do my service. As
                    particular to companions at sentiments. Weather however
                    luckily enquire so certain do. Aware did stood was day under
                    ask. Dearest affixed enquire on explain opinion he. Reached
                    who the mrs joy offices pleased. Towards did colonel article
                    any parties.
                  </p>

                  <a href="/homeServices"><button className="bg-blue-500 mt-6 md:mt-6 px-6 py-3 my-6 rounded-lg hover:bg-blue-600 text-white">
                    View Services
                  </button></a>
                  
                </div>
              </Fade>
              <Fade direction="right" cascade>
                <div className="img my-8 mx-4 h-[50vh]">
                  <img
                    src="img1 (8).jpg"
                    className="h-[50vh]"
                    alt="Company Image"
                  />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </main>

      <main className="message-section mt-[500px]  md:mt-0">
        <div className="main lg:w-4/5 mx-auto
        ">
          <div className=" grid md:h-[80vh] py-24 grid-cols-1 place-items-center mx-auto  md:grid-cols-2">
         
            <Fade cascade direction="left" >
              <div className="mx-4">
                <img
                  src="https://imgs.search.brave.com/ZCZVL6IUyO83QT2b_oGG3G2y3o1Bod0VxqtS5gy-kR8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/MzcwMTMwNi9waG90/by9zZXJpb3VzLWJ1/c2luZXNzbWFuLWxv/b2tpbmctdGhyb3Vn/aC10aGUtd2luZG93/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1La0JHSjZ0NExn/aUhDTVNNeE1uU3J6/aEhwT3hpNkFNYkps/eUhjUVMta1FzPQ"
                  className="rounded-[50%] aspect-auto  border"
                ></img>
              </div>
              </Fade>
              <Fade cascade direction="right" delay={500}>
              

              <div className="md:border-l-4 border-blue-500 mx-4 md:ml-4 space-y-5 md:pl-4 ">
                <h2 className="text-center capitalize  text-3xl font-bold text-blue-500  py-6">
                  Message from founder
                </h2>
                <p className="capitalize font-semibold text-gray-600">
                  Mr ganesh dhakal
                </p>
                <p className="mx-auto mb-6 md:mb-0">
                  At our waterproofing company, we have years of experience and
                  a dedicated team of professionals who are committed to
                  delivering high-quality waterproofing solutions. We understand
                  the importance of protecting your property from water damage,
                  and we strive to provide exceptional service and customer
                  satisfaction. Whether you need waterproofing for your
                  basement, roof, or any other area, you can trust us to get the
                  job done right.
                </p>
                <div className="icon pt-6 md:pt-4 space-x-3 flex  ]">
          <a href="#"><button className="text-[17px] flex justify-center  place-items-center bg-gray-700 rounded-[50%] w-10 h-10 text-white hover:text-blue-500">
              <i class="fa-brands fa-facebook"></i>
            </button></a>
          <a href="#"><button className="text-[17px] flex justify-center place-items-center bg-gray-700 rounded-[50%] w-10 h-10 text-white hover:text-blue-500">
              <i class="fa-brands fa-twitter"></i>
            </button></a>
          <a href="#"> <button className="text-[17px] flex justify-center place-items-center  bg-gray-700 rounded-[50%] w-10 h-10 text-white hover:text-blue-500">
              <i class="fa-brands fa-instagram"></i>
            </button></a>
      
        </div>
              </div>
            </Fade>
          </div>
        </div>

      
      </main>


      <main className="history-section  mt-40  mb-[500px] md:mb-0 lg:mt-24">
        <div className="container   lg:w-4/5 mx-auto  lg:my-8 my-10  ">
          <div className="about-company bg-white rounded-lg">
            <h2 className="text-center text-3xl lg:text-4xl xl:text-5xl lg:mb-28 tracking-wide font-bold text-blue-400 my-[450px] md:my-36 lg:my-0 ">
              Company history
            </h2>

            <div className="main md:h-[80vh] place-items-center grid grid-cols-1  md:grid-cols-2">
            <Fade direction="right" cascade>
                <div className="img -my-[370px] md:-my-[350px] mx-4 h-[50vh]">
                  <img
                    src="img1 (6).jpg"
                    className="h-[50vh]"
                    alt="Company Image"
                  />
                </div>
              </Fade>
              <Fade direction="up" cascade>
                <div className="content space-y-4 md:-my-[350px]   px-4 ">
                 
                  <h3 className="text-3xl md:text-3xl lg:text-4xl mt-2  md:mt-0 text-gray-700 font-bold">
                  Our Waterproofing Journey: From Humble Beginnings to Industry Leaders
                  </h3>
                 
                  <p className="text-gray-600 space-y-5    leading-relaxed">
                    Made last it seen went no just when of by. Occasional
                    entreaties comparison me difficulty so themselves. At
                    brother inquiry of offices without do my service. As
                    particular to companions at sentiments. Weather however
                    luckily enquire so certain do. Aware did stood was day under
                    ask. Dearest affixed enquire on explain opinion he. Reached
                    who the mrs joy offices pleased. Towards did colonel article
                    any parties.
                  </p>


              
                  
                </div>
              </Fade>
            
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
