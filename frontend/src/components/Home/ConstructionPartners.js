import React from 'react';
import { Fade } from 'react-awesome-reveal';

const ConstructionPartner = ({ name, imageSrc, description }) => {
  return (
    <div className="main md:h-fit my-10 grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
      <div>
        <Fade direction="left" cascade>
          <div className="text-xl my-6 md:text-3xl lg:text-4xl px-4 text-gray-700 font-semibold">
            <p>{name}</p>
          </div>

          <div className="img my-8 mx-4">
            <img
              src={imageSrc}
              className="h-[50vh] w-full object-cover"
              alt="Company Image"
            />
          </div>
        </Fade>
      </div>

      <Fade direction="right" cascade>
        <div className="content px-4 space-y-5">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </Fade>
    </div>
  );
};

const ConstructionPartners = () => {
  const partners = [
    {
      name: "Himalayan Builders and Engineers",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qX5FP9jvrnWPDATKbucgLnmCNc7ojrkyz3aT0jYDgYm9DmI&s",
      description: "Made last it seen went no just when of by. Occasional entreaties comparison me difficulty so themselves. At brother inquiry of offices without do my service. As particular to companions at sentiments. Weather however luckily enquire so certain do. Aware did stood was day under ask. Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased. Towards did colonel article any parties."
    },
    {
      name: "Tripura Construction CO.PVT.LTD",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qX5FP9jvrnWPDATKbucgLnmCNc7ojrkyz3aT0jYDgYm9DmI&s",
      description: "Made last it seen went no just when of by. Occasional entreaties comparison me difficulty so themselves. At brother inquiry of offices without do my service. As particular to companions at sentiments. Weather however luckily enquire so certain do. Aware did stood was day under ask. Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased. Towards did colonel article any parties."
    }
       
  ];

  return (
    <div>
      {partners.map((partner, index) => (
        <ConstructionPartner
          key={index}
          name={partner.name}
          imageSrc={partner.imageSrc}
          description={partner.description}
        />
      ))}
    </div>
  );
};

export default ConstructionPartners;
