import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-36 mx-auto   ">
      <div className="container mx-auto lg:w-4/5 py-12 px-4 ">
        <div className="grid grid-cols-1  md:grid-cols-3 mx-auto gap-8  ">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold">S.D Enterprises</h2>
            <p className="text-gray-400 mt-4">Lorem ipsum dolor sit amet consectetur.</p>
            <div className="mt-6 flex space-x-3">
              <a href="#" className="text-white hover:text-blue-500">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-500">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-500">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
          <div className="col-span-2 md:col-span-2">
            <div className="grid  grid-cols-1 md:grid-cols-2  gap-8 ">

            <div className="col-span-1">
                <h3 className="text-xl font-semibold mb-4">Explore</h3>
                <div className="grid grid-cols-1 space-y-4">
                  <a href="/" className="text-gray-400 nav w-fit">About us</a>
                  <a href="homeServices" className="text-gray-400 nav w-fit">Services</a>
                  <a href="guide" className="text-gray-400 nav w-fit">Guide</a>
                  <a href="portfolio" className="text-gray-400 nav w-fit">Portfolio</a>
                  <a href="contact" className="text-gray-400 nav w-fit">Contact</a>
                </div>
              </div>

              <div className="col-span-1">
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                <p className="text-gray-400 mb-2">example@gmail.com</p>
                <p className="text-gray-400 mb-2">+09894u39482</p>
              </div>
             
             
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
      <div className="bg-gray-800 text-center py-4">
        <p className="text-gray-400">© 2024 S.D Enterprises. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
