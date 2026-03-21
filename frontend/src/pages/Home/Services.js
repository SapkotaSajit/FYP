import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";
import ServiceSlider from "../../components/Home/ServiceSlider";
import {
  HiCollection,
  HiArrowRight,
  HiChevronDown,
  HiChevronUp,
  HiInformationCircle,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

const AllServicesWithParent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchServicesWithParent = async () => {
      try {
        const response = await fetchApi("get", "servicesWithNullParent");
        setServices(
          (response.data || []).map((s) => ({ ...s, expanded: false })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesWithParent();
  }, []);

  const toggleExpandService = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, expanded: !s.expanded } : s)),
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />
      <ServiceSlider />

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10"></div>
            <div className="relative z-20 px-8 py-24 md:px-16 md:py-32 flex flex-col items-start max-w-3xl">
              <Fade direction="up" triggerOnce>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                  Professional Solutions
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tight">
                  World-class{" "}
                  <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
                    Waterproofing
                  </span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                  From chemical injection to structural membrane installation,
                  our advanced methods protect your investment from the inside
                  out.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <span className="text-2xl font-black text-blue-500 tracking-tighter">
                      15+
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Years of
                      <br />
                      Excellence
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <span className="text-2xl font-black text-blue-500 tracking-tighter">
                      500+
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Projects
                      <br />
                      Completed
                    </span>
                  </div>
                </div>
              </Fade>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block opacity-20">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-[450px] bg-slate-200 animate-pulse rounded-[2.5rem]"
                ></div>
              ))
          ) : services.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <HiInformationCircle
                size={64}
                className="mx-auto text-slate-200 mb-4"
              />
              <p className="text-slate-400 font-bold uppercase tracking-widest">
                No services found in our catalog
              </p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col hover:-translate-y-2"
              >
                <div className="relative h-64 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={`${URL}${service.service_image}`}
                    alt={service.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-6 transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 glass border border-white/40 text-[10px] font-black text-slate-900 uppercase tracking-widest rounded-xl shadow-lg backdrop-blur-md">
                      Premium Service
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 capitalize group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>

                  <div
                    className={`text-slate-500 text-sm leading-relaxed mb-8 transition-all duration-500 ${service.expanded ? "max-h-[1000px] opacity-100" : "max-h-12 opacity-80 overflow-hidden"}`}
                  >
                    <p>{service.description}</p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <button
                        onClick={() => toggleExpandService(service.id)}
                        className="text-slate-400 hover:text-blue-600 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        {service.expanded ? (
                          <>
                            Collapse <HiChevronUp />
                          </>
                        ) : (
                          <>
                            Details <HiChevronDown />
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/childServices/${service.id}`}
                          className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center gap-2"
                        >
                          Learn More <HiArrowRight />
                        </Link>

                        <a
                          href={`https://wa.me/9841435289?text=${encodeURIComponent(`Hello, I would like to inquire about the service: ${service.name}. Link: ${window.location.origin}/childServices/${service.id}`)}`}
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
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllServicesWithParent;
