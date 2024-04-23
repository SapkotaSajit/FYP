import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";
import ServiceSlider from "../../components/Home/ServiceSlider";

const AllServicesWithParent = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchServicesWithParent = async () => {
      try {
        const response = await fetchApi("get", "servicesWithNullParent");
        setServices(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServicesWithParent();
  }, []);

  const toggleExpandService = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, expanded: !service.expanded }
          : service
      )
    );
  };

  return (
    <div className="">
      <Nav />
      <ServiceSlider />
      {error && <div className="text-blue-500">Loading...</div>}
      <div id= "our-service" className="info xl:w-4/5 mx-auto text-center my-12 mt-36 px-4 ">
        
        <div className="main text-3xl md:text-3xl lg:text-5xl text-gray-700 font-bold tracking-wider">
        <a href="#our-service">
        <h2>
            We offer all kinds of professional modern waterproofing services
          </h2>
        </a>
          
        </div>
        <div className="main-child my-6">
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt laboredolore magna suspendisse ultrices
            gravida.
          </p>
        </div>
      </div>

      <main className="main-service h-fit mt-36">
        <div className="service-heading">
        <a href="#service-section">
          <h2 className="text-center mb-16 text-3xl lg:text-4xl xl:text-5xl tracking-wide font-bold text-blue-400 ">
            Our Services
          </h2>
        </a>
        <div className="grid grid-cols-1 my-6 px-4 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:w-4/5 mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-md shadow-md overflow-hidden relative flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${URL}${service.service_image}`}
                  alt="Service Image"
                  className="w-full h-60  object-cover object-center  duration-1000 transform hover:scale-110"
                  title={service.name}
                />

                <div className="p-4">
                  <h3 className="text-xl text-center capitalize font-semibold">
                    {service.name}
                  </h3>
                </div>
                <div className={`text-center text-gray-800 mb-4 ${service.expanded ? 'max-h-80 overflow-y-auto' : 'max-h-40 overflow-hidden'}`}>
                  {service.expanded ? (
                    <p className="px-4 text-justify tracking-normal ">{service.description}</p>
                  ) : (
                    <p>{service.description.slice(0, 30)}...</p>
                  )}
                </div>
                <div className="flex justify-between  mx-4 my-6">
                  {service.description.length > 1 && (
                    <button
                      className="text-white hover:text-blue-500 font-semibold w-fit hover:bg-gray-900 bg-gray-600 px-4  py-2  rounded-sm focus:outline-none"
                      onClick={() => toggleExpandService(service.id)}
                    >
                      {service.expanded ? "Show Less" : "Read More"}
                    </button>
                  )}

                  <Link
                    to={`/childServices/${service.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-fit text-center rounded-sm transition duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
};

export default AllServicesWithParent;
