import React from "react";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import SignificantProjects from "../../components/Home/SignificantProjects";
import NotableProjects from "../../components/Home/NotableProjects";
import { Fade } from "react-awesome-reveal";

function Portfolio() {
  return (
    <>
      <Nav />
      <main className="about-section mt-6  overflow-hidden">
        <div className="container mx-auto lg:w-4/5">
          <div className="about-portfolio rounded-lg">
            <h2 className="text-center text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-400">
              Our Trusted Construction Partners
            </h2>

            <div className="main md:h-[80dvh] my-10 grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
              <div>
                <Fade direction="right" triggerOnce>
                  <div className="text-xl my-6 md:text-3xl lg:text-4xl px-4 text-gray-700 font-semibold">
                    <p>Himalayan Builders and Engineers</p>
                  </div>

                  <div className="img my-8 mx-4">
                    <img
                      src="img1 (8).jpg"
                      className="h-[50vh] w-full object-cover"
                      alt="Company Image"
                    />
                  </div>
                </Fade>
              </div>

              <Fade direction="up" triggerOnce>
                <div className="content px-4 space-y-5">
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
                </div>
              </Fade>
            </div>

          
           
          </div>
        </div>
      </main>
      <NotableProjects/>
      <SignificantProjects/>
      <Footer />
    </>
  );
}

export default Portfolio;
