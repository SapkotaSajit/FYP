import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";

const Guide = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [expandedGuideId, setExpandedGuideId] = useState(null);
  const URL = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/`;

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetchApi("get", "guides");
        setGuides(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGuide();
  }, []);

  const toggleExpandGuide = (guideId) => {
    setExpandedGuideId(expandedGuideId === guideId ? null : guideId);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10"></div>
            <div className="relative z-20 px-8 py-24 md:px-16 md:py-32 flex flex-col items-start max-w-3xl">
              <Fade direction="up" triggerOnce>
                <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                  Expert Repair Knowledge
                </span>
                <h1 className="text-3xl md:text-7xl font-black text-white leading-tight md:leading-[1.05] mb-6 md:mb-8 tracking-tight text-left">
                  The Ultimate{" "}
                  <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
                    Repair
                  </span>{" "}
                  Library
                </h1>
                <p className="text-slate-300 text-sm md:text-xl font-medium leading-relaxed mb-8 md:mb-10 max-w-xl">
                  Learn to fix anything with our step-by-step professional
                  guides. From minor leaks to major structural repairs, we've
                  got you covered.
                </p>
                <div className="flex flex-wrap gap-4">
                  {/* <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <span className="text-2xl font-black text-blue-500 tracking-tighter">
                      100+
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Detailed
                      <br />
                      Guides
                    </span>
                  </div> */}
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <span className="text-2xl font-black text-blue-500 tracking-tighter">
                      24/7
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Support
                      <br />
                      Access
                    </span>
                  </div>
                </div>
              </Fade>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
              <div className="w-full h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              What are you fixing <span className="text-blue-600">today?</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Select a category below to browse professional repair solutions.
            </p>
          </div>
          <div className="h-0.5 flex-1 bg-slate-200 mb-3 mx-8 hidden lg:block"></div>
          {error && (
            <div className="text-blue-600 animate-pulse font-bold tracking-widest text-[10px] uppercase">
              Refreshing data...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {guides.map((Guide, index) => (
            <Fade key={Guide.id} direction="up" delay={index * 100} triggerOnce>
              <div className="group bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col hover:-translate-y-2 h-full">
                <div className="relative h-64 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={`${URL}${Guide.image_url}`}
                    alt={Guide.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 glass border border-white/40 text-[10px] font-black text-slate-900 uppercase tracking-widest rounded-xl shadow-lg backdrop-blur-md">
                      Category
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 capitalize group-hover:text-blue-600 transition-colors">
                    {Guide.name}
                  </h3>

                  <div className="flex-1">
                    <p
                      className={`text-slate-500 text-sm leading-relaxed mb-8 transition-all duration-500 ${expandedGuideId === Guide.id ? "max-h-[1000px] opacity-100" : "max-h-20 opacity-80 overflow-hidden"}`}
                    >
                      {Guide.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <button
                        onClick={() => toggleExpandGuide(Guide.id)}
                        className="text-slate-400 hover:text-blue-600 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        {expandedGuideId === Guide.id
                          ? "Show Less"
                          : "Read Description"}
                      </button>

                      <Link
                        to={`/guideType/${Guide.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-95"
                      >
                        Explore Topics
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guide;
