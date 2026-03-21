import React from "react";
import { Fade } from "react-awesome-reveal";

const NotableProjects = ({ projects: dynamicProjects }) => {
  const staticProjects = [
    {
      title: "Gokarna Forest Resort, Gokarneshwor (2011)",
      description:
        "Project regarding new cost coating for terrace and terrace repair were conducted",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKoo6gHATKMSNNnoEHoiIYfWHU9Jnds9JT7gK_Fbs2V_JjvQM&s",
    },
    {
      title: "Ullens School, Khumaltar (2013)",
      description:
        "Terrace, bathrooms, watertanks waterproofing along with cracks treatment after earthquake in 2015",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRls_-TV9m19kbh2rORAZYg5Ir5JvXf5sFyQFDciOFXQh31l5kY&s",
    },
    {
      title: "Lincoln School, Kalanki (2013)",
      description:
        "Waterproofing at swimming pool and watertanks waterproofing along with lift areas.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvCqQvlS4vzEkEoqe-bXNtcctrP8_Ag6xkMyQ5NJ86vGBWVV-&s",
    },
    {
      title: "Soaltee Crown plaza, Soltimod (2015)",
      description:
        "Renovation works, swimming pool treatments, expansion joints etc.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqpdklisn3jUiuO1xeE8FswS1Fe1f7_DfYJt5Mh4rXXQ-Ne1L&s",
    },
    {
      title: "Hill View Housing, Balkumari (2017)",
      description:
        "Complete waterproofing at residential building, terrace, bathroom and balcony.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMC91rH8H74019RLfcpxLa4irU4FnseFj28zR8vznbt8aFzWX&s",
    },
    {
      title: "KGH Hotel, Thamel(2020)",
      description: "Waterproofing at hotel terrace,bathrooms.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl6v3g7EVMNqyQc8DjVfIHZWMgiidSiaUl7-MUcgfywmIEGZcO&s",
    },
    {
      title: "National Health Care(2018)",
      description:
        "Torchshield waterproofing at terrace and waterproofing treatment at the building.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHnUIXo2nfYSVwrydB2-wA_bbi5Paa6CN1FLzCtOYFQ5Jgs8&s",
    },
    {
      title: "United Traders Syndicate(Toyota), Dhumbarahi(2017)",
      description:
        "Basement, terrace, bathroom waterproofing at the building. ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxgfFqapucOT9_hnmYMgVWnLyNO7mTaYXoKYxRytoEUrvSAA&s",
    },
  ];

  const projects =
    dynamicProjects && dynamicProjects.length > 0
      ? dynamicProjects.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/${p.image}`,
        }))
      : staticProjects;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <Fade key={index} direction="up" duration={1000} triggerOnce>
            <div className="group bg-white rounded-[3rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 h-full hover:-translate-y-2">
              <div className="h-80 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 p-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
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

export default NotableProjects;
