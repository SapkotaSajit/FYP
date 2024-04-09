import React from "react";
import Nav from "../../components/Home/Nav";
import Slider from "../../components/Home/Slider";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";

function Portfolio() {
  return (
    <>
      <Nav />
      <main className="about-section mt-6 overflow-hidden">
        <div className="container mx-auto  lg:w-4/5 ">
          <div className="about-portfolio rounded-lg">
            <h2 className="text-center text-3xl lg:text-4xl xl:text-5xl  font-bold text-blue-400  ">
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

            <NotableProjects />
            <SignificantProjects />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const SignificantProjects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of Project 1",
      image: "img1 (1).jpg"
    },
    {
      title: "Project 2",
      description: "Description of Project 2",
      image: "img1 (2).jpg"
    },
    {
      title: "Project 3",
      description: "Description of Project 3",
      image: "img1 (3).jpg"
    }
  ];

  return (
    <section className="significant-projects     py-12">
      <div className="container space-y-16  mx-auto">
        <h2 className="text-center mt-36 text-3xl lg:text-4xl xl:text-5xl text-blue-400 font-bold mb-8">
          Some Significant Projects
        </h2>
        <div className="grid grid-cols-1 px-4 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Fade key={index} bottom duration={1500}>
              <div className="project-card bg-white   shadow-lg rounded-lg overflow-hidden ">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover hover:scale-105 duration-1000"
                />
                <div className="p-6">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

const NotableProjects = () => {
  const projects = [
    {
      title: "Gokarna Forest Resort, Gokarneshwor 2011",
      description:
        "Project regarding new cost coating for terrace and terrace repair were conducted",
      image: "img1 (3).jpg"
    },
    {
      title: "Gokarna Forest Resort, Gokarneshwor 2011",
      description:
        "Project regarding new cost coating for terrace and terrace repair were conducted",
      image: "img1 (3).jpg"
    },
    {
      title: "Gokarna Forest Resort, Gokarneshwor 2011",
      description:
        "Project regarding new cost coating for terrace and terrace repair were conducted",
      image: "img1 (3).jpg"
    }
  ];

  return (
    <main className="project space-y-16 mt-36">
      <div className="heading  text-center text-3xl lg:text-4xl xl:text-5xl tracking-wide font-bold text-blue-400 my-8 md:my-0">
        Some Notable Projects
      </div>

      <div className="main  mx-auto lg:lg:w-4/5 grid grid-cols-1 md:grid-cols-2 px-4 gap-10 my-12">
        {projects.map((project, index) => (
          <Fade key={index} bottom duration={1500}>
            <div className="contain shadow-2xl rounded-lg p-8 duration-700 hover:scale-110 my-6">
              <img src={project.image} alt="project image" className="w-full" />
              <h3 className="text-center font-semibold text-gray-700 text-xl lg:text-2xl my-6 tracking-wider">
                {project.title}
              </h3>
              <p className="text-center">{project.description}</p>
            </div>
          </Fade>
        ))}
      </div>
    </main>
  );
};

export default Portfolio;
