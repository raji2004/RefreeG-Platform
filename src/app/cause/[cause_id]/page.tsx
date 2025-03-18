import DonationProgress from "@/components/ui/donationProgress";
import {
  FaHeartbeat,
  FaMapMarkerAlt,
  FaGlobe,
  FaShare,
  FaHeart,
  FaSmile,
  FaLeaf,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import DonationNav from "@/components/donationNavbar";
import { Navbar } from "@/components/ui/navbar";
import CrowdfundingFeatures from "@/components/crowdfundingFeatures";
import { getCauseById, getUserById } from "@/lib/action";
import { getDaysLeft } from "@/lib/utils";
import { Footer } from "@/components/ui/footer";
import { CauseCategories } from "@/lib/utils";
import {User } from 'lucide-react'
import { P } from "@/components/typograpy";
import { getSessionId } from "@/lib/helpers";



const Section = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="space-y-1">
      <strong>{title}</strong>
      <p>
        {description}
      </p>
    </div>
  );
}

// Main component definition
export default async function DonationDetail({ params }: { params: { cause_id: string } }) {
  const cause = await getCauseById(params.cause_id)
  const session = await getSessionId();
  const loggeduser = await getUserById(session ?? "");



  if (!cause) {
    return <div>Cause not found</div>;
  }
  const matchedCategory = CauseCategories.find((item) => item.name === cause.causeCategory);
  const IconComponent = matchedCategory?.icon ?? FaHeartbeat;
  const user = await getUserById(cause.userId)
  const goalAmount = Number(cause.goalAmount);
  const donationAmount = cause.raisedAmount;
  const daysleft = getDaysLeft(cause.deadline)
  const progressPercentage = (donationAmount / goalAmount) * 100;

  return (
    <div>
      <Navbar userSession={session !== undefined?true:false} profile={user?.profileImage} />
      <div className="p-4 md:flex md:justify-between">
        {/* Left side - Main content */}
        <div className="md:w-2/4">
          <h1 className="text-2xl font-bold mb-2">{cause?.causeTitle ?? "Support Flood Victims"}</h1>

          {/* Important notification about high-priority cause */}
          {/* <p className="text-red-600 font-medium flex items-center">
            <FaExclamationTriangle className="mr-2" />
            This cause is of high precedence
          </p> */}

          {/* Image carousel with slider settings */}

          <div className="relative">
            <Image
              src={cause?.img ?? "/DonationDetail/flood1.svg"}
              alt={cause?.uploadedImage.name ?? `Image of flood relief scenario`}
              className="w-[100%] h-[65%] object-cover rounded-lg items-center"
              width={867}
              height={732}
              priority
            />
          </div>


          {/* Tag indicators for category and location */}
          <div className="flex space-x-2 mt-9">
            <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300">
              <IconComponent className="mr-1" /> {cause?.causeCategory ?? "Health"}
            </span>
            <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300">
              <FaMapMarkerAlt className="mr-1" /> {cause?.state ?? "Borno"}
            </span>
          </div>

          {/* Organization supporting the cause */}
          <div className="flex items-end text-end mt-4 font-semibold text-sm">
            <User className="mr-2" /> {user?.firstName ?? "Save the Children"}
          </div>

          {/* Cause description paragraphs */}
          <div className="mt-4 space-y-2">

            {cause?.sections.map((section) => (
              <Section key={section.id} title={section.header} description={section.description} />
            ))}
          </div>

          {/* Buttons for sharing and donating */}
          <div className="flex mt-4 space-x-4">
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300">
              <FaShare className="mr-2" /> Share
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 transition-colors duration-300">
              Donate
            </button>
          </div>
        </div>

        {/* Right side - Donation details section */}
        <div className="mt-8 md:mt-0 md:w-[40%] mr-10">
          {/* Donation progress bar */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <DonationProgress
              currentAmount={cause.raisedAmount} // Pass current donation amount
              goalAmount={Number(cause.goalAmount)} // Pass total goal amount
            />
            <h2 className="text-xl font-bold">
              ₦{donationAmount.toLocaleString()} raised
            </h2>
            <p>of ₦{goalAmount.toLocaleString()} goal</p>

            {/* Statistics on donations */}
            <div className="flex mt-4 text-sm">
              <span className="block bg-gray-200 rounded-full px-3 py-1 mr-1">
                2.4k Donations
              </span>
              <span className="block bg-gray-200 rounded-full px-3 py-1 mr-1">
                {progressPercentage.toFixed(1)}% funded
              </span>
              <span className="block bg-gray-200 rounded-full px-3 py-1 mr-1">
                {daysleft}
              </span>
            </div>

            {/* Buttons for sharing and donating specific amounts */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-grow bg-gray-300 text-blue py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">
                Share
              </button>
              <button
                className="flex-grow bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              // Call donation handler for ₦50,000 donation
              >
                Donate
              </button>
            </div>
          </div>

          {/* Recent donations list */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mt-8">
            <h3 className="text-lg font-semibold">300 people just donated</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex justify-between">
                <span>Salim Ibrahim</span>
                <span className="text-xs">₦50,000</span>
              </li>
              <li className="flex justify-between">
                <span>Hephzibah</span>
                <span className="text-xs">₦10,000</span>
              </li>
              <li className="flex justify-between">
                <span>Julius</span>
                <span className="text-xs">₦50,000</span>
              </li>
              <li className="text-blue-500">See all</li>
            </ul>

            {/* Interactive reaction icons */}
            <div className="mt-4 flex justify-center space-x-2">
              <FaHeart className="text-red-500 hover:text-red-600 active:text-red-700 transition-colors duration-300" />
              <FaSmile className="text-yellow-500 hover:text-yellow-600 active:text-yellow-700 transition-colors duration-300" />
              <FaLeaf className="text-green-500 hover:text-green-600 active:text-green-700 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
      {/* <DonationNav /> */}
      <CrowdfundingFeatures />
      <Footer />
    </div>
  );
};


