import { FC } from "react";
import Image, { StaticImageData } from "next/image"; // Import StaticImageData type
import Bookmark from "../../../public/images/bookmark.svg"; // Import the bookmark image
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import { Progress } from "./progress"; // Import the Progress component
import CancerImage from "../../../public/images/cancerFoundation.png"; // Import the Cancer image
import CancerEllipse from "../../../public/images/cancerEllipse.svg"; // Import the Cancer profile image
import MaiduguriFloodImage1 from "../../../public/images/flood1.png"; // Import the Maiduguri flood image 1
import MaiduguriFloodImage2 from "../../../public/images/flood2.png"; // Import the Maiduguri flood image 2
import MaiduguriFloodImage3 from "../../../public/images/flood3.png"; // Import the Maiduguri flood image 3
import MaiduguriFloodImage4 from "../../../public/images/flood4.png"; // Import the Maiduguri flood image 4
import MaiduguriEllipse1 from "../../../public/images/maiduguriEllipse1.png"; // Import the Maiduguri profile image 1
import MaiduguriEllipse2 from "../../../public/images/maiduguriEllipse2.png"; // Import the Maiduguri profile image 2
import MaiduguriEllipse3 from "../../../public/images/maiduguriEllipse3.png"; // Import the Maiduguri profile image 3

interface CauseCardProps {
  imageSrc: StaticImageData; // Change type to StaticImageData
  profileSrc: StaticImageData; // Change type to StaticImageData
  title: string;
  daysLeft: number;
  funded: string;
  description?: string;
  progressValue: number;
  amountRaised: string;
  goal: string;
  linkHref: string;
  isMainCard?: boolean;
}

export const CauseCard: FC<CauseCardProps> = ({
  imageSrc,
  profileSrc,
  title,
  daysLeft,
  funded,
  description,
  progressValue,
  amountRaised,
  goal,
  linkHref,
  isMainCard = false,
}) => (
  <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${isMainCard ? 'w-full' : 'w-full'}`}>
    <div className="relative">
      <Image 
        src={imageSrc} 
        alt={title} 
        width={400}
        height={250}
        className="w-full h-40 object-cover pointer-events-none" 
      />
    </div>
    <div className="p-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-2">
          <Image 
            src={profileSrc} 
            alt="profile" 
            width={30} 
            height={30} 
            className="rounded-full pointer-events-none" 
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <Clock width={14} height={14} />
              {daysLeft} days left • {funded}
            </p>
            {isMainCard && description && (
              <p className="text-xs text-gray-700 mt-1">{description}</p>
            )}
          </div>
        </div>
        <button className="flex-shrink-0">
          <Image src={Bookmark} alt="bookmark" width={20} height={20} />
        </button>
      </div>
      <div className="mt-2">
        <Progress className="p-0 h-1.5" value={progressValue} />
        <div className="text-xs font-medium mt-1">{amountRaised} raised</div>
        <div className="text-xs text-gray-500">Goal: {goal}</div>
      </div>
      {isMainCard && (
        <Button 
          href={linkHref} 
          className="mt-3  bg-blue-600 text-white text-xs py-2 rounded text-center hover:bg-blue-700 flex items-center justify-center"
        >
          Donate now <ChevronRight size={"18"} />
        </Button>
      )}
    </div>
  </div>
);

export const UrgentCausesSection = () => {
  const causes = [
    {
      imageSrc: CancerImage,
      profileSrc: CancerEllipse,
      title: "Cancer foundation",
      daysLeft: 15,
      funded: "80% funded",
      description: "This cause is for Ikemefuna, a Nigerian boy that needs surgery for his cancer and is seeking your funding for the sum of 100m more...",
      progressValue: 85,
      amountRaised: "₦1,700,000",
      goal: "₦2,000,000",
      linkHref: "#",
    },
    // Add more causes as needed...
  ];

  const otherCauses = [
    {
      imageSrc: MaiduguriFloodImage1,
      profileSrc: MaiduguriEllipse1,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: "80% funded",
      progressValue: 85,
      amountRaised: "₦1,700,000",
      goal: "₦2,000,000",
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: "80% funded",
      progressValue: 85,
      amountRaised: "₦1,700,000",
      goal: "₦2,000,000",
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage3,
      profileSrc: MaiduguriEllipse3,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: "80% funded",
      progressValue: 85,
      amountRaised: "₦1,700,000",
      goal: "₦2,000,000",
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage4,
      profileSrc: MaiduguriEllipse3,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: "80% funded",
      progressValue: 85,
      amountRaised: "₦1,700,000",
      goal: "₦2,000,000",
      linkHref: "#",
    },
  ];

  return (
    <div className="w-full px-4 py-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium">Urgent causes</h2>
          <p className="text-sm text-gray-600">Causes that need your attention</p>
        </div>
        <a href="#" className="text-blue-600 hover:underline text-sm flex items-center gap-1">View all <ChevronRight size={18} /></a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* First column with main cause */}
        <div className="md:col-span-1 lg:col-span-2 lg:row-span-2">
          <CauseCard {...causes[0]} isMainCard={true} />
        </div>
        
        {/* Grid of other causes */}
        {otherCauses.map((cause, index) => (
          <div key={index} className="md:col-span-1 lg:col-span-1">
            <CauseCard key={index} {...cause} />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-4">
        <nav className="inline-flex items-center gap-2">
          <a href="#" className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 text-blue-600 border-b-2 border-blue-600 font-medium">
            1
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
            2
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
            3
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
            4
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
            <ChevronRight className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default function UrgentCauses() {
  return (
    <div>
      {/* Other content */}
      <UrgentCausesSection />
      {/* Other content */}
    </div>
  );
}
