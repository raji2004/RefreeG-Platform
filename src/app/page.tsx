import { Navbar } from "@/components/ui/navbar";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import MaiduguriCause from '../../public/images/maiduguriCauses.svg';
import Radio from '../../public/images/radio.svg';
import ArrowRight1 from '../../public/images/arrowRight.svg';
import ArrowRightBlue from '../../public/images/arrowRightBlue.svg';
import ChevronRight from '../../public/images/viewAll.svg';
import ChevronRight2 from '../../public/images/chevronRight2.svg';
import RightArrow from '../../public/images/chevronRight3.svg';
import IconRight from '../../public/images/iconArrowRight.svg';
import IconLeft from '../../public/images/iconArrowLeft.svg';
import Clock from '../../public/images/clock.svg';
import CategoryAndLocation from '../../public/images/cat-loc.svg';
import Dash from '../../public/images/dash.svg';
import Plus from '../../public/images/plus.svg';
import Video from '../../public/images/video.svg';
import { Progress } from "@/components/ui/progress";
import { Footer } from "@/components/ui/footer";


export default async function Home() {
  const cookieStore =  cookies();
  const userSession = cookieStore.get('userSession')?.value;

  if (!userSession) {
      redirect('/create-account');
  }

  return (
    <div>
        <div className="mr-10 ml-10 mb-16">
            <div>
                <Navbar />

                {/* Section below the hero section */}
                <div className="w-full border-b">
                    <div className="bg-white w-full mt-8 mb-12 px-4 z-10">
                        <div className="text-2xl w-full md:text-4xl">Why you should use us!</div>
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
                <div className="w-full px-4 py-8 bg-white border-b">
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
                                                <p className="mt-2 hidden lg:block">This cause is for Ikemefuna, a Nigerian boy that needs surgery for his cancer and is seeking your funding for the sum of 100m more...</p>
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
                                <div className="md:flex justify-between w-full mb-5">
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


                                <div className="md:flex justify-between w-full">
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
        <div className="w-full justify-center pt-20 pb-20 px-10 mb-20 text-white bg-customBlueGray">
            <div className="mb-16 font-bold text-4xl">How do we ensure transparency?</div>
            <div className="mb-16">
                <div className="text-2xl font-normal">At RefreeG, transparency is at the core of our operations. We utilize blockchain technology to provide an immutable and transparent record of all transactions. Here’s how we ensure transparency:</div>
                <div className="flex mb-4 text-2xl"><div className="mr-2">1.</div>Blockchain Integration: Every donation and disbursement is recorded on the blockchain, creating a public ledger accessible to all stakeholders. This ensures that funds are tracked and cannot be altered retroactively.</div>
                <div className="flex mb-4 text-2xl"><div className="mr-2">2.</div>Real-Time Tracking: Donors can track their contributions in real-time, from donation to final allocation, providing assurance that funds are used as intended.</div>
                <div className="flex mb-4 text-2xl"><div className="mr-2">3.</div>Detailed Reporting: We offer comprehensive reports on the use of funds, project outcomes, and the impact created. These reports are made publicly available, ensuring accountability.</div>
                <div className="flex mb-4 text-2xl"><div className="mr-2">4.</div>Third-Party Audits: Regular audits by independent third parties verify the accuracy and integrity of our financial records and processes.</div>
                <div className="flex mb-4 text-2xl"><div className="mr-2">5.</div>User Verification: Both donors and recipients undergo a verification process to ensure legitimacy and prevent fraud.</div>
            </div>
            <div className="flex mt-10 mb-10 text-2xl"><span className="mr-4">Want to be a part of us?</span><span className="flex mr-1 font-semibold underline">Join our Community!<Image src={ArrowRight1} alt="arrow right" height={15} width={15} /></span></div>
        </div>

        {/* {Causes about socio economic growth} */}

        <div className="w-full mb-16 border-b pb-16">
            <div className="flex justify-between mr-10 ml-10 mb-10" >
                <div>
                    <p className="text-3xl font-medium">Causes about socio-economic growth</p>
                    <p className="text-lg">The causes contribute to the socio-economic growth of the community.</p>
                </div>
                <Link href="#" className="flex"><Image src={ChevronRight} alt="right arrow" /></Link>
            </div>

            <div className="md:flex flex-nowrap ml-10">
                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>

                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>

                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>

                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>
            </div>
            <div className="flex justify-end mt-5 mr-10">
                <Image src={IconLeft} alt="left icon" className="rounded-full border mr-5" />
                <Image src={IconRight} alt="right icon" className="rounded-full border" />
            </div>
        </div>


        {/* {Happening near you} */}

        <div className="w-full mb-16 border-b pb-16">
            <div className="flex justify-between mr-10 ml-10 mb-10" >
                <div>
                    <p className="text-3xl font-medium">Happening near you</p>
                    <p className="text-lg">These causes are happening close to your current location.</p>
                </div>
                <Link href="#" className="flex"><Image src={ChevronRight} alt="right arrow" /></Link>
            </div>

            <div className="md:flex flex-nowrap ml-10">
                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>

                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>

                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>

                <div className="bg-white rounded-lg mr-10">
                    <Image src={MaiduguriFloodImage2} alt="Maiduguri flood" className="rounded-lg" />
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
                    <button className="flex mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 leading-4 pt-4 pb-4">Donate now <Image src={RightArrow} alt="right arrow" /></button>
                </div>
            </div>
            <div className="flex justify-end mt-5 mr-10">
                <Image src={IconLeft} alt="left icon" className="rounded-full border mr-5" />
                <Image src={IconRight} alt="right icon" className="rounded-full border" />
            </div>
        </div>

        {/* {What kind of causes we support} */}
        <div className="mr-10 ml-10">
            <div className="flex justify-between mb-6">
                <div className="text-blue-900 text-xl font-semibold">What kind of causes do we support?</div>
                <div><button className="px-4 py-4 border-2 border-blue-900 rounded-lg text-blue-900 text-xl font-semibold">Join us today!</button></div>
            </div>
            <div className="w-3/5 mx-auto text-2xl text-center mb-10">At RefreeG, we support a wide range of causes that align with our mission to empower less privileged individuals in the community and foster socio-economic growth. Here are some of the key areas we focus on:</div>
            <div>
                <div className="md:flex mb-16 pb-10 border-b justify-between">
                    <div className="self-center hidden md:block"><Image src={Radio} alt="radio" /></div>
                    <div className="text-3xl self-center font-medium w-3/12">Vocational Training</div>
                    <div className="w-6/12">
                        <div className="text-base text-blue-900 font-medium">Empowering Artisans: We provide vocational training to individuals, helping them acquire valuable skills to become proficient artisans.</div>
                        <div className="text-base text-blue-900 font-medium mt-8">Economic Contribution: By gaining these skills, individuals can join the labor force, contributing to the nation's GDP and overall economic growth.</div>
                    </div>
                    <Link href='#' className="flex self-center underline text-blue-900 text-lg font-semibold">Get Started<Image src={ChevronRight2} alt="right arrow" /></Link>
                    
                </div>

                <div className="md:flex mb-16 pb-10 border-b justify-between">
                    <div className="self-center hidden md:block"><Image src={Radio} alt="radio" /></div>
                    <div className="text-3xl self-center font-medium w-3/12">Support for GBV Victims</div>
                    <div className="w-6/12">
                        <div className="text-base text-blue-900 font-medium">Holistic Recovery: We offer comprehensive support to victims of gender-based violence, aiding in both their emotional and physical healing.</div>
                        <div className="text-base text-blue-900 font-medium mt-8">Safe Spaces: Our initiatives include creating safe spaces and providing necessary resources to help victims rebuild their lives.</div>
                    </div>
                    <Link href='#' className="flex self-center underline text-blue-900 text-lg font-semibold">Get Started<Image src={ChevronRight2} alt="right arrow" /></Link>
                    
                </div>

                <div className="md:flex mb-16 pb-10 border-b justify-between">
                    <div className="self-center hidden md:block"><Image src={Radio} alt="radio" /></div>
                    <div className="text-3xl self-center font-medium w-3/12">Education</div>
                    <div className="w-6/12">
                        <div className="text-base text-blue-900 font-medium">Access to Education: We strive to send children of various ages to school, ensuring they have access to quality education.</div>
                        <div className="text-base text-blue-900 font-medium mt-8">Future Leaders: By investing in their education, we aim to improve their lives and contribute to the country's future development.</div>
                    </div>
                    <Link href='#' className="flex self-center underline text-blue-900 text-lg font-semibold">Get Started<Image src={ChevronRight2} alt="right arrow" /></Link>
                    
                </div>

                <div className="md:flex mb-16 pb-10 border-b justify-between">
                    <div className="self-center hidden md:block"><Image src={Radio} alt="radio" /></div>
                    <div className="text-3xl self-center font-medium w-3/12">Basic Necessities</div>
                    <div className="w-6/12">
                        <div className="text-base text-blue-900 font-medium">Essential Aid: We provide food, healthcare, shelter, and clothing to those in need, ensuring they have access to basic life necessities.</div>
                        <div className="text-base text-blue-900 font-medium mt-8">Health and Well-being: Our support extends to ensuring individuals have access to healthcare services, promoting their overall well-being.</div>
                    </div>
                    <Link href='#' className="flex self-center underline text-blue-900 text-lg font-semibold">Get Started<Image src={ChevronRight2} alt="right arrow" /></Link>
                    
                </div>
            </div>
        </div>

        {/* Frequently asked questions section */}
        <div className="mr-10 ml-10 mb-16">
            <div className="text-4xl font-semibold mb-3">FAQS</div>
            <div className="text-xl mb-6">Here are some popular questions our users can’t stop asking.</div>
            <div className="md:flex w-11/12 mx-auto">
                <div className="w-full">
                    <div className="w-11/12 rounded-3xl px-6 py-6 bg-customNavyBlue mb-6">
                        <div className="flex justify-between text-white border-b mx-auto mb-2">
                            <div className="text-lg font-semibold">What is RefreeG?</div>
                            <div><Image src={Dash} alt="dash"/></div>
                        </div>
                        <div className="text-white mx-auto">RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.</div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>
                </div>


                <div className="w-full">
                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>
                </div>


                <div className="w-full">
                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>

                    <div className="flex justify-between w-11/12 rounded-3xl px-6 py-6 bg-blue-50 mb-6">
                        <div className="text-base font-semibold">How does RefreeG ensure transparency?</div>
                        <div className="text-lg font-semibold"><Image src={Plus} alt="dash"/></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Join our community section */}
        <div className="flex flex-col items-center w-8/12 mx-auto rounded-3xl text-white bg-customNavyBlue2 px-10 py-10 mb-16">
            <div className="text-3xl font-semibold mb-6">Ready to be part of the solution?</div>
            <div className="w-10/12 text-center text-lg mb-6">Join the RefreeG community and become a RefreeGerian today! By joining us, you contribute to empowering less privileged individuals in African communities, supporting causes that foster socio-economic growth, and promoting sustainable development. Together, we can make a significant impact and create a brighter future for all.</div>
            <button className=" flex border-1 rounded-md bg-white px-3 py-3 text-blue-900 font-semibold hover:bg-gray-300 transition delay-150">Join our community<Image src={ArrowRightBlue} alt="right arrow" /></button>
        </div>

        {/* Footer */}
        <Footer />


    </div>
        
  );
}