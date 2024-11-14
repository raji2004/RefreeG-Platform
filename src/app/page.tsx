"use client"; // Ensures that this component is rendered on the client-side

import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import {
    FaExclamationTriangle,
    FaHeartbeat,
    FaMapMarkerAlt,
    FaShare,
    FaHeart,
} from "react-icons/fa";
import Image from "next/image";
import CancerImage from '../../public/images/cancerFoundation.png';
import MaiduguriFloodImage1 from '../../public/images/flood1.png';
import MaiduguriFloodImage2 from '../../public/images/flood2.png';
import MaiduguriFloodImage3 from '../../public/images/flood3.png';
import MaiduguriFloodImage4 from '../../public/images/flood4.png';
import Bookmark from '../../public/images/bookmark.svg';
import CancerEllipse from '../../public/images/cancerEllipse.svg';
import MaiduguriEllipse1 from '../../public/images/maiduguriEllipse1.png';
import MaiduguriEllipse2 from '../../public/images/maiduguriEllipse2.png';
import MaiduguriEllipse3 from '../../public/images/maiduguriEllipse3.png';
import ArrowRight1 from '../../public/images/arrowRight.svg';
import ArrowRightBlue from '../../public/images/arrowRightBlue.svg';
import Clock from '../../public/images/clock.svg';
import Video from '../../public/images/video.svg';
import DonationProgress from "../components/ui/donationProgress";
import { Footer } from "../components/ui/footer";
import CausesAboutSocioEconomicGrowth from "@/components/ui/causesAboutSocioEconomicGrowth";
import HappeningNearYou from "@/components/ui/happeningNearYou";
import CausesSupported from "@/components/ui/causesWeSupport";
import FAQ from "@/components/ui/frequentlyAskedQuestions";
import WhyUseUs from "@/components/ui/whyUseUs";

