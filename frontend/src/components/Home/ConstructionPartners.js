import React from "react";
import { Fade } from "react-awesome-reveal";

const ConstructionPartner = ({ name, imageSrc, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-20 last:mb-0">
      <div className="w-full md:w-1/2">
        <Fade direction="left" triggerOnce>
          <div className="relative h-96 lg:h-[500px] bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 flex items-center justify-center shadow-inner group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            <img
              src={imageSrc}
              className="max-w-full max-h-full w-auto h-auto object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
              alt={name}
            />
          </div>
        </Fade>
      </div>

      <div className="w-full md:w-1/2">
        <Fade direction="right" triggerOnce>
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6">
            Official Partner
          </span>
          <h4 className="text-3xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
            {name}
          </h4>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
            {description}
          </p>
        </Fade>
      </div>
    </div>
  );
};

const ConstructionPartners = ({ partners: dynamicPartners }) => {
  const staticPartners = [
    {
      name: "Himalayan Builders and Engineers",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qX5FP9jvrnWPDATKbucgLnmCNc7ojrkyz3aT0jYDgYm9DmI&s",
      description:
        "Made last it seen went no just when of by. Occasional entreaties comparison me difficulty so themselves. At brother inquiry of offices without do my service. As particular to companions at sentiments. Weather however luckily enquire so certain do. Aware did stood was day under ask. Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased. Towards did colonel article any parties.",
    },
    {
      name: "Tripura Construction CO.PVT.LTD",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qX5FP9jvrnWPDATKbucgLnmCNc7ojrkyz3aT0jYDgYm9DmI&s",
      description:
        "Made last it seen went no just when of by. Occasional entreaties comparison me difficulty so themselves. At brother inquiry of offices without do my service. As particular to companions at sentiments. Weather however luckily enquire so certain do. Aware did stood was day under ask. Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased. Towards did colonel article any parties.",
    },
  ];

  const partners =
    dynamicPartners && dynamicPartners.length > 0
      ? dynamicPartners.map((p) => ({
          name: p.title,
          imageSrc: p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image}`,
          description: p.description,
        }))
      : staticPartners;

  return (
    <div className="space-y-12">
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
