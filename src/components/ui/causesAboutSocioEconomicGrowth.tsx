"use client"; // Ensures that this component is rendered on the client-side

import React, { FC, useRef } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import MaiduguriFloodImage2 from "../../../public/images/flood2.png"; // Import the image
import MaiduguriEllipse2 from "../../../public/images/maiduguriEllipse2.png"; // Import the profile image
import Bookmark from "../../../public/images/bookmark.svg"; // Import the bookmark image
import RightArrow from "../../../public/images/chevronRight3.svg"; // Import the right arrow image
import ChevronRight from "../../../public/images/viewAll.svg"; // Import the chevron right image
import IconLeft from "../../../public/images/iconArrowLeft.svg"; // Import the icon left image
import IconRight from "../../../public/images/iconArrowRight.svg"; // Import the icon right image

// Donation Progress Component with conditional color
interface DonationProgressProps {
  value: number;
}

const DonationProgress: FC<DonationProgressProps> = ({ value }) => {
  // Determine if the goal is reached and set the color accordingly
  const isGoalReached = value >= 100;
  const progressBarColor = isGoalReached
    ? "bg-green-600" // Green if goal is reached
    : "bg-blue-600"; // Solid blue for less than 50% progress

  return (
    <div className="relative w-full h-2.5 bg-gray-200 rounded">
      <div
        className={`absolute top-0 left-0 h-2.5 rounded ${progressBarColor}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  imageSrc: StaticImageData;
  profileSrc: StaticImageData;
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
  <div className="bg-white rounded-lg p-4 w-[25rem] flex-shrink-0 mr-4">
    <Image src={imageSrc} alt={title} className="rounded-lg w-full" />
    <div className="flex justify-between mt-2">
      <div className="flex">
        <div>
          <Image src={profileSrc} alt="profile" width={50} height={50} />
        </div>
        <div className="ml-2 mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">
            {daysLeft} days left • {funded}
          </p>
        </div>
      </div>
      <div>
        <Image src={Bookmark} alt="bookmark" width={30} height={30} />
      </div>
    </div>
    <div className="mt-2">
      <DonationProgress value={progressValue} />
      <div className="font-bold text-gray-800">{amountRaised} raised</div>
      <div className="text-gray-800">Goal: {goal}</div>
    </div>
    <Link href={linkHref} passHref>
      <button className="flex items-center justify-center mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 leading-4">
        Donate now <Image src={RightArrow} alt="right arrow" className="ml-2" width={20} height={20} />
      </button>
    </Link>
  </div>
);

// Events Section Component
export const EventsSection = () => {
  const goalAmount = 2000000; // Set the donation goal amount (in Naira)

  const events = [
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: `${(1700000 / goalAmount) * 100}% funded`,
      progressValue: (1700000 / goalAmount) * 100,
      amountRaised: `₦${1700000}`,
      goal: `₦${goalAmount}`,
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: `${(1700000 / goalAmount) * 100}% funded`,
      progressValue: (1700000 / goalAmount) * 100,
      amountRaised: `₦${1700000}`,
      goal: `₦${goalAmount}`,
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: `${(1700000 / goalAmount) * 100}% funded`,
      progressValue: (1700000 / goalAmount) * 100,
      amountRaised: `₦${1700000}`,
      goal: `₦${goalAmount}`,
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: `${(1700000 / goalAmount) * 100}% funded`,
      progressValue: (1700000 / goalAmount) * 100,
      amountRaised: `₦${1700000}`,
      goal: `₦${goalAmount}`,
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: `${(1700000 / goalAmount) * 100}% funded`,
      progressValue: (1700000 / goalAmount) * 100,
      amountRaised: `₦${1700000}`,
      goal: `₦${goalAmount}`,
      linkHref: "#",
    },
    {
      imageSrc: MaiduguriFloodImage2,
      profileSrc: MaiduguriEllipse2,
      title: "Maiduguri flood",
      daysLeft: 15,
      funded: `${(1700000 / goalAmount) * 100}% funded`,
      progressValue: (1700000 / goalAmount) * 100,
      amountRaised: `₦${1700000}`,
      goal: `₦${goalAmount}`,
      linkHref: "#",
    },
    // Add more events as needed...
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mb-16 border-b pb-16 relative">
      <div className="lg:flex justify-between mr-10 ml-10 mb-10">
        <div>
          <p className="text-3xl font-medium">Happening Near You</p>
          <p className="text-lg">
            These causes are happening close to your current location.
          </p>
        </div>
        <Link href="#" className="flex justify-end">
          <Image src={ChevronRight} alt="right arrow" />
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scroll-smooth space-x-4 ml-10 mr-10 hide-scrollbar"
      >
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      {/* Scroll Icons at Bottom of Component */}
      <div className="absolute bottom-0 right-0 flex items-center space-x-4 p-4">
        <button onClick={scrollLeft} className="bg-white rounded-full shadow-lg">
          <Image src={IconLeft} alt="left icon" className="rounded-full" />
        </button>
        <button onClick={scrollRight} className="bg-white rounded-full shadow-lg">
          <Image src={IconRight} alt="right icon" className="rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default function HappeningNearYou() {
  return (
    <div className="mr-10 hidden md:block lg:block">
      {/* Other content */}
      <EventsSection />
      {/* Other content */}
    </div>
  );
}
