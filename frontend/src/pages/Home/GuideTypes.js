

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../../auth/api_two';
import Nav from '../../components/Home/Nav';
import Footer from '../../components/Home/Footer';
import { Fade } from 'react-awesome-reveal';

const GuideTypes = () => {
  const { guide_id } = useParams();
  const [guideTypes, setGuideTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchGuideTypes = async () => {
      try {
        console.log('Guide ID:', guide_id);
        const response = await fetchApi('get', `guideType/${guide_id}`);
        setGuideTypes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGuideTypes();
  }, [guide_id]);

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const [expandedGuideId, setExpandedGuideId] = useState(null);

  const toggleExpandGuide = (id) => {
    setExpandedGuideId(id === expandedGuideId ? null : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Nav />
      <main className="">
        <div className="main-guide mx-auto lg:w-4/5 ">
          <div className="content  my-6  ">
            <Fade direction="left" cascade>
              <h1 className="text-start px-4  text-3xl lg:text-4xl xl:text-5xl tracking-wide font-bold text-blue-400  ">
                Guide Types
              </h1>
            </Fade>
            <Fade direction="right" cascade delay={1000}>
              <div className="my-6 bg-gradient-to-b from-blue-200 to-blue-500">
                <div className="px-4 grid place-items-end shadow-2xl rounded-md py-28">
                  <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl tracking-wider">
                    Find your problem step wise solutions here.
                  </h1>
                  <h2 className="text-white font-semibold text-xl md:text-2xl lg:text-3xl tracking-wider mt-6">
                  Advanced Repair Techniques
                  </h2>
                  <p className="mt-6 text-white">
                  Take your repair skills to the next level with our advanced techniques guide.
                  </p>
                 
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </main>

      <div className="grid grid-cols-3  mx-auto px-4 lg:w-4/5 my-16 ">
        <hr className="border-2 mt-2  border-black" />
        <p className="text-center text-blue-500 text-lg font-semibold tracking-wider ">
          View your solution here
        </p>
        <hr className="border-2 mt-2 border-black" />
      </div>

      <div className="mx-auto px-4 mt-6 lg:w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-7 mt-6">
          {guideTypes.map((guideType, index) => (
            <div key={guideType.id} className={`bg-white my-6 shadow-md rounded-md overflow-hidden transform transition duration-300 ease-in-out delay-${index * 100} opacity-100 hover:shadow-lg hover:scale-105`}>
              <img src={`${URL}${guideType.guideTypes_image}`} alt="GuideType Image" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-lg capitalize text-gray-700 text-center font-semibold mb-2">{guideType.name}</h3>
                <div className='my-6'>
                  <label className='text-lg md:text-1xl overflow-hidden lg:text-xl font-semibold text-gray-800'>Description:</label>
                  <p className={`text-gray-600 mt-1 mb-6 md:-ml-0 rounded-md ${expandedGuideId !== guideType.id ? 'max-h-20 overflow-y-hidden': 'max-h-40 overflow-y-auto'}`}>
                    {expandedGuideId === guideType.id ? guideType.description : truncate(guideType.description, 30)}
                  </p>
                  {guideType.description.length > 1 && (
                    <button
                      className="text-white hover:text-blue-500 font-semibold hover:bg-gray-900 bg-gray-600 px-4 py-2 rounded-sm focus:outline-none"
                      onClick={() => toggleExpandGuide(guideType.id)}
                    >
                      {expandedGuideId === guideType.id ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/guideStep/${guideType.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full text-center rounded-sm transition duration-300"
                  >
                    View Steps
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

export default GuideTypes;
