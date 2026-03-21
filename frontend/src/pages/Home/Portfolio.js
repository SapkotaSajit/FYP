import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import SignificantProjects from "../../components/Home/SignificantProjects";
import NotableProjects from "../../components/Home/NotableProjects";
import { Fade } from "react-awesome-reveal";
import ConstructionPartners from "../../components/Home/ConstructionPartners";
import {
  HiCollection,
  HiOutlineCube,
  HiCheckCircle,
  HiArrowRight,
} from "react-icons/hi";

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

      {/* Hero Section */}
      <main className="pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10"></div>
            <div className="relative z-20 px-8 py-24 md:px-16 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
              <Fade direction="up" triggerOnce>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                  <HiOutlineCube /> Architectural Gallery
                </div>
                <h1 className="text-3xl md:text-7xl font-black text-white leading-tight md:leading-[1.05] mb-6 md:mb-8 tracking-tight">
                  Our{" "}
                  <span className="text-blue-600 underline decoration-blue-500/30 underline-offset-8">
                    Legendary
                  </span>{" "}
                  Portfolio
                </h1>
                <p className="text-slate-300 text-sm md:text-xl font-medium leading-relaxed mb-8 md:mb-10 max-w-2xl">
                  Showcasing the structural projects where our waterproofing
                  integrity meets world-class construction. A testament to
                  engineering excellence.
                </p>
                <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10 w-full">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-blue-500 tracking-tighter">
                      100%
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      Leakage Free
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-blue-500 tracking-tighter">
                      10k+
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      Protected Homes
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-blue-500 tracking-tighter">
                      Premium
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      Grade Materials
                    </span>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Partners Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="glass rounded-[3rem] border border-slate-200/60 p-12 md:p-20 shadow-sm bg-white/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16 justify-center">
              <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">
                Institutional Partners
              </h3>
              <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
            </div>
            <ConstructionPartners partners={partners} />
          </div>
        </div>
      </section>

      {/* Notable Projects Section */}
      <section className="bg-white border-y border-slate-100 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Notable <span className="text-blue-600">Projects</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Major milestones in structural protection and architectural
              integrity.
            </p>
          </div>
        </div>
        <NotableProjects projects={notableProjects} />
      </section>

      {/* Significant Projects Section */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-right">
          <div className="max-w-xl ml-auto">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Significant <span className="text-blue-600">Milestones</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Specialized solutions delivered for diverse waterproofing
              challenges.
            </p>
          </div>
        </div>
        <SignificantProjects projects={significantProjects} />
      </section>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-blue-600/10 skew-x-12 translate-x-64 group-hover:translate-x-32 transition-transform duration-1000"></div>
          <div className="relative z-10 flex flex-col lg:row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                Ready to fortify your next structure?
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed">
                Join our list of high-profile partners and experience the peace
                of mind that comes with zero-leakage guarantees.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-blue-600 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center gap-3"
            >
              Get Integrated <HiArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Portfolio;
