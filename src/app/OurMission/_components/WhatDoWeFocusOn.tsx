import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface FeatureCardProps {
    imageSrc: string;
    title: string;
    description: string;
    linkHref: string;
  }
  
export const FeatureCard: FC<FeatureCardProps> = ({
    imageSrc,
    title,
    description,
    linkHref,
}) => (
    <Link href={linkHref}>
        <div className="flex w-[350px] flex-col space-y-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-slate-50 pb-5 hover:rounded-xl p-4 cursor-pointer">
          <Image
            src={imageSrc}
            alt="icon"
            width={350}
            height={350}
            className="mr-auto object-cover"
          />

          <h2 className="text-xl md:text-2xl font-medium">{title}</h2>
          <p className="text-base md:text-lg">{description}</p>
          <div className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform items-center">
              Read more
              <Image
              src={"/images/arrow-right.png"}
              alt="icon"
              width={25}
              height={25}
              />
          </div>
        </div>
    </Link>
);

export const WhatDoWeFocusOn: FC = () => {
  return (
    <div className="w-full px-10">
      <div className="bg-white w-full z-10">
        <div className="text-xl md:text-2xl lg:text-4xl font-semibold w-full">
          What do we focus on?
        </div>
        <div className="text-sm md:text-lg lg:text-xl">
          The kind of causes we focus on
        </div>
        <div className="w-full py-6 flex flex-col md:flex-row overflow-x-auto scrollbar-hide space-y-6 md:space-y-0 md:space-x-6">
          <FeatureCard
            imageSrc={"/images/education.png"}
            title="📚 Education & Literacy"
            description=" Scholarships, school support, books for students."
            linkHref="/blockchain-transparency" // Use query parameter
          />
          <FeatureCard
            imageSrc={"/images/vocation.png"}
            title="🛠️ Vocational Training:"
            description="Skill-building to empower unemployed youth."
            linkHref="/vetted-causes" // Use query parameter
          />
          <FeatureCard
            imageSrc={"/images/healthcare.png"}
            title="🚑 Healthcare Support:"
            description="Medical aid for underserved communities."
            linkHref="/easy-donation-process" // Use query parameter
          />
          <FeatureCard
            imageSrc={"/images/gbv.png"}
            title="👩‍👧‍👦 Gender-Based Violence Support:"
            description="Aid for survivors & women empowerment."
            linkHref="/global-access" // Use query parameter
          />
        </div>
      </div>
    </div>
  )
}
export default WhatDoWeFocusOn;