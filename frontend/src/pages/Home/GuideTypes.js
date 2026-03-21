import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";

const GuideTypes = () => {
  const { guide_id } = useParams();
  const [guideTypes, setGuideTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchGuideTypes = async () => {
      try {
        console.log("Guide ID:", guide_id);
        const response = await fetchApi("get", `guideType/${guide_id}`);
        setGuideTypes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGuideTypes();
  }, [guide_id]);

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const [expandedGuideId, setExpandedGuideId] = useState(null);

  const toggleExpandGuide = (id) => {
    setExpandedGuideId(id === expandedGuideId ? null : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />

      {/* Hero Header */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] p-12 md:p-20 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center md:text-left">
              <Fade direction="up" triggerOnce>
                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100 shadow-sm">
                  Sub-Categories
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
                  Specific <span className="text-blue-600">Repair</span> Topics
                </h1>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  Drill down into specific repair types to find the exact
                  instructions you need.
                </p>
              </Fade>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {guideTypes.map((guideType, index) => (
            <Fade
              key={guideType.id}
              direction="up"
              delay={index * 100}
              triggerOnce
            >
              <div className="group bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col hover:-translate-y-2 h-full">
                <div className="relative h-64 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={`${URL}${guideType.guideTypes_image}`}
                    alt={guideType.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 glass border border-white/40 text-[10px] font-black text-slate-900 uppercase tracking-widest rounded-xl shadow-lg backdrop-blur-md">
                      Type
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 capitalize group-hover:text-blue-600 transition-colors">
                    {guideType.name}
                  </h3>

                  <div className="flex-1">
                    <p
                      className={`text-slate-500 text-sm leading-relaxed mb-8 transition-all duration-500 ${expandedGuideId === guideType.id ? "max-h-[1000px] opacity-100" : "max-h-20 opacity-80 overflow-hidden"}`}
                    >
                      {guideType.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <button
                        onClick={() => toggleExpandGuide(guideType.id)}
                        className="text-slate-400 hover:text-blue-600 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        {expandedGuideId === guideType.id
                          ? "Show Less"
                          : "Read Description"}
                      </button>

                      <Link
                        to={`/guideStep/${guideType.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-95"
                      >
                        View Steps
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuideTypes;
