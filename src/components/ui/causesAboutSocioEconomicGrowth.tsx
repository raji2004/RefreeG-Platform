import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import MaiduguriFloodImage2 from "../../../public/images/flood2.png"; // Import the image
import MaiduguriEllipse2 from "../../../public/images/maiduguriEllipse2.png"; // Import the profile image
import Bookmark from "../../../public/images/bookmark.svg"; // Import the bookmark image
import RightArrow from "../../../public/images/chevronRight3.svg"; // Import the right arrow image
import ChevronRight from "../../../public/images/viewAll.svg"; // Import the chevron right image
import IconLeft from "../../../public/images/iconArrowLeft.svg"; // Import the icon left image
import IconRight from "../../../public/images/iconArrowRight.svg"; // Import the icon right image
import { Progress } from "./progress";

interface EventCardProps {
  imageSrc: string;
  profileSrc: string;
  title: string;
  daysLeft: number;
  funded: string;
  progressValue: number;
  amountRaised: string;
  goal: string;
  linkHref: string;
}

export const EventCard: FC<EventCardProps> = ({
  imageSrc,
  profileSrc,
  title,
  daysLeft,
  funded,
  progressValue,
  amountRaised,
  goal,
  linkHref,
}) => (
  <div className="bg-white rounded-lg mr-10 mb-8">
    <Image src={imageSrc} alt={title} className="rounded-lg" />
    <div className="flex justify-between mt-2">
      <div className="flex">
        <div>
          <Image src={profileSrc} alt="profile" />
        </div>
        <div className="ml-2 mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">
            {daysLeft} days left • {funded}
          </p>
        </div>
      </div>
      <div>
        <Image src={Bookmark} alt="bookmark" />
      </div>
    </div>
    <div className="mt-2">
      <Progress value={progressValue} />
      <div className="font-bold text-gray-800">{amountRaised} raised</div>
      <div className="text-gray-800">Goal: {goal}</div>
    </div>
    <Link href={linkHref} passHref>
      <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">
        Donate now <Image src={RightArrow} alt="right arrow" />
      </button>
    </Link>
  </div>
);


export const EventsSection = () => {
  const events = [
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
    // Add more events as needed...
  ];

  return (
    <div className="w-full mb-16 border-b pb-16">
      <div className="lg:flex justify-between mr-10 ml-10 mb-10">
        <div>
          <p className="text-3xl font-medium">Causes about socio-economic growth</p>
          <p className="text-lg">
            The causes contribute to the socio-economic growth of the community.
          </p>
        </div>
        <Link href="#" className="flex justify-end">
          <Image src={ChevronRight} alt="right arrow" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      <div className="flex justify-end mt-5 mr-10">
        <Image src={IconLeft} alt="left icon" className="rounded-full border mr-5" />
        <Image src={IconRight} alt="right icon" className="rounded-full border" />
      </div>
    </div>
  );
}




export default function CausesAboutSocioEconomicGrowth() {
  return (
    <div>
      {/* Other content */}
      <EventsSection />
      {/* Other content */}
    </div>
  );
}
