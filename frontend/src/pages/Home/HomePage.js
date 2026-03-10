import React from "react";
import Nav from "../../components/Home/Nav";
import Slider from "../../components/Home/Slider";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";
import {
  HiArrowRight,
  HiShieldCheck,
  HiStar,
  HiUsers,
  HiLightningBolt,
} from "react-icons/hi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function HomePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />
      <Slider />

      {/* Hero Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Fade cascade direction="up" triggerOnce>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
                <HiShieldCheck size={16} /> Elite Protection Services
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Expert <span className="text-blue-600">Waterproofing</span>{" "}
                Solutions for Your Peace of Mind
              </h1>
              <div className="flex gap-4 mb-8">
                <div className="w-1.5 bg-blue-600 rounded-full"></div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  At S.D Enterprises, we combine decades of field experience
                  with cutting-edge chemical technology to deliver permanent
                  waterproofing solutions. Protecting your structural integrity
                  is our lifelong mission.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/homeServices"
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1 flex items-center gap-2"
                >
                  Explore Services <HiArrowRight />
                </a>
                <a
                  href="#about-us"
                  className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all hover:-translate-y-1"
                >
                  Our Legacy
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl"></div>
              <div className="glass p-4 rounded-[2.5rem] border border-white/40 shadow-2xl relative z-10 overflow-hidden group">
                <img
                  src="img1 (8).jpg"
                  alt="Work in Progress"
                  className="w-full h-[500px] object-cover rounded-[2rem] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?u=${i}`}
                            alt="Client"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        10k+ Protected Homes
                      </p>
                      <div className="flex text-amber-500 gap-0.5">
                        <HiStar />
                        <HiStar />
                        <HiStar />
                        <HiStar />
                        <HiStar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* About Section */}
      <section
        className="py-24 bg-white relative overflow-hidden"
        id="about-us"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Fade direction="left" triggerOnce>
            <div className="space-y-6">
              <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-sm">
                Industry Authority
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Experience the pinnacle of engineering excellence
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded on principles of durability and trust, S.D Enterprises
                has evolved from a small local specialist into a regional leader
                in structural protection. Our methodology combines rigorous
                scientific testing with precision application techniques that
                standard contractors simply cannot match.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                  <HiLightningBolt className="text-blue-600 mb-3" size={24} />
                  <h4 className="font-bold text-slate-900 mb-1">
                    Fast Execution
                  </h4>
                  <p className="text-xs text-slate-500">
                    Minimal disruption to your daily schedule.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <HiShieldCheck className="text-emerald-600 mb-3" size={24} />
                  <h4 className="font-bold text-slate-900 mb-1">
                    20Y Warranty
                  </h4>
                  <p className="text-xs text-slate-500">
                    Guaranteed protection for decades to come.
                  </p>
                </div>
              </div>
            </div>
          </Fade>

          <Fade direction="right" triggerOnce>
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden group">
                <img
                  src="img1 (6).jpg"
                  alt="Legacy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass p-8 rounded-3xl border border-white/40 shadow-xl max-w-[240px]">
                <p className="text-4xl font-black text-blue-600 mb-1">15+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-tight">
                  Years of Unmatched Expertise
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Founder Message Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
          <Fade direction="up" triggerOnce>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/40 transition-colors"></div>
              <img
                src="https://imgs.search.brave.com/ZCZVL6IUyO83QT2b_oGG3G2y3o1Bod0VxqtS5gy-kR8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/MzcwMTMwNi9waG90/by9zZXJpb3VzLWJ1/c2luZXNzbWFuLWxv/b2tpbmctdGhyb3Vn/aC10aGUtd2luZG93/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1La0JHSjZ0NExn/aUhDTVNNeE1uU3J6/aEhwT3hpNkFNYkps/eUhjUVMta1FzPQ"
                alt="Founder"
                className="w-full max-w-md mx-auto aspect-square object-cover rounded-[4rem] border-4 border-white/10 shadow-2xl skew-y-3 group-hover:skew-y-0 transition-transform duration-700"
              />
            </div>
          </Fade>

          <Fade direction="right" triggerOnce>
            <div className="space-y-8">
              <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                "Our reputation is built on the water we keep out."
              </h2>
              <div className="space-y-4">
                <p className="text-xl font-bold text-blue-400">
                  Mr. Ganesh Dhakal
                </p>
                <p className="text-blue-200/60 font-black uppercase tracking-widest text-xs">
                  Architect & Founder
                </p>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed font-light italic">
                Water damage is more than a structural issue—it's a threat to
                your home's legacy. My mission has always been to provide
                solutions that aren't just patches, but permanent fortresses
                against the elements. We don't just sell services; we sell
                absolute certainty.
              </p>
              <div className="flex gap-4">
                {[FaFacebook, FaTwitter, FaInstagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 bg-white/5 hover:bg-blue-600 rounded-2xl flex items-center justify-center transition-all border border-white/10 hover:border-blue-400 group"
                  >
                    <Icon
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
