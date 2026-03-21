import { Fade } from "react-awesome-reveal";
import React from "react";
const SignificantProjects = ({ projects: dynamicProjects }) => {
  const staticProjects = [
    {
      title: "Dwarika hotel, Dhulikhel",
      description: "Swimming pool and water tanks waterproofing",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfjFjgChEiqPnsDAWIM9ufh-hf_rhS9QxKF7cpV_chHYAthH8&s",
    },
    {
      title: "Hayat Regency, Boudha",
      description: "Old Slope roof dismantle and waterproofing",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCMON0IFH_NqTUbHLLDXMXgszAQ3K2npT9PXRIYKqsqKvIQyGp&s",
    },
    {
      title: "Hotel View, Bhaktapur",
      description: "Swimming pool waterproofing",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WwKEEL6exZ42c2wmM3NRv-QtZ9qjcHc-JKyp6VUvlCHegyta&s",
    },
    {
      title: "Sarathi hotel, Dhulikhel",
      description: "Membranous waterproofing treatment and hole seal",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQoS7rgFBMAxDsAMXMHJhEcbHAXzOjPB0m74bGhCqXRLMllWZ&s",
    },
    {
      title: "Le-Sherpa Hotel",
      description: "Waterproofing works and Pressure injection Grouting",
      image:
        " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7peE9z-4Qp1XRhNzvHpNTz_I-4m0JlQHkiIz4l5pUJIf2wg&s",
    },
  ];

  const projects =
    dynamicProjects && dynamicProjects.length > 0
      ? dynamicProjects.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image}`,
        }))
      : staticProjects;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <Fade key={index} direction="up" duration={1000} triggerOnce>
            <div className="group bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 h-full hover:-translate-y-2">
              <div className="h-64 bg-white flex items-center justify-center overflow-hidden border-b border-slate-100 p-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors capitalize">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};
export default SignificantProjects;
