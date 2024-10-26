import { Navbar } from "@/components/ui/navbar";
import ClientHome from "@/components/ui/windowSize";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import Image from "next/image";
import BlockChain from '../../public/images/blockchain.png';
import VettedImage from '../../public/images/vetted.png';
import EasyDonations from '../../public/images/easyDonation.png';
import GlobalAccesImage from '../../public/images/globalAccess.png';
import ArrowRight from '../../public/images/arrow-right.png';
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
import ArrowRight1 from '../../public/images/arrowRight.svg'
import Clock from '../../public/images/clock.svg';
import CategoryAndLocation from '../../public/images/cat-loc.svg'
import Video from '../../public/images/video.svg';
import { Progress } from "@/components/ui/progress";


export default async function Home() {
  const cookieStore = await cookies();
  const userSession = cookieStore.get('userSession')?.value;

  if (!userSession) {
      redirect('/Login');
  }

  return (
    <div>
        <div className="mr-10 ml-10">
            <div>
                <Navbar />

                {/* Section below the hero section */}
                <div className="w-full border-b">
                    <div className="bg-white w-full mt-8 mb-12 px-4 z-10">
                        <div className="text-2xl md:text-4xl">Why you should use us!</div>
                        <div className="text-lg md:text-xl">Reasons why your donation will be used right!</div>
                        <div className="w-full py-6 flex flex-wrap justify-between items-center space-y-6 md:space-y-0">
                            <div className="flex w-full md:w-2/5 lg:w-1/5 flex-col space-y-2 items-center">
                                <Image src={BlockChain} alt="icon" width={350} height={350} />
                                <h2 className="text-xl md:text-2xl font-medium text-center md:text-left">Blockchain Transparency</h2>
                                <p className="text-base md:text-lg text-center md:text-left">Track your donations in real-time using blockchain technology for complete transparency.</p>
                                <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform items-center">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                            </div>
                            <div className="flex w-full md:w-2/5 lg:w-1/5 flex-col space-y-2 items-center">
                                <Image src={VettedImage} alt="icon" width={350} height={350} />
                                <h2 className="text-xl md:text-2xl font-medium text-center md:text-left">Vetted Causes</h2>
                                <p className="text-base md:text-lg text-center md:text-left">Every cause is carefully vetted to ensure your contributions make a genuine impact.</p>
                                <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform items-center">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                            </div>
                            <div className="flex w-full md:w-2/5 lg:w-1/5 flex-col space-y-2 items-center">
                                <Image src={EasyDonations} alt="icon" width={350} height={350} />
                                <h2 className="text-xl md:text-2xl font-medium text-center md:text-left">Easy Donation Process</h2>
                                <p className="text-base md:text-lg text-center md:text-left">Donate to causes with just a few clicks and track progress every step of the way.</p>
                                <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform items-center">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                            </div>
                            <div className="flex w-full md:w-2/5 lg:w-1/5 flex-col space-y-2 items-center">
                                <Image src={GlobalAccesImage} alt="icon" width={350} height={350} />
                                <h2 className="text-xl md:text-2xl font-medium text-center md:text-left">Global Access</h2>
                                <p className="text-base md:text-lg text-center md:text-left">Support causes from anywhere in the world with our secure, web-based platform.</p>
                                <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform items-center">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Urgent causes section */}
                <div className="w-full px-4 py-8 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Urgent causes</h2>
                        <a href="#" className="text-blue-600 hover:underline">View all</a>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row justify-between">
                        <div className="lg:w-8/12 md:mb-5 md: flex md:justify-center mr-20">
                            <div className="bg-white w-full rounded-lg">
                                <Image src={CancerImage} alt="Cancer foundation" height={300} className="rounded-lg w-full" />
                                <div className="flex mt-4">
                                    <div className="mr-2">
                                        <Image src={CancerEllipse} alt="Cancer Ellipse" height={80} width={80} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-2xl font-semibold">Cancer foundation</h3>
                                                <p className="flex mt-2 text-gray-600"><Image src={Clock} alt="clock" className="mr-1" />15 days left • 80% funded</p>
                                                <p className="mt-2">This cause is for Ikemefuna, a Nigerian boy that needs surgery for his cancer and is seeking your funding for the sum of 100m more...</p>
                                            </div>
                                            <div>
                                                <Image src={Bookmark} alt="bookmark" height={50} width={50} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="mt-2"><Image src={CategoryAndLocation} alt="category and location" /></div>
                                <div className="mt-6">
                                    <Progress value={85} />
                                    <div className="font-bold text-gray-800 mt-2">₦1,700,000 raised</div>
                                    <div className="text-gray-800">Goal: ₦2,000,000</div>
                                </div>
                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Donate now</button>
                            </div>
                        </div>


                        {/* Other causes */}
                        <div className="lg:4/12">
                            <div className="flex flex-wrap bg-white w-full z-10">
                                <div className="flex justify-between w-full mb-5">
                                    <div className="bg-white  rounded-lg mr-10 w-full md:w-5/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage1} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse1} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • 80% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                            <Progress value={85} />
                                            <div className="font-bold text-gray-800">₦1,700,000 raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>


                                    <div className="bg-white  rounded-lg mr-10 w-full md:w-5/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse2} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • 80% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                            <Progress value={85} />
                                            <div className="font-bold text-gray-800">₦1,700,000 raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex justify-between w-full">
                                <div className="bg-white  rounded-lg mr-10 w-full md:w-5/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage3} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse3} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • 80% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                            <Progress value={85} />
                                            <div className="font-bold text-gray-800">₦1,700,000 raised</div>
                                            <div className="text-gray-800">Goal: ₦2,000,000</div>
                                        </div>
                                    </div>

                                    <div className="bg-white  rounded-lg mr-10 w-full md:w-5/12 lg:w-1/2 ">
                                        <Image src={MaiduguriFloodImage4} alt="Maiduguri flood" className="rounded-lg h-3/5 w-full" />
                                        <div className="flex justify-between mt-2">
                                            <div className="flex">
                                                <div><Image src={MaiduguriEllipse3} alt="profile" /></div>
                                                <div className="ml-2 mb-2">
                                                    <h3 className="text-xl font-semibold">Maiduguri flood</h3>
                                                    <p className="mt-2 text-gray-600">15 days left • 80% funded</p>
                                                </div>
                                            </div>
                                            <div><Image src={Bookmark} alt="bookmark" /></div>
                                        </div>
                                        <div className="mt-2">
                                            <Progress value={85} />
                                            <div className="font-bold text-gray-800">₦1,700,000 raised</div>
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
                <div className='pt-2 pb-2 mb-8 border-b'>
                    <div className="mt-8 font-semibold text-xl">How it works</div>
                    <p>How donation on <span className='text-gray-500 font-semibold underline'>Refreeg</span> works!</p>
                    <div className="w-full flex justify-center mt-2">
                        <Image src={Video} alt="How it works video"/>
                    </div>
                </div>

                


            </div>
        </div>
        {/* {Transparency ensurance section} */}
        <div className="w-full justify-center pt-20 pb-20 px-10 text-white bg-customBlueGray">
            <div className="mb-5 font-bold text-xl">How do we ensure transparency?</div>
            <div>
                <div className="text-base font-medium">At RefreeG, transparency is at the core of our operations. We utilize blockchain technology to provide an immutable and transparent record of all transactions. Here’s how we ensure transparency:</div>
                <div className="flex mb-2"><div className="mr-2">1.</div>Blockchain Integration: Every donation and disbursement is recorded on the blockchain, creating a public ledger accessible to all stakeholders. This ensures that funds are tracked and cannot be altered retroactively.</div>
                <div className="flex mb-2"><div className="mr-2">2.</div>Real-Time Tracking: Donors can track their contributions in real-time, from donation to final allocation, providing assurance that funds are used as intended.</div>
                <div className="flex mb-2"><div className="mr-2">3.</div>Detailed Reporting: We offer comprehensive reports on the use of funds, project outcomes, and the impact created. These reports are made publicly available, ensuring accountability.</div>
                <div className="flex mb-2"><div className="mr-2">4.</div>Third-Party Audits: Regular audits by independent third parties verify the accuracy and integrity of our financial records and processes.</div>
                <div className="flex mb-2"><div className="mr-2">5.</div>User Verification: Both donors and recipients undergo a verification process to ensure legitimacy and prevent fraud.</div>
            </div>
            <div className="flex mt-10"><span className="mr-4">Want to be a part of us?</span><span className="flex mr-1 font-semibold underline">Join our Community!<Image src={ArrowRight1} alt="arrow right" height={15} width={15} /></span></div>
        </div>

    </div>
        
  );
}