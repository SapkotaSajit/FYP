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

      {/* Header Section */}
      <section
        id="our-service"
        className="max-w-7xl mx-auto px-6 py-20 mt-12 text-center"
      >
        <Fade cascade direction="up" triggerOnce>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100 shadow-sm">
            <HiCollection /> Professional Solutions
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight max-w-4xl mx-auto">
            World-class <span className="text-blue-600">Waterproofing</span> for
            Modern Structures
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            From chemical injection to structural membrane installation, our
            advanced methods protect your investment from the inside out.
          </p>
        </Fade>
      </section>

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
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${URL}${service.service_image}`}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 glass border border-white/40 text-[10px] font-black text-white uppercase tracking-widest rounded-xl shadow-lg backdrop-blur-md">
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
                        className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors"
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

                      <Link
                        to={`/childServices/${service.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-95"
                      >
                        Learn More <HiArrowRight />
                      </Link>

                      <a
                        href={`https://wa.me/9841435289?text=${encodeURIComponent(`Hello, I would like to inquire about the service: ${service.name}. Link: ${window.location.origin}/childServices/${service.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95"
                        title="Query on WhatsApp"
                      >
                        <FaWhatsapp size={20} />
                      </a>
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
