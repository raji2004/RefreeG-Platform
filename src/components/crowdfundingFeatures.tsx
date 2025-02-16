// components/CrowdfundingFeatures.tsx

import React from "react";

interface Feature {
  title: string;
  description: string;
  imageSrc: string;
}

const features: Feature[] = [
  {
    title: "Transparency Through Blockchain",
    description:
      "At RefreeG, every donation is securely recorded on the blockchain, ensuring complete transparency in how funds are allocated and used. Donors can track their contributions in real-time, knowing exactly where their money goes and how it’s making a difference.",
    imageSrc: "/money.svg",
  },
  {
    title: "Focus on Socioeconomic Growth",
    description:
      "RefreeG supports causes that drive long-lasting socioeconomic impact, from education and vocational training to healthcare and disaster relief. By contributing, you’re not just making a donation—you’re empowering communities and fostering sustainable development across Africa.",
    imageSrc: "/rafiki.svg",
  },
  {
    title: "Empowering Underprivileged Communities",
    description:
      "Our platform bridges the gap between those who want to help and those in need by providing critical support to underprivileged communities. Whether it’s helping victims of gender-based violence, providing educational resources, or aiding disaster relief, your support directly impacts lives.",
    imageSrc: "/money.svg",
  },
];

const CrowdfundingFeatures: React.FC = () => {
  return (
    <section className="py-12 px-6 md:px-20 lg:px-32 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        We are crowdfunding at it’s best!
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-left md:text-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={feature.imageSrc}
              alt={feature.title}
              className="h-24 w-24 mb-4"  // Increased size here
            />
            <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              {feature.description}
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Read more &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CrowdfundingFeatures;
