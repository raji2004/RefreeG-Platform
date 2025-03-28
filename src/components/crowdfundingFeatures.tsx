import React from "react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

interface Feature {
  title: string;
  description: string;
  imageSrc: string;
  hoverTitle: string;
  hoverImageSrc: string;
}

const features: Feature[] = [
  {
    title: "Transparency Through Blockchain",
    description:
      "At RefreeG, every donation is securely recorded on the blockchain, ensuring complete transparency in how funds are allocated and used. Donors can track their contributions in real-time, knowing exactly where their money goes and how it's making a difference.",
    imageSrc: "/money.svg",
    hoverTitle: "Track Your Impact",
    hoverImageSrc: "/money.svg",
  },
  {
    title: "Focus on Socioeconomic Growth",
    description:
      "RefreeG supports causes that drive long-lasting socioeconomic impact, from education and vocational training to healthcare and disaster relief. By contributing, you're not just making a donation—you're empowering communities and fostering sustainable development across Africa.",
    imageSrc: "/rafiki.svg",
    hoverTitle: "Empower Communities",
    hoverImageSrc: "/money.svg",
  },
  {
    title: "Empowering Underprivileged Communities",
    description:
      "Our platform bridges the gap between those who want to help and those in need by providing critical support to underprivileged communities. Whether it's helping victims of gender-based violence, providing educational resources, or aiding disaster relief, your support directly impacts lives.",
    imageSrc: "/money.svg",
    hoverTitle: "Create Real Change",
    hoverImageSrc: "/money.svg",
  },
];

const CrowdfundingFeatures: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-20 lg:px-32 bg-white">
      <h2 className="text-lg md:text-xl mb-12">
        We are crowdfunding at it's best!
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 group relative h-[550px] overflow-hidden"
          >
            {/* Content Container */}
            <div className="relative h-full w-full">
              {/* Default Content */}
              <div className="flex flex-col h-full transition-all duration-500 ease-in-out opacity-100 group-hover:opacity-0 absolute inset-0">
                <div className="mb-6 mx-auto">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.title}
                    width={250}
                    height={250}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <div className="mb-6 overflow-y-auto max-h-[200px] scrollbar-hide">
                  <p className="text-sm text-gray-700">{feature.description}</p>
                </div>

                {/* Read More Link (stays at bottom for default content) */}
                <div className="mt-auto">
                  <a href="#" className="font-medium flex items-center">
                    Read more <BsArrowRight className="ml-2" />
                  </a>
                </div>
              </div>

              {/* Hover Content */}
              <div className="flex flex-col h-full transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 absolute inset-0">
                <div className="mb-6 mx-auto">
                  <Image
                    src={feature.hoverImageSrc}
                    alt={feature.hoverTitle}
                    width={250}
                    height={250}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  {feature.hoverTitle}
                </h3>
                <div className="mb-6 overflow-y-auto max-h-[200px] scrollbar-hide">
                  <p className="text-sm text-gray-700">
                    {feature.description}
                  </p>
                </div>

                {/* Read More Link (stays at bottom for hover content) */}
                <div className="mt-auto">
                  <a href="#" className="font-medium flex items-center">
                    Read more <BsArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CrowdfundingFeatures;
