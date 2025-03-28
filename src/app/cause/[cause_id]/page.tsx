import DonationProgress from "@/components/ui/donationProgress";
import { FaHeartbeat, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { BsShare, BsChevronRight } from "react-icons/bs";
import { GoAlert } from "react-icons/go";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import CrowdfundingFeatures from "@/components/crowdfundingFeatures";
import { getCauseById, getCauseTransactions, getUserById } from "@/lib/firebase/actions";
import { getBaseURL, getDaysLeft } from "@/lib/utils";
import { Footer } from "@/components/ui/footer";
import { CauseCategories } from "@/lib/utils";
import {  getSessionId } from "@/lib/helpers";
import DonationProgressSection from "@/components/DonationProgressSection";
import DonationList from "@/components/DonationList";
import EmojiReaction from "@/components/EmojiReaction";
import { Badge } from "@/components/ui/badge";
import UnicefBanner from "@/components/UnicefBanner";
import CauseSection from "@/components/CauseSection";
import CauseTabs from "@/components/CauseTabs";
import NearbyCarousel from "@/components/NearbyCarousel";
import ShareWrapper from "@/components/ShareWrapper";
import Link from "next/link";
import console from "console";

const Section = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="space-y-1">
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
};

// Main component definition
export default async function DonationDetail({
  params,
}: {
  params: { cause_id: string };
}) {
  const cause = await getCauseById(params.cause_id);
 
  const session = await getSessionId();
  const loggeduser = await getUserById(session ?? "");

  if (!cause) {
    return <div>Cause not found</div>;
  }
  const matchedCategory = CauseCategories.find(
    (item) => item.name === cause.causeCategory
  );
  const IconComponent = matchedCategory?.icon ?? FaHeartbeat;
  const causeUser = await getUserById(cause.userId);
  const goalAmount = Number(cause.goalAmount);
  const donationAmount = cause.raisedAmount;
  const daysleft = getDaysLeft(cause.deadline);
  const progressPercentage = (donationAmount / goalAmount) * 100;

  const stats = [
    `${cause.raisedAmount.toLocaleString()} Donations`,
    `${progressPercentage.toFixed(1)}% funded`,
    daysleft,
  ];

  const paragraphs = [
    "The recent floods in Maiduguri have displaced thousands of families, leaving them without food, shelter, and basic necessities. We are raising $50,000 to provide emergency relief, including temporary housing, medical supplies, and food. Together, we can help rebuild their lives.",
    "The recent floods in Maiduguri have displaced thousands of families, leaving them without food, shelter, and basic necessities. We are raising $50,000 to provide emergency relief, including temporary housing, medical supplies, and food. Together, we can help rebuild their lives.",
    "The recent floods in Maiduguri have displaced thousands of families, leaving them without food, shelter, and basic necessities. We are raising $50,000 to provide emergency relief, including temporary housing, medical supplies, and food. Together, we can help rebuild their lives.",
  ];
  const baseUrl = await getBaseURL()

  const causeUrl = `${baseUrl}/cause/${params.cause_id}`;
  return (
    <>
      <Navbar
        userSession={session !== undefined ? true : false}
        profile={loggeduser?.profileImage}
      />
      <div className="p-4 md:flex md:justify-between mt-10">
        {/* Left side - Main content */}
        <div className="md:w-2/4">
          <h1 className="text-2xl font-bold mb-2">
            {cause?.causeTitle ?? "Support Flood Victims"}
          </h1>

          <Badge className="bg-[#FFEBED] text-[#FF0000] font-light p-2 mb-6 text-md">
            <GoAlert width={20} height={20} className="mr-2" /> This cause is of
            high precedence
          </Badge>

          {/* Important notification about high-priority cause */}
          {/* <p className="text-red-600 font-medium flex items-center">
            <FaExclamationTriangle className="mr-2" />
            This cause is of high precedence
          </p> */}

          {/* Image carousel with slider settings */}

          <div className="relative">
            <Image
              src={cause?.img ?? "/DonationDetail/flood1.svg"}
              alt={
                cause?.uploadedImage.name ?? `Image of flood relief scenario`
              }
              className="w-[100%] h-[65%] object-cover rounded-lg items-center"
              width={867}
              height={732}
              priority
            />
          </div>

          {/* Tag indicators for category and location */}
          <div className="flex space-x-2 mt-9">
            <Badge className="text-sm bg-white border border-black text-black cursor-pointer rounded-full px-3 py-1 flex items-center hover:bg-gray-300/40 hover:underline transition-colors duration-300 ">
              <IconComponent className="mr-1" />{" "}
              {cause?.causeCategory ?? "Health"}
            </Badge>
            <Badge className="text-sm bg-white border border-black text-black cursor-pointer rounded-full px-3 py-1 flex items-center hover:bg-gray-300/40 hover:underline transition-colors duration-300 ">
              <FaMapMarkerAlt className="mr-1" /> {cause?.state ?? "Borno"}
            </Badge>
          </div>

          {/* Organization supporting the cause */}
          <UnicefBanner
            name={causeUser?.firstName + " " + causeUser?.lastName}
          />

          {/* Cause description paragraphs */}
          <CauseSection section={cause.sections} />

          {/* Buttons for sharing and donating */}
          <div className="flex mt-4 space-x-4">
            <ShareWrapper url={causeUrl} title={cause.causeTitle}>
              <button className="flex items-center bg-white border border-gray-400 px-12 py-3 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300">
                Share <BsShare className="ml-2" />
              </button>
            </ShareWrapper>
            <Link href={`/cause/${params.cause_id}/payment`}>
              <button className="bg-[#433E3F] flex items-center text-white px-12 py-3 rounded-md shadow-sm hover:bg-gray-700 transition-colors duration-300">
                Donate <BsChevronRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right side - Donation details section */}
        <div className="mt-8 md:mt-0 md:w-[40%] mr-10">
          {/* Donation progress bar */}
          <DonationProgressSection
            cause={cause}
            donationAmount={donationAmount}
            goalAmount={goalAmount}
            progressPercentage={progressPercentage}
            daysLeft={daysleft}
            stats={stats}
          />

          {/* Recent donations list */}
          <DonationList causeId={params.cause_id} />
          <EmojiReaction />
        </div>
      </div>
      {/* <DonationNav /> */}

      {/* <CauseTabs commentCount={20} /> */}

      <CrowdfundingFeatures />

      {/* <NearbyCarousel /> */}

      <Footer />
    </>
  );
}
