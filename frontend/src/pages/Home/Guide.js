import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";

const Guide = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [expandedGuideId, setExpandedGuideId] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetchApi("get", "guides");
        setGuides(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGuide();
  }, []);

  const toggleExpandGuide = (guideId) => {
    setExpandedGuideId(expandedGuideId === guideId ? null : guideId);
  };

  return (
    <div>
      <Nav />
      {error && <div className="text-blue-500">Loading......</div>}

      <main className="">
        <div className="main-guide mx-auto lg:w-4/5 ">
          <div className="content  my-6  ">
            <Fade direction="left" triggerOnce>
              <h1 className="text-start px-4  text-3xl lg:text-4xl xl:text-5xl tracking-wide font-bold text-blue-400  ">
                Repair Guides
              </h1>
            </Fade>
            <Fade direction="right" triggerOnce delay={1000}>
              <div className="my-6 bg-gradient-to-b from-blue-200 to-blue-500">
                <div className="px-4 grid place-items-end shadow-2xl rounded-md py-28">
                  <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl tracking-wider">
                    First time repairing?
                  </h1>
                  <p className="mt-6 text-white">
                    Learn To fix just about anything.
                  </p>
                  <h2 className="text-white font-semibold text-xl md:text-2xl lg:text-3xl tracking-wider mt-6">
                    You got this.
                  </h2>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </main>
      <div className="grid grid-cols-3  mx-auto px-4 lg:w-4/5 my-16 ">
        <hr className="border-2 mt-2  border-black" />
        <p className="text-center text-blue-500 text-lg font-semibold tracking-wider ">
          What do you want to fix today?
        </p>
        <hr className="border-2 mt-2 border-black" />
      </div>

      <div className="mx-auto  px-4 mt-6 lg:w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
          {guides.map((Guide, index) => (
            <div
              key={Guide.id}
              className={`bg-white my-6 shadow-md rounded-md overflow-hidden transform transition duration-300 ease-in-out delay-${
                index * 100
              } opacity-100 hover:shadow-lg hover:scale-105`}
            >
              <img
                src={`${URL}${Guide.image_url}`}
                alt="Guide Image"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg capitalize text-gray-700  text-center font-semibold mb-2">
                  {Guide.name}
                </h3>
                <div className="my-6">
                  <label className="text-lg md:text-1xl overflow-hidden lg:text-xl font-semibold text-gray-800">
                    Description:
                  </label>
                  <p
                    className={`text-gray-600 mt-1 mb-6 md:-ml-0 rounded-md ${
                      expandedGuideId !== Guide.id
                        ? "max-h-20 overflow-y-hidden"
                        : "max-h-40 overflow-y-auto"
                    }`}
                  >
                    {expandedGuideId === Guide.id
                      ? Guide.description
                      : `${Guide.description.slice(0, 30)}${
                          Guide.description.length > 20 ? "..." : ""
                        }`}
                  </p>
                  {Guide.description.length > 1 && (
                    <button
                      className="text-white  hover:text-blue-500 font-semibold hover:bg-gray-900 bg-gray-600 px-4 py-2 rounded-sm focus:outline-none"
                      onClick={() => toggleExpandGuide(Guide.id)}
                    >
                      {expandedGuideId === Guide.id ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/guideType/${Guide.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full text-center rounded-sm transition duration-300"
                  >
                    View Guides
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Guide;
