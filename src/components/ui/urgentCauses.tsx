import { FC } from "react";
import Image from "next/image";
import Bookmark from "../../../public/images/bookmark.svg"; // Import the bookmark image
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
  imageSrc: string;
  profileSrc: string;
  title: string;
  daysLeft: number;
  funded: string;
  description?: string;
  progressValue: number;
  amountRaised: string;
  goal: string;
  linkHref: string;
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
}) => (
  <div className="bg-white rounded-lg w-full md:w-1/2 lg:w-1/3 mr-10 mb-5">
    <Image src={imageSrc} alt={title} className="rounded-lg w-full" />
    <div className="flex justify-between mt-2">
      <div className="flex">
        <Image src={profileSrc} alt="profile" width={50} height={50} />
        <div className="ml-2 mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">
            {daysLeft} days left • {funded}
          </p>
          {description && <p className="mt-2 hidden lg:block">{description}</p>}
        </div>
      </div>
      <Image src={Bookmark} alt="bookmark" />
    </div>
    <div className="mt-2">
      <Progress value={progressValue} />
      <div className="font-bold text-gray-800">{amountRaised} raised</div>
      <div className="text-gray-800">Goal: {goal}</div>
    </div>
    <a href={linkHref} className="mt-4 block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center">
      Donate now
    </a>
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
    <div className="w-full px-4 py-8 bg-white border-b">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Urgent causes</h2>
        <a href="#" className="text-blue-600 hover:underline">View all</a>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-full md:mb-5 md:flex md:justify-center">
          <CauseCard {...causes[0]} />
        </div>
        <div className="lg:w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherCauses.map((cause, index) => (
            <CauseCard key={index} {...cause} />
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <nav className="inline-flex space-x-2">
          <a href="#" className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">1</a>
          <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">2</a>
          <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">3</a>
          <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">4</a>
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

