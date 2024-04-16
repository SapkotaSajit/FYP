
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../../auth/api_two";
import Nav from "../../components/Home/Nav";
import { Fade } from "react-awesome-reveal";
import Footer from "../../components/Home/Footer";

const ServiceDetails = () => {
  const { parentId } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  const toggleExpandService = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, expanded: !service.expanded }
          : service
      )
    );
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchApi("get", `parentServices/${parentId}`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchServices();
  }, [parentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Nav />

      <main className="heading  shadow-2xl">
        <div className="main grid  px-4 place-items-center  h-[80dvh]">
          <div className="content lg:w-4/5 lg:mx-auto px-4   ">
            <Fade direction="left"  cascade>
            <h1 className="text-xl  md:text-3xl lg:text-4xl font-bold tracking-wider border-t-8 w-fit border-blue-500 py-6 ">
              Request Service <span className="text-blue-500">Today!</span>
            </h1>
            </Fade>
            <Fade direction="right" cascade>
            <p className="mb-6 text-gray-700 tracking-wide">
              Our Expert are ready to take care of your home comfort needs!
            </p>
            </Fade>
            <Fade direction="down" cascade>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider  border-blue-500 py-6 ">
              Ask the Expert 
            </h1>
            </Fade>
            <Fade direction="up" cascade>
            <h1 className="text-xl  md:text-3xl lg:text-4xl font-bold tracking-wider  border-blue-500 py-6 ">
               <span className="text-blue-500">Savings</span> For you
            </h1>
            </Fade>
            <Fade direction="right" cascade>
              <a href="#service-type"><button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-sm ">See All Services</button></a>
             </Fade>
          </div>
        </div>
      </main>

      <div id="service-type" className="grid grid-cols-1 mt-36 px-4 md:grid-cols-2   gap-6 xl:w-4/5 mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-xl overflow-hidden relative"
          >
            <div className="relative hover:scale-110 rounded-xl hover:rounded-xl overflow-hidden">
              <img
                src={`${URL}${service.service_image}`}
                alt="Service Image"
                className="w-full h-60 object-cover object-center  duration-1000 transform hover:scale-105"
                title={service.name}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg md:text-xl lg:text-2xl text-center font-semibold my-4 capitalize">
                {service.name}
              </h3>
              <div
                className={`text-gray-800 mb-4 ${
                  service.expanded
                    ? "max-h-80 overflow-y-auto"
                    : "max-h-40 overflow-hidden"
                }`}
              >
                {service.expanded ? (
                  <p className="px-4 text-justify tracking-normal">{service.description}</p>
                ) : (
                  <p>{service.description.slice(0, 66)}...</p>
                )}
              </div>
              <div className="flex justify-between mx-4 my-6">
                <button
                  className="text-white hover:text-blue-500 font-semibold w-fit hover:bg-gray-900 bg-gray-600 px-4  py-2  rounded-sm focus:outline-none"
                  onClick={() => toggleExpandService(service.id)}
                >
                  {service.expanded ? "Show Less" : "Read More"}
                </button>

                <Link
                  to={`/booking/${service.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                >
                  Book Service
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
