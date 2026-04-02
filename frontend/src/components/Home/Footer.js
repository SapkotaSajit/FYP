import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiArrowRight,
} from "react-icons/hi";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-20 mt-20">
      <div className="container mx-auto px-4 lg:w-4/5 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg">
                <span className="text-xl font-bold text-white">S.D</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Enterprises
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Providing professional construction and guide services with a
              commitment to excellence and reliability.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="md:text-center">
            <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              {[
                { label: "About Us", path: "/" },
                { label: "Services", path: "/homeServices" },
                { label: "Guide", path: "/guide" },
                { label: "Portfolio", path: "/portfolio" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-blue-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <HiArrowRight className="text-blue-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:text-right">
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 inline-block text-left">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Naya Baneshwor, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-blue-500 flex-shrink-0" />
                <span className="text-sm">9851037595</span>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-blue-500 flex-shrink-0" />
                <span className="text-sm">ganeshwpdr@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 lg:w-4/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center">
            © {currentYear} S.D Enterprises. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
