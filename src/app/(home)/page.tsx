import React from "react";
import Image from "next/image";
import { Navbar } from "../../components/ui/navbar";
import {
  FaExclamationTriangle,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaShare,
  FaHeart,
  FaSmile,
  FaLeaf,
} from "react-icons/fa";
import { Progress } from "../../components/ui/progress";
import { Footer } from "../../components/ui/footer";
import CausesAboutSocioEconomicGrowth from "@/components/ui/causesAboutSocioEconomicGrowth";
import HappeningNearYou from "@/components/ui/happeningNearYou";
import CausesSupported from "@/components/ui/causesWeSupport";
import FAQ from "@/components/ui/frequentlyAskedQuestions";
import WhyUseUs from "@/components/ui/whyUseUs";
import { HappeningNearYouMobile } from "@/components/ui/happeningNearYouMobile";
import { CausesAboutSocioEconomicGrowthMobile } from "@/components/ui/causesAboutSocioEconimicGrowthMobile";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { H2, P, Ol } from "@/components/typograpy";
import { DonationCarousel } from "@/components/donationCarousel";

export default function Home() {
  const goalAmount = 2000000;
  const donationAmount = 1700000;
  const progressPercentage = (donationAmount / goalAmount) * 100;

  const goalAmount2 = 2000000;
  const donationAmount2 = 1300000;
  const progressPercentage2 = (donationAmount2 / goalAmount2) * 100;

  const goalAmount3 = 2000000;
  const donationAmount3 = 700000;
  const progressPercentage3 = (donationAmount3 / goalAmount3) * 100;

  const goalAmount4 = 2000000;
  const donationAmount4 = 200000;
  const progressPercentage4 = (donationAmount4 / goalAmount4) * 100;

  const goalAmount5 = 2000000;
  const donationAmount5 = 1000000;
  const progressPercentage5 = (donationAmount5 / goalAmount5) * 100;

  const cookieStore = cookies();
  const userSession = cookieStore.get('userSession')?.value;


  return (
    <div>


      <WhyUseUs />


      <div className="w-full px-4 py-8 bg-white border-b">
        <div className="flex justify-between items-center mb-6">
          <H2>Urgent causes</H2>
          <a href="#" className="text-blue-600 hover:underline">View all</a>
        </div>
        <DonationCarousel />

      </div>




      {/* <div className="flex justify-end mt-4">
        <nav className="inline-flex space-x-2">
          <a href="#" className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">1</a>
          <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">2</a>
          <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">3</a>
          <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">4</a>
        </nav>
      </div> */}

      <div className='pt-2 pb-8 mb-8'>
        <div className="mt-8 font-semibold text-2xl">How it works</div>
        <P className="text-xl mb-12">How donation on <span className='text-gray-500 text-xl font-semibold underline'>Refreeg</span> works!</P>
        <div className="w-full flex justify-center mt-2">
          <Image
            src="/images/video.svg"
            alt="How it works video"
            height={400}
            width={800}
          />
        </div>
      </div>

      <div className="w-full justify-center pt-20 pb-12 lg:pb-20 px-10 mb-20 text-white bg-customBlueGray">
        <div className="text-xl mb-16 font-bold lg:text-4xl">How do we ensure transparency?</div>
        <Ol className="mb-16">
          <P>At RefreeG, transparency is at the core of our operations. We utilize blockchain technology to provide an immutable and transparent record of all transactions. Here's how we ensure transparency:</P>
          <li className="mb-4 text-lg">
            Blockchain Integration: Every donation and disbursement is recorded on the blockchain, creating a public ledger accessible to all stakeholders. This ensures that funds are tracked and cannot be altered retroactively.
          </li>
          <li className="mb-4 text-lg">
            Real-Time Tracking: Donors can track their contributions in real-time, from donation to final allocation, providing assurance that funds are used as intended.
          </li>
          <li className="mb-4 text-lg">
            Detailed Reporting: We offer comprehensive reports on the use of funds, project outcomes, and the impact created. These reports are made publicly available, ensuring accountability.
          </li>
          <li className="mb-4 text-lg">
            Third-Party Audits: Regular audits by independent third parties verify the accuracy and integrity of our financial records and processes.
          </li>
          <li className="mb-4 text-lg">
            User Verification: Both donors and recipients undergo a verification process to ensure legitimacy and prevent fraud.
          </li>
        </Ol>
        <div className="md:flex lg:flex mt-10 mb-10 text-base lg:text-2xl">
          <span className="mr-4">Want to be a part of us?</span>
          <span className="flex mr-1 md:font-semibold lg:font-semibold underline">
            Join our Community!
            <Image
              src="/images/arrowRight.svg"
              alt="arrow right"
              height={15}
              width={15}
            />
          </span>
        </div>
      </div>

      <CausesAboutSocioEconomicGrowth />
      <CausesAboutSocioEconomicGrowthMobile />
      <HappeningNearYou />
      <HappeningNearYouMobile />
      <CausesSupported />
      <FAQ />

      <div className="flex flex-col items-center w-10/12 lg:w-8/12 mx-auto rounded-3xl text-white bg-customNavyBlue2 px-10 py-10 mb-16">
        <div className="text-lg lg:text-3xl font-semibold mb-6">Ready to be part of the solution?</div>
        <div className="w-11/12 text-center text-base lg:text-lg mb-6">Join the RefreeG community and become a RefreeGerian today! By joining us, you contribute to empowering less privileged individuals in African communities, supporting causes that foster socio-economic growth, and promoting sustainable development. Together, we can make a significant impact and create a brighter future for all.</div>
        <button className="flex border-1 rounded-md bg-white px-3 py-3 text-blue-900 font-semibold hover:bg-gray-300 transition delay-150">
          Join our community
          <Image
            src="/images/arrowRightBlue.svg"
            alt="right arrow"
            height={20}
            width={20}
          />
        </button>
      </div>


    </div>


  );
}