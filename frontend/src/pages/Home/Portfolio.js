import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import SignificantProjects from "../../components/Home/SignificantProjects";
import NotableProjects from "../../components/Home/NotableProjects";
import { Fade } from "react-awesome-reveal";
import ConstructionPartners from "../../components/Home/ConstructionPartners";
import { HiCollection, HiOutlineCube, HiCheckCircle } from "react-icons/hi";

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/portfolios",
        );
        setPortfolios(response.data || []);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const notableProjects = portfolios.filter((p) => p.category === "notable");
  const significantProjects = portfolios.filter(
    (p) => p.category === "significant",
  );
  const partners = portfolios.filter((p) => p.category === "partner");
  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />
      <main className="pt-32 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Fade direction="up" triggerOnce>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100">
                <HiOutlineCube /> Architectural Gallery
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Our <span className="text-blue-600">Legendary</span> Portfolio
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                Showcasing the structural projects where our waterproofing
                integrity meets world-class construction.
              </p>
            </Fade>
          </div>

          <div className="glass rounded-[3rem] border border-slate-200/60 p-12 shadow-sm bg-white/40 mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10 justify-center">
                <div className="h-px bg-slate-200 w-12"></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                  Institutional Partners
                </h3>
                <div className="h-px bg-slate-200 w-12"></div>
              </div>
              <ConstructionPartners partners={partners} />
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white border-y border-slate-100 py-10">
        <NotableProjects projects={notableProjects} />
      </section>

      <section className="py-20 lg:py-32">
        <SignificantProjects projects={significantProjects} />
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/10 skew-x-12 translate-x-64 group-hover:translate-x-32 transition-transform duration-1000"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Ready to fortify your next structure?
              </h2>
              <p className="text-slate-400 text-lg">
                Join our list of high-profile partners and experience the peace
                of mind that comes with zero-leakage guarantees.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 px-10 py-5 bg-blue-600 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-600 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
            >
              Get Integrated
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Portfolio;
