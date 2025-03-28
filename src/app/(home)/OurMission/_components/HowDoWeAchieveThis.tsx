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

          <h2 className="text-lg md:text-xl lg:text-2xl font-medium">{title}</h2>
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

export const HowDoWeAchieveThis: FC = () => {
  return (
    <div className="w-full px-10 mt-16">
      <div className="bg-white w-full mt-8 mb-12 z-10">
        <div className="text-xl md:text-2xl lg:text-4xl font-semibold w-full">
          How do we achieve this?
        </div>
        <div className="text-sm md:text-lg lg:text-xl">
          How we achieve transparent donations
        </div>
        <div className="w-full py-6 flex flex-col md:flex-row overflow-x-auto scrollbar-hide space-y-6 md:space-y-0 md:space-x-6">
          <FeatureCard
            imageSrc={"/images/blockchain.png"}
            title="🔗Blockchain-Powered Transparency"
            description="Every donation made on RefreeG is trackable and verifiable using blockchain technology, ensuring that funds are used for their intended purpose."
            linkHref="/blockchain-powered-transparency" // Use query parameter
          />
          <FeatureCard
            imageSrc={"/images/seamless.png"}
            title="💰 Seamless & Inclusive Giving"
            description="We support multiple payment methods, including mobile money, cryptocurrency, and traditional bank transfers, making it easy for anyone, anywhere to contribute."
            linkHref="/seamless-inclusive-giving" // Use query parameter
          />
          <FeatureCard
            imageSrc={"/images/community.png"}
            title="👥 A Community-First Approach"
            description="We support multiple payment methods, including mobile money, cryptocurrency, and traditional bank transfers, making it easy for anyone, anywhere to contribute."
            linkHref="/community-first-approach" // Use query parameter
          />
          <FeatureCard
            imageSrc={"/images/changemakers.png"}
            title="🌍 Empowering Local Changemakers"
            description="We provide a platform where individuals, organizations, and businesses can start causes to raise funds for meaningful projects."
            linkHref="/empowering-local-changemakers" // Use query parameter
          />
        </div>
      </div>
    </div>
  )
}
export default HowDoWeAchieveThis;