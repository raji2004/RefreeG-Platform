import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Radio from "../../../public/images/radio.svg"; // Import the Radio image
import ChevronRight2 from "../../../public/images/chevronRight2.svg"; // Import the ChevronRight2 image

interface SectionHeaderProps {
  title: string;
  buttonLabel: string;
  buttonHref: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, buttonLabel, buttonHref }) => (
  <div className="lg:flex md:flex justify-between mb-3">
    <div className="text-blue-900 mb-2 text-lg md:text-2xl font-semibold">{title}</div>
    <div className="flex">
      <Link href={buttonHref} className="px-2 py-2 md:px-3 md:py-3 lg:px-4 lg:py-4 border-2 border-blue-900 rounded-lg text-blue-900 text-sm md:text-xl font-semibold">
        {buttonLabel}
      </Link>
    </div>
  </div>
);

interface CauseDescriptionProps {
  imageSrc: string;
  title: string;
  points: string[];
  linkHref: string;
}

export const CauseDescription: FC<CauseDescriptionProps> = ({ imageSrc, title, points, linkHref }) => (
  <div className="lg:flex text-left md:text-center lg:text-center mb-16 pb-10 border-b justify-between">
    <div className="self-center hidden lg:block">
      <Image src={imageSrc} alt={title} />
    </div>
    <div className="text-3xl self-center text-left md:text-center lg:text-center font-medium w-full lg:w-3/12">
      {title}
    </div>
    <div className="lg:w-7/12 w-full text-left md:text-center lg:text-center">
      {points.map((point, index) => (
        <div key={index} className="text-base md:text-xl lg:text-xl text-blue-900 font-medium mt-8">
          {point}
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center mt-3">
      <Link href={linkHref} className="flex self-center underline text-blue-900 text-lg font-semibold">
        Get Started <Image src={ChevronRight2} alt="right arrow" />
      </Link>
    </div>
  </div>
);

export function CausesSupported() {
  const causes = [
    {
      imageSrc: Radio,
      title: "Vocational Training",
      points: [
        "Empowering Artisans: We provide vocational training to individuals, helping them acquire valuable skills to become proficient artisans.",
        "Economic Contribution: By gaining these skills, individuals can join the labor force, contributing to the nation’s GDP and overall economic growth."
      ],
      linkHref: "#",
    },
    {
      imageSrc: Radio,
      title: "Support for GBV Victims",
      points: [
        "Holistic Recovery: We offer comprehensive support to victims of gender-based violence, aiding in both their emotional and physical healing.",
        "Safe Spaces: Our initiatives include creating safe spaces and providing necessary resources to help victims rebuild their lives."
      ],
      linkHref: "#",
    },
    {
      imageSrc: Radio,
      title: "Education",
      points: [
        "Access to Education: We strive to send children of various ages to school, ensuring they have access to quality education.",
        "Future Leaders: By investing in their education, we aim to improve their lives and contribute to the country’s future development."
      ],
      linkHref: "#",
    },
    {
      imageSrc: Radio,
      title: "Basic Necessities",
      points: [
        "Essential Aid: We provide food, healthcare, shelter, and clothing to those in need, ensuring they have access to basic life necessities.",
        "Health and Well-being: Our support extends to ensuring individuals have access to healthcare services, promoting their overall well-being."
      ],
      linkHref: "#",
    },
  ];

  return (
    <div className="mr-10 ml-10">
      <SectionHeader title="What kind of causes do we support?" buttonLabel="Join us today!" buttonHref="#" />
      <div className="w-11/12 lg:w-8/12 md:mx-auto lg:mx-auto text-base md:text-xl md:text-center lg:text-center mt-10 mb-10">
        At RefreeG, we support a wide range of causes that align with our mission to empower less privileged individuals in the community and foster socio-economic growth. Here are some of the key areas we focus on:
      </div>
      <div>
        {causes.map((cause, index) => (
          <CauseDescription key={index} {...cause} />
        ))}
      </div>
    </div>
  );
}

export default CausesSupported;