export default function Home() {
  const goalAmount = 2000000; // Donation goal amount (in Naira)
  const [donationAmount, setDonationAmount] = useState<number>(1700000); // Initial donation amount
  const progressPercentage = (donationAmount / goalAmount) * 100;

  const [donationAmount2] = useState<number>(1300000);
  const progressPercentage2 = (donationAmount2 / goalAmount) * 100;

  const [donationAmount3] = useState<number>(700000);
  const progressPercentage3 = (donationAmount3 / goalAmount) * 100;

  const [donationAmount4] = useState<number>(200000);
  const progressPercentage4 = (donationAmount4 / goalAmount) * 100;

  const [donationAmount5] = useState<number>(1000000);
  const progressPercentage5 = (donationAmount5 / goalAmount) * 100;

  return (
    <div>
      <div className="mr-10 ml-10 mb-16">
        <Navbar />
        <WhyUseUs />

        {/* Urgent causes section */}
        <div className="w-full px-4 py-8 bg-white border-b">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Urgent causes</h2>
            <a href="#" className="text-blue-600 hover:underline">View all</a>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-8/12 mb-3 md:mb-5 md:flex md:justify-center mr-20">
              <div className="bg-white w-full rounded-lg">
                <Image src={CancerImage} alt="Cancer foundation" height={300} className="rounded-lg w-full" />
                <div className="flex justify-between mt-4">
                  <div className="flex mb-2">
                    <Image src={CancerEllipse} alt="Cancer Ellipse" height={60} width={60} className="mr-4" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold">Cancer foundation</h3>
                      <p className="flex mt-2 text-gray-600"><Image src={Clock} alt="clock" className="mr-1" />15 days left • {progressPercentage}% funded</p>
                      <p className="mt-2 hidden lg:block">This cause is for Ikemefuna, a Nigerian boy who needs surgery for his cancer and is seeking funding...</p>
                    </div>
                  </div>
                  <div><Image src={Bookmark} alt="bookmark" height={30} width={30} /></div>
                </div>
                <div className="flex space-x-2 mt-9">
                  <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300">
                    <FaHeartbeat className="mr-1" /> Healthcare
                  </span>
                  <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300">
                    <FaMapMarkerAlt className="mr-1" /> Abuja, Nigeria
                  </span>
                </div>
                <div className="mt-6">
                  <DonationProgress currentAmount={donationAmount} goalAmount={goalAmount} />
                  <div className="font-bold text-gray-800 mt-2">₦{donationAmount} raised</div>
                  <div className="text-gray-800">Goal: ₦2,000,000</div>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Donate now</button>
                </div>
              </div>
            </div>

            {/* Other causes */}
            <div className="lg:4/12 md:w-full">
              <div className="flex flex-wrap bg-white w-full z-10">
                <div className="md:flex justify-between w-full mb-5">
                  {/* Cause 1 */}
                  <div className="bg-white mr-5 mb-3 rounded-lg w-full md:w-6/12 lg:w-1/2">
                    <Image src={MaiduguriFloodImage1} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                    <div className="flex justify-between mt-2">
                      <div className="flex">
                        <Image src={MaiduguriEllipse1} alt="profile" />
                        <div className="ml-2 mb-2">
                          <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                          <p className="mt-2 text-gray-600">15 days left • {progressPercentage2}% funded</p>
                        </div>
                      </div>
                      <Image src={Bookmark} alt="bookmark" />
                    </div>
                    <DonationProgress currentAmount={donationAmount2} goalAmount={goalAmount} />
                    <div className="font-bold text-gray-800">₦{donationAmount2} raised</div>
                    <div className="text-gray-800">Goal: ₦2,000,000</div>
                  </div>

                  {/* Cause 2 */}
                  <div className="bg-white rounded-lg w-full md:w-6/12 lg:w-1/2">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                    <div className="flex justify-between mt-2">
                      <div className="flex">
                        <Image src={MaiduguriEllipse2} alt="profile" />
                        <div className="ml-2 mb-2">
                          <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                          <p className="mt-2 text-gray-600">15 days left • {progressPercentage3}% funded</p>
                        </div>
                      </div>
                      <Image src={Bookmark} alt="bookmark" />
                    </div>
                    <DonationProgress currentAmount={donationAmount3} goalAmount={goalAmount} />
                    <div className="font-bold text-gray-800">₦{donationAmount3} raised</div>
                    <div className="text-gray-800">Goal: ₦2,000,000</div>
                  </div>
                </div>

                <div className="md:flex justify-between w-full mb-5">
                  {/* Cause 3 */}
                  <div className="bg-white mb-3 mr-5 rounded-lg w-full md:w-6/12 lg:w-1/2">
                    <Image src={MaiduguriFloodImage3} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                    <div className="flex justify-between mt-2">
                      <div className="flex">
                        <Image src={MaiduguriEllipse3} alt="profile" />
                        <div className="ml-2 mb-2">
                          <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                          <p className="mt-2 text-gray-600">15 days left • {progressPercentage4}% funded</p>
                        </div>
                      </div>
                      <Image src={Bookmark} alt="bookmark" />
                    </div>
                    <DonationProgress currentAmount={donationAmount4} goalAmount={goalAmount} />
                    <div className="font-bold text-gray-800">₦{donationAmount4} raised</div>
                    <div className="text-gray-800">Goal: ₦2,000,000</div>
                  </div>

                  {/* Cause 4 */}
                  <div className="bg-white rounded-lg w-full md:w-6/12 lg:w-1/2">
                    <Image src={MaiduguriFloodImage4} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                    <div className="flex justify-between mt-2">
                      <div className="flex">
                        <Image src={CancerEllipse} alt="profile" />
                        <div className="ml-2 mb-2">
                          <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                          <p className="mt-2 text-gray-600">15 days left • {progressPercentage5}% funded</p>
                        </div>
                      </div>
                      <Image src={Bookmark} alt="bookmark" />
                    </div>
                    <DonationProgress currentAmount={donationAmount5} goalAmount={goalAmount} />
                    <div className="font-bold text-gray-800">₦{donationAmount5} raised</div>
                    <div className="text-gray-800">Goal: ₦2,000,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional sections */}
        <CausesAboutSocioEconomicGrowth />
        <HappeningNearYou />
        <CausesSupported />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}
