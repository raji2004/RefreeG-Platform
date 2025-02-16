"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper core styles
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles (if you plan to use it)
import MaiduguriFloodImage2 from "../../../public/images/flood2.png"; 
import MaiduguriEllipse2 from "../../../public/images/maiduguriEllipse2.png"; 
import Bookmark from "../../../public/images/bookmark.svg"; 
import RightArrow from "../../../public/images/chevronRight3.svg"; 
import ChevronRight from "../../../public/images/viewAll.svg"; 
import IconLeft from "../../../public/images/iconArrowLeft.svg"; 
import IconRight from "../../../public/images/iconArrowRight.svg"; 

// Donation Progress Component with conditional color
interface DonationProgressProps {
  value: number;
}

const DonationProgress: FC<DonationProgressProps> = ({ value }) => {
  const isGoalReached = value >= 100;
  const progressBarColor = isGoalReached
    ? "bg-green-600"
    : "bg-blue-600"; 

  return (
    <div className="relative w-full h-2.5 bg-gray-200 rounded">
      <div
        className={`absolute top-0 left-0 h-2.5 rounded ${progressBarColor}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

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
      <DonationProgress value={progressValue} />
      <div className="font-bold text-gray-800">{amountRaised} raised</div>
      <div className="text-gray-800">Goal: {goal}</div>
    </div>
    <Link href={linkHref} passHref>
      <button className="flex mx-auto mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">
        Donate now <Image src={RightArrow} alt="right arrow" />
      </button>
    </Link>
  </div>
);

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
    // Add more events here...
  ];

  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    const section = document.getElementById("events-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="events-section" className="w-full mb-16 border-b pb-16">
      <div className="lg:flex justify-between mr-10 ml-10 mb-10">
        <div>
          <p className="text-3xl font-medium">Causes About Socio-Economic Growth</p>
          <p className="text-lg">
            These causes contribute to the socio-economic growth of the community.
          </p>
        </div>
        <Link href="#" className="flex justify-end">
          <Image src={ChevronRight} alt="right arrow" />
        </Link>
      </div>

      {/* Swiper component for the slider */}
      <div className="ml-10">
        <div className="relative">
          <Swiper
            spaceBetween={10} // Space between slides
            slidesPerView={1} // 1 slide per view on small screens
            breakpoints={{
              640: {
                slidesPerView: 2, // 2 slides per view on medium screens
              },
              1024: {
                slidesPerView: 3, // 3 slides per view on large screens
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next", // Next button
              prevEl: ".swiper-button-prev", // Prev button
            }}
          >
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <EventCard {...event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      
    </div>
  );
};

export const CausesAboutSocioEconomicGrowthMobile = () => {
  return (
    <div className="lg:hidden md:hidden">
      <EventsSection />
    </div>
  );
};
