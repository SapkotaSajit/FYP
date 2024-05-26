import React from "react";
import { Fade } from "react-awesome-reveal";

const NotableProjects = () => {
      const projects = [
        {
          title: "Gokarna Forest Resort, Gokarneshwor (2011)",
          description:
            "Project regarding new cost coating for terrace and terrace repair were conducted",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKoo6gHATKMSNNnoEHoiIYfWHU9Jnds9JT7gK_Fbs2V_JjvQM&s"
        },
        {
          title: "Ullens School, Khumaltar (2013)",
          description:
            "Terrace, bathrooms, watertanks waterproofing along with cracks treatment after earthquake in 2015",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRls_-TV9m19kbh2rORAZYg5Ir5JvXf5sFyQFDciOFXQh31l5kY&s"
        },
        {
          title: "Lincoln School, Kalanki (2013)",
          description:
            "Waterproofing at swimming pool and watertanks waterproofing along with lift areas.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvCqQvlS4vzEkEoqe-bXNtcctrP8_Ag6xkMyQ5NJ86vGBWVV-&s"
        },
        {
          title: "Soaltee Crown plaza, Soltimod (2015)",
          description:
            "Renovation works, swimming pool treatments, expansion joints etc.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqpdklisn3jUiuO1xeE8FswS1Fe1f7_DfYJt5Mh4rXXQ-Ne1L&s"
        },
        {
          title: "Hill View Housing, Balkumari (2017)",
          description:
            "Complete waterproofing at residential building, terrace, bathroom and balcony.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMC91rH8H74019RLfcpxLa4irU4FnseFj28zR8vznbt8aFzWX&s"
        },
        {
          title: "KGH Hotel, Thamel(2020)",
          description:
            "Waterproofing at hotel terrace,bathrooms.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl6v3g7EVMNqyQc8DjVfIHZWMgiidSiaUl7-MUcgfywmIEGZcO&s"
        },
        {
          title: "National Health Care(2018)",
          description:
            "Torchshield waterproofing at terrace and waterproofing treatment at the building.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHnUIXo2nfYSVwrydB2-wA_bbi5Paa6CN1FLzCtOYFQ5Jgs8&s"
        },
        {
          title: "United Traders Syndicate(Toyota), Dhumbarahi(2017)",
          description:
            "Basement, terrace, bathroom waterproofing at the building. ",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxgfFqapucOT9_hnmYMgVWnLyNO7mTaYXoKYxRytoEUrvSAA&s"
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
                <div className="contain shadow-2xl h-[100%] rounded-lg p-8 duration-700 hover:scale-110 my-6">
                  <img src={project.image} alt="project image" className="w-full h-96" />
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