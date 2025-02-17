import React from "react";
import Image from "next/image";
import CausesAboutSocioEconomicGrowth from "./_components/causesAboutSocioEconomicGrowth";
import HappeningNearYou from "./_components/happeningNearYou";
import CausesSupported from "./_components/causesWeSupport";
import FAQ from "./_components/frequentlyAskedQuestions";
import WhyUseUs from "./_components/whyUseUs";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { H2, P, Ol } from "@/components/typograpy";
import { DonationCarousel } from "@/components/donationCarousel";

export default function Home() {

  const cookieStore = cookies();
  const userSession = cookieStore.get('userSession')?.value;
  if (!userSession) {
      redirect('/create-account');
  }

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
        <H2 className="mt-8 font-semibold text-2xl">How it works</H2>
        <P className="text-xl mb-12">How donation on <span className='text-gray-500 text-xl font-semibold underline'>Refreeg</span> works!</P>

        <Image
          src="/images/video.svg"
          alt="How it works video"
          height={400}
          width={800}
          className=" mx-auto"
        />

      </div>

      <div className="w-full justify-center pt-20 pb-12 lg:pb-20 px-10 mb-20 space-y-5 text-white bg-customBlueGray">
        <H2>How do we ensure transparency?</H2>
        <Ol className="mb-16">
          <P>At RefreeG, transparency is at the core of our operations. We utilize blockchain technology to provide an immutable and transparent record of all transactions. {"Here's"} how we ensure transparency:</P>
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
      <HappeningNearYou />

      <CausesSupported />
      <FAQ />

     


    </div>


  );
}