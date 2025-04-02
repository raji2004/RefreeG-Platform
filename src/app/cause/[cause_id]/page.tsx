import DonationProgress from "@/components/ui/donationProgress";
import { FaHeartbeat, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { BsShare, BsChevronRight } from "react-icons/bs";
import { GoAlert } from "react-icons/go";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import CrowdfundingFeatures from "@/components/crowdfundingFeatures";
import {
  getCauseById,
  getCauseTransactions,
  getUserById,
} from "@/lib/firebase/actions";
import { getBaseURL, getDaysLeft } from "@/lib/utils";
import { Footer } from "@/components/ui/footer";
import { CauseCategories } from "@/lib/utils";
import { getSessionId } from "@/lib/helpers";
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
import DonationButtons from "@/components/DonationButtons";

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

export default async function DonationDetail({
  params,
}: {
  params: { cause_id: string };
}) {
  const cause = await getCauseById(params.cause_id);

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

  const baseUrl = await getBaseURL();
  const causeUrl = `${baseUrl}/cause/${params.cause_id}`;

  return (
    <>
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

          <div className="flex space-x-2 mt-9">
            <Badge className="text-sm bg-white border border-black text-black cursor-pointer rounded-full px-3 py-1 flex items-center hover:bg-gray-300/40 hover:underline transition-colors duration-300">
              <IconComponent className="mr-1" />{" "}
              {cause?.causeCategory ?? "Health"}
            </Badge>
            <Badge className="text-sm bg-white border border-black text-black cursor-pointer rounded-full px-3 py-1 flex items-center hover:bg-gray-300/40 hover:underline transition-colors duration-300">
              <FaMapMarkerAlt className="mr-1" /> {cause?.state ?? "Borno"}
            </Badge>
          </div>

          <UnicefBanner
            name={causeUser?.firstName + " " + causeUser?.lastName}
            userId={causeUser?.id}
            isVerified={causeUser?.isVerified}
          />

          <CauseSection section={cause.sections} />

          <DonationButtons
            causeId={params.cause_id}
            causeUrl={causeUrl}
            causeTitle={cause.causeTitle}
          />
        </div>

        {/* Right side - Donation details section */}
        <div className="mt-8 md:mt-0 md:w-[40%] mr-10">
          <DonationProgressSection
            cause={cause}
            donationAmount={donationAmount}
            goalAmount={goalAmount}
            progressPercentage={progressPercentage}
            daysLeft={daysleft}
            stats={stats}
          />

          <DonationList causeId={params.cause_id} />
          <EmojiReaction />
        </div>
      </div>

      <CrowdfundingFeatures />
      <Footer />
    </>
  );
}
