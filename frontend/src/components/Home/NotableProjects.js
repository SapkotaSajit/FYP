import React from "react";
import { Fade } from "react-awesome-reveal";

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
        <main className="project space-y-16 h-fit mt-36">
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
    
    export default NotableProjects;