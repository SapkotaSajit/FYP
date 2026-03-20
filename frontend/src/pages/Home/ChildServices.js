import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import { Fade } from "react-awesome-reveal";
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
  const URL = "http://localhost:5000/";

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
      <header className="relative py-24 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Fade direction="left" triggerOnce>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-blue-400/30 backdrop-blur-md">
                <HiOutlineSparkles /> Specialized Expertise
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                Request Service{" "}
                <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
                  Today
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 font-medium leading-relaxed">
                Our elite engineering team is ready to deploy advanced
                waterproofing systems tailored to your specific architectural
                needs.
              </p>
              <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <HiShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Security
                    </p>
                    <p className="font-bold text-sm">Insured Experts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 border border-amber-500/30">
                    <HiLightningBolt size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Response
                    </p>
                    <p className="font-bold text-sm">24h Deployment</p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section id="service-type" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-[3rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col md:flex-row h-full md:h-72"
            >
              <div className="w-full md:w-2/5 relative overflow-hidden h-60 md:h-auto">
                <img
                  src={`${URL}${service.service_image}`}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-black text-slate-900 mb-4 capitalize group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>

                <div
                  className={`text-slate-500 text-xs leading-relaxed mb-6 transition-all duration-500 ${service.expanded ? "max-h-40 overflow-y-auto" : "max-h-12 overflow-hidden"}`}
                >
                  <p>{service.description}</p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <button
                    onClick={() => toggleExpandService(service.id)}
                    className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center gap-1"
                  >
                    {service.expanded ? (
                      <>
                        <HiChevronUp /> Less
                      </>
                    ) : (
                      <>
                        <HiChevronDown /> More
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-50">
                    <Link
                      to={`/booking/${service.id}`}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center justify-center gap-2"
                    >
                      Book Now <HiArrowRight />
                    </Link>

                    <a
                      href={`https://wa.me/9841435289?text=${encodeURIComponent(`Hello, I would like to inquire about the service: ${service.name}. Link: ${window.location.origin}/booking/${service.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95 flex items-center justify-center"
                      title="Query on WhatsApp"
                    >
                      <FaWhatsapp size={18} />
                    </a>
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
