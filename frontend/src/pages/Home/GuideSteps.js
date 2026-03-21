import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";

import { Fade } from "react-awesome-reveal";

const GuideSteps = () => {
  const { guideTypes_id } = useParams();
  const [GuideSteps, setGuideSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchGuideSteps = async () => {
      try {
        const response = await fetchApi("get", `guideStep/${guideTypes_id}`);
        setGuideSteps(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGuideSteps();
  }, [guideTypes_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-slate-200 pb-12">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100">
                Step-by-Step Instructions
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                Follow These <span className="text-blue-600">Steps</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium max-w-sm">
              Carefully follow each instruction to ensure a professional-grade
              repair result.
            </p>
          </div>
        </div>
      </section>

      {/* Steps List */}
      <main className="max-w-5xl mx-auto px-6 pb-32">
        {GuideSteps.map((guideStep, index) => (
          <Fade key={guideStep.id} direction="up" triggerOnce>
            <div className="group relative bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Text Content */}
                <div className="lg:col-span-7 p-10 md:p-14 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-blue-200">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 capitalize tracking-tight">
                      {guideStep.name}
                    </h3>
                  </div>

                  <div className="flex-1">
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {guideStep.description}
                    </p>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Instruction Validated
                    </span>
                  </div>
                </div>

                {/* Media Content */}
                <div className="lg:col-span-5 bg-slate-50 flex items-center justify-center h-[400px] lg:h-auto overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100">
                  <img
                    src={`${URL}${guideStep.guideSteps_image}`}
                    alt={guideStep.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default GuideSteps;
