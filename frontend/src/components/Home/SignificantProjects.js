import { Fade } from "react-awesome-reveal";
import React from "react";
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
    <section className="significant-projects mt-36 h-fit   py-12">
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
export default SignificantProjects;