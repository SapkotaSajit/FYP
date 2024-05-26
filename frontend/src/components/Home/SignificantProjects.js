import { Fade } from "react-awesome-reveal";
import React from "react";
const SignificantProjects = () => {
  const projects = [
    {
      title: "Dwarika hotel, Dhulikhel",
      description: "Swimming pool and water tanks waterproofing",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfjFjgChEiqPnsDAWIM9ufh-hf_rhS9QxKF7cpV_chHYAthH8&s"
    },
    {
      title: "Hayat Regency, Boudha",
      description: "Old Slope roof dismantle and waterproofing",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCMON0IFH_NqTUbHLLDXMXgszAQ3K2npT9PXRIYKqsqKvIQyGp&s"
    },
    {
      title: "Hotel View, Bhaktapur",
      description: "Swimming pool waterproofing",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WwKEEL6exZ42c2wmM3NRv-QtZ9qjcHc-JKyp6VUvlCHegyta&s"
    },
    {
      title: "Sarathi hotel, Dhulikhel",
      description: "Membranous waterproofing treatment and hole seal",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQoS7rgFBMAxDsAMXMHJhEcbHAXzOjPB0m74bGhCqXRLMllWZ&s"
    }
    ,
    {
      title: "Le-Sherpa Hotel",
      description: "Waterproofing works and Pressure injection Grouting",
      image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7peE9z-4Qp1XRhNzvHpNTz_I-4m0JlQHkiIz4l5pUJIf2wg&s"
    }
  ];
 
  return (
    <section className="significant-projects  h-fit ">
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