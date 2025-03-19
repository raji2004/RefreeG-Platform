import DonationProgress from "@/components/ui/donationProgress";
import { FaHeartbeat, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import CrowdfundingFeatures from "@/components/crowdfundingFeatures";
import { getCauseById, getUserById } from "@/lib/action";
import { getDaysLeft } from "@/lib/utils";
import { Footer } from "@/components/ui/footer";
import { CauseCategories } from "@/lib/utils";
import { User } from "lucide-react";
import { getSessionId } from "@/lib/helpers";
import DonationProgressSection from "@/components/DonationProgressSection";
import DonationList from "@/components/DonationList";
import EmojiReaction from "@/components/EmojiReaction";
import { Badge } from "@/components/ui/badge";

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
  const user = await getUserById(cause.userId);
  const goalAmount = Number(cause.goalAmount);
  const donationAmount = cause.raisedAmount;
  const daysleft = getDaysLeft(cause.deadline);
  const progressPercentage = (donationAmount / goalAmount) * 100;

  const stats = [
    "2.4k Donations",
    `${progressPercentage.toFixed(1)}% funded`,
    daysleft,
  ];

  return (
    <>
      <Navbar
        userSession={session !== undefined ? true : false}
        profile={user?.profileImage}
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
          <div className="flex items-end text-end mt-4 font-semibold text-sm">
            <User className="mr-2" /> {user?.firstName ?? "Save the Children"}
          </div>

          {/* Cause description paragraphs */}
          <div className="mt-4 space-y-2">
            {cause?.sections.map((section) => (
              <Section
                key={section.id}
                title={section.header}
                description={section.description}
              />
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
          <DonationProgressSection
            cause={cause}
            donationAmount={donationAmount}
            goalAmount={goalAmount}
            progressPercentage={progressPercentage}
            daysLeft={daysleft}
            stats={stats}
          />

          {/* Recent donations list */}
          <DonationList />
          <EmojiReaction />
        </div>
      </div>
      {/* <DonationNav /> */}
      <CrowdfundingFeatures />
      <Footer />
    </>
  );
}
