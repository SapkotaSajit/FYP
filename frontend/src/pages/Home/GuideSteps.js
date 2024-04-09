import React, { useState, useEffect } from 'react';
import { useParams ,Link } from 'react-router-dom';
import { fetchApi} from '../../auth/api_two';
import Nav from '../../components/Home/Nav'
import Footer from '../../components/Home/Footer';

import { Fade } from 'react-awesome-reveal';


const GuideSteps = () => {
  const { guideTypes_id } = useParams();
  const [GuideSteps, setGuideSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchGuideSteps = async () => {
      try {
        const response = await fetchApi('get', `guideStep/${guideTypes_id}`);
        setGuideSteps(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGuideSteps();
  }, [guideTypes_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
<div>
  <Nav/>

<div className='flex justify-center items-center'>
  <div className="lg:w-4/5">
    {GuideSteps.map((guideStep, index) => (
      <Fade direction='right' triggerOnce key={guideStep.id} duration={800}>
        <div className="bg-white shadow-lg rounded-md overflow-hidden mt-8 hvr-float-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6">
              <h3 className="text-xl font-semibold capitalize mb-2">Step {index + 1}: {guideStep.name}</h3>
              <p className="text-gray-700 mb-4">{guideStep.description}</p>
            </div>
            <div className=''>
              <img
                src={`${URL}${guideStep.guideSteps_image}`}
                alt="guideStep Image"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </Fade>
    ))}
  </div>
</div>


<Footer/>
</div>

  );
};

export default GuideSteps;
