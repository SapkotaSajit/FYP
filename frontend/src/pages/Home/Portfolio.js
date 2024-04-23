
import React from "react";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import SignificantProjects from "../../components/Home/SignificantProjects";
import NotableProjects from "../../components/Home/NotableProjects";
import { Fade } from "react-awesome-reveal";
import ConstructionPartners from "../../components/Home/ConstructionPartners";

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

            <ConstructionPartners />
            
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
