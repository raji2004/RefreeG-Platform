"use client"; // Ensures that this component is rendered on the client-side

import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import {
    FaExclamationTriangle,
    FaHeartbeat,
    FaMapMarkerAlt,
    FaGlobe,
    FaShare,
    FaHeart,
    FaSmile,
    FaLeaf,
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
import { Progress } from "../components/ui/progress";
import { Footer } from "../components/ui/footer";
import CausesAboutSocioEconomicGrowth from "@/components/ui/causesAboutSocioEconomicGrowth";
import HappeningNearYou from "@/components/ui/happeningNearYou";
import CausesSupported from "@/components/ui/causesWeSupport";
import FAQ from "@/components/ui/frequentlyAskedQuestions";
import WhyUseUs from "@/components/ui/whyUseUs";
import DonationProgress from "@/components/ui/donationProgress";


export default async function Home() {
//   const cookieStore =  cookies();
//   const userSession = cookieStore.get('userSession')?.value;

//   if (!userSession) {
//       redirect('/create-account');
//   }

const goalAmount = 2000000; // Set the donation goal amount (in Naira)
const [donationAmount, setDonationAmount] = useState<number>(1700000); // Initial donation amount
const progressPercentage = (donationAmount / goalAmount) * 100;

const goalAmount2 = 2000000; // Set the donation goal amount (in Naira)
const [donationAmount2, setDonationAmount2] = useState<number>(1300000); // Initial donation amount
const progressPercentage2 = (donationAmount2 / goalAmount2) * 100;

const goalAmount3 = 2000000; // Set the donation goal amount (in Naira)
const [donationAmount3, setDonationAmount3] = useState<number>(700000); // Initial donation amount
const progressPercentage3 = (donationAmount3 / goalAmount3) * 100;

const goalAmount4 = 2000000; // Set the donation goal amount (in Naira)
const [donationAmount4, setDonationAmount4] = useState<number>(200000); // Initial donation amount
const progressPercentage4 = (donationAmount4 / goalAmount4) * 100;

const goalAmount5 = 2000000; // Set the donation goal amount (in Naira)
const [donationAmount5, setDonationAmount5] = useState<number>(1000000); // Initial donation amount
const progressPercentage5 = (donationAmount5 / goalAmount5) * 100;


  return (
    <div>
        <div className="mr-10 ml-10 mb-16">
            <div>
                <Navbar />

                {/* Section below the hero section */}
                <WhyUseUs />

                {/* Urgent causes section */}
                <div className="w-full px-4 py-8 bg-white border-b">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Urgent causes</h2>
                        <a href="#" className="text-blue-600 hover:underline">View all</a>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row justify-between">
                        <div className="w-full lg:w-8/12 mb-3 md:mb-5 md: flex md:justify-center mr-20">
                            <div className="bg-white w-full rounded-lg">
                                <Image src={CancerImage} alt="Cancer foundation" height={300} className="rounded-lg w-full" />
                                <div className="flex justify-between mt-4">
                                    <div className=" flex mb-2">
                                        <Image src={CancerEllipse} alt="Cancer Ellipse" height={60} width={60} className="mr-4" />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold">Cancer foundation</h3>
                                            <p className="flex mt-2 text-gray-600"><Image src={Clock} alt="clock" className="mr-1" />15 days left • {progressPercentage}% funded</p>
                                            <p className="mt-2 hidden lg:block">This cause is for Ikemefuna, a Nigerian boy that needs surgery for his cancer and is seeking your funding for the sum of 100m more...</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Image src={Bookmark} alt="bookmark" height={30} width={30} />
                                    </div>
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
                                <DonationProgress
                                  currentAmount={donationAmount} // Pass current donation amount
                                  goalAmount={goalAmount} // Pass total goal amount
                                />
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
                                    <div className="bg-white mr-5 mb-3 rounded-lg w-full md:w-6/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage1} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse1} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • {progressPercentage2}% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                        <DonationProgress
                                          currentAmount={donationAmount2} // Pass current donation amount
                                          goalAmount={goalAmount2} // Pass total goal amount
                                        />
                                            <div className="font-bold text-gray-800">₦{donationAmount2} raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>


                                    <div className="bg-white rounded-lg w-full md:w-6/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse2} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • {progressPercentage3}% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                        <DonationProgress
                                          currentAmount={donationAmount3} // Pass current donation amount
                                          goalAmount={goalAmount3} // Pass total goal amount
                                        />
                                            <div className="font-bold text-gray-800">₦{donationAmount3} raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>
                                </div>


                                <div className="md:flex justify-between w-full mb-5">
                                    <div className="bg-white mb-3 mr-5 rounded-lg w-full md:w-6/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage3} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse3} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • {progressPercentage4}% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                        <DonationProgress
                                          currentAmount={donationAmount4} // Pass current donation amount
                                          goalAmount={goalAmount4} // Pass total goal amount
                                        />
                                            <div className="font-bold text-gray-800">₦{donationAmount4} raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg w-full md:w-6/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage4} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse3} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • {progressPercentage5}% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                        <DonationProgress
                                          currentAmount={donationAmount5} // Pass current donation amount
                                          goalAmount={goalAmount5} // Pass total goal amount
                                        />
                                            <div className="font-bold text-gray-800">₦{donationAmount5} raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <nav className="inline-flex space-x-2">
                        <a href="#" className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">1</a>
                        <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">2</a>
                        <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">3</a>
                        <a href="#" className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">4</a>
                        </nav>
                    </div>
                </div>



                {/* {How it works section} */}
                <div className='pt-2 pb-8 mb-8'>
                    <div className="mt-8 font-semibold text-2xl">How it works</div>
                    <p className="text-xl">How donation on <span className='text-gray-500 text-xl font-semibold underline'>Refreeg</span> works!</p>
                    <div className="w-full flex justify-center mt-2">
                        <Image src={Video} alt="How it works video"/>
                    </div>
                </div>

            </div>
        </div>


        {/* {Transparency ensurance section} */}
        <div className="w-full justify-center pt-20 pb-12 lg:pb-20 px-10 mb-20 text-white bg-customBlueGray">
            <div className="text-xl mb-16 font-bold lg:text-4xl">How do we ensure transparency?</div>
            <div className="mb-16">
                <div className="text-lg lg:text-2xl mb-3 font-normal">At RefreeG, transparency is at the core of our operations. We utilize blockchain technology to provide an immutable and transparent record of all transactions. Here’s how we ensure transparency:</div>
                <div className="flex mb-4 text-lg lg:text-2xl"><div className="mr-2">1.</div>Blockchain Integration: Every donation and disbursement is recorded on the blockchain, creating a public ledger accessible to all stakeholders. This ensures that funds are tracked and cannot be altered retroactively.</div>
                <div className="flex mb-4 text-lg lg:text-2xl"><div className="mr-2">2.</div>Real-Time Tracking: Donors can track their contributions in real-time, from donation to final allocation, providing assurance that funds are used as intended.</div>
                <div className="flex mb-4 text-lg lg:text-2xl"><div className="mr-2">3.</div>Detailed Reporting: We offer comprehensive reports on the use of funds, project outcomes, and the impact created. These reports are made publicly available, ensuring accountability.</div>
                <div className="flex mb-4 text-lg lg:text-2xl"><div className="mr-2">4.</div>Third-Party Audits: Regular audits by independent third parties verify the accuracy and integrity of our financial records and processes.</div>
                <div className="flex mb-4 text-lg lg:text-2xl"><div className="mr-2">5.</div>User Verification: Both donors and recipients undergo a verification process to ensure legitimacy and prevent fraud.</div>
            </div>
            <div className=" md:flex lg:flex  mt-10 mb-10 text-base lg:text-2xl"><span className="mr-4">Want to be a part of us?</span><span className="flex mr-1 md:font-semibold lg:font-semibold underline">Join our Community!<Image src={ArrowRight1} alt="arrow right" height={15} width={15} /></span></div>
        </div>

        {/* {Causes about socio economic growth} */}
        <CausesAboutSocioEconomicGrowth />

        {/* {Happening near you} */}
        <HappeningNearYou />

        {/* {What kind of causes we support} */}
        <CausesSupported />


        {/* Frequently asked questions section */}
        <FAQ />

        {/* Join our community section */}
        <div className="flex flex-col items-center w-10/12 lg:w-8/12 mx-auto rounded-3xl text-white bg-customNavyBlue2 px-10 py-10 mb-16">
            <div className="text-lg lg:text-3xl font-semibold mb-6">Ready to be part of the solution?</div>
            <div className="w-11/12 text-center text-base lg:text-lg mb-6">Join the RefreeG community and become a RefreeGerian today! By joining us, you contribute to empowering less privileged individuals in African communities, supporting causes that foster socio-economic growth, and promoting sustainable development. Together, we can make a significant impact and create a brighter future for all.</div>
            <button className=" flex border-1 rounded-md bg-white px-3 py-3 text-blue-900 font-semibold hover:bg-gray-300 transition delay-150">Join our community<Image src={ArrowRightBlue} alt="right arrow" /></button>
        </div>

        {/* Footer */}
        <Footer />


    </div>
        
  );
}