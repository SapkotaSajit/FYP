import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import {
  HiLightningBolt,
  HiShieldCheck,
  HiOutlineSparkles,
  HiArrowRight,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

const ServiceDetails = () => {
  const { parentId } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || "http://localhost:5000"}`}/`;

  const toggleExpandService = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, expanded: !s.expanded } : s)),
    );
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchApi("get", `parentServices/${parentId}`);
        setServices(
          (response.data || []).map((s) => ({ ...s, expanded: false })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [parentId]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Loading specialized solutions...
        </p>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />

      {/* Hero Header */}
      <header className="relative pt-32 pb-24 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8 border border-blue-400/30 backdrop-blur-md">
              <HiOutlineSparkles /> Specialized Expertise
            </div>
            <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-8 leading-tight md:leading-[1.1] tracking-tight">
              Request Service{" "}
              <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
                Today
              </span>
            </h1>
            <p className="text-sm md:text-xl text-slate-300 mb-6 md:mb-10 font-medium leading-relaxed">
              Our elite engineering team is ready to deploy advanced
              waterproofing systems tailored to your specific architectural
              needs.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                  <HiShieldCheck size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Security
                  </p>
                  <p className="font-bold text-sm">Insured Experts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 border border-amber-500/30">
                  <HiLightningBolt size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Response
                  </p>
                  <p className="font-bold text-sm">24h Deployment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section
        id="service-type"
        className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col items-stretch h-full"
            >
              <div className="w-full relative h-48 md:h-64 overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
                <img
                  src={`${URL}${service.service_image}`}
                  alt={service.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-slate-200 text-[8px] font-black text-slate-900 uppercase tracking-widest rounded-lg shadow-sm">
                    Premium
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-10 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 capitalize group-hover:text-blue-600 transition-colors tracking-tight">
                  {service.name}
                </h3>

                <div
                  className={`text-slate-500 text-sm leading-relaxed mb-8 transition-all duration-500 ${service.expanded ? "max-h-[500px] opacity-100" : "max-h-12 opacity-80 overflow-hidden"}`}
                >
                  <p>{service.description}</p>
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 md:pt-6">
                    <button
                      onClick={() => toggleExpandService(service.id)}
                      className="text-slate-400 hover:text-blue-600 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      {service.expanded ? (
                        <>
                          <HiChevronUp /> Collapse
                        </>
                      ) : (
                        <>
                          <HiChevronDown /> Description
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/booking/${service.id}`}
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center gap-2"
                      >
                        Book Now <HiArrowRight />
                      </Link>

                      <a
                        href={`https://wa.me/9841435289?text=${encodeURIComponent(`Hello, I would like to inquire about the service: ${service.name}. Link: ${window.location.origin}/booking/${service.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95 flex items-center"
                        title="Query on WhatsApp"
                      >
                        <FaWhatsapp size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
