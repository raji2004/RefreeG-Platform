import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import BlockChain from '../../../public/images/blockchain.png';
import VettedImage from '../../../public/images/vetted.png';
import EasyDonations from '../../../public/images/easyDonation.png';
import GlobalAccesImage from '../../../public/images/globalAccess.png';
import ArrowRight from '../../../public/images/arrow-right.png';

interface FeatureCardProps {
  imageSrc: StaticImageData;
  title: string;
  description: string;
  linkHref: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({ imageSrc, title, description, linkHref }) => (
  <div className="flex w-full md:w-2/4 lg:w-1/5 flex-col space-y-2  transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-slate-50 pb-5 hover:rounded-xl p-4">
  {/* Add mx-auto to center the image */}
  <Image
    src={imageSrc}
    alt="icon"
    width={350}
    height={350}
    className="mx-auto"
  />
  <h2 className="text-xl md:text-2xl font-medium">{title}</h2>
  <p className="text-base md:text-lg">{description}</p>
  <Link
    href={linkHref}
    className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform items-center"
  >
    Read more
    <Image src={ArrowRight} alt="icon" width={25} height={25} />
  </Link>
</div>

);

export const WhyUseUs: FC = () => {
  return (
    <div className="w-full border-b">
      <div className="bg-white w-full mt-8 mb-12 px-4 z-10">
        <div className="text-2xl w-full md:text-4xl">Why you should use us!</div>
        <div className="text-lg md:text-xl">Reasons why your donation will be used right!</div>
        <div className="w-full py-6 flex flex-wrap justify-between items-center space-y-6 md:space-y-0">
          <FeatureCard
            imageSrc={BlockChain}
            title="Blockchain Transparency"
            description="Track your donations in real-time using blockchain technology for complete transparency."
            linkHref="#"
          />
          <FeatureCard
            imageSrc={VettedImage}
            title="Vetted Causes"
            description="Every cause is carefully vetted to ensure your contributions make a genuine impact."
            linkHref="#"
          />
          <FeatureCard
            imageSrc={EasyDonations}
            title="Easy Donation Process"
            description="Donate to causes with just a few clicks and track progress every step of the way."
            linkHref="#"
          />
          <FeatureCard
            imageSrc={GlobalAccesImage}
            title="Global Access"
            description="Support causes from anywhere in the world with our secure, web-based platform."
            linkHref="#"
          />
        </div>
      </div>
    </div>
  );
}

export default WhyUseUs;
