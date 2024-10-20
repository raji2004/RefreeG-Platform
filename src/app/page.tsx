import { Navbar, NavbarMedium, NavbarSmall } from "../components/ui/navbar";
import ClientHome from "@/components/ui/windowSize";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import Image from "next/image";
import BlockChain from '@/images/blockchain.png';
import VettedImage from '@/images/vetted.png';
import EasyDonations from '@/images/easyDonation.png';
import GlobalAccesImage from '@/images/globalAccess.png';
import ArrowRight from '@/images/arrow-right.png';

export default async function Home() {
  const cookieStore =  cookies();
  const userSession = cookieStore.get('userSession')?.value;

  if (!userSession) {
      redirect('/create-account');
  }

  return (
      <div className="">
          <div>
            <ClientHome userSession={userSession} />

            {/* Section below the hero section */}
            <div className="w-full border-b">
                <div className="bg-white w-full mt-8 mb-12 px-12 md:w-screen z-10">
                    <div className="text-4xl">Why you should use us!</div>
                    <div>Reasons why your donation will be used right!</div>
                    <div className="w-full py-6 flex justify-between items-center whyus">
                        <div className="flex w-1/5 flex-col space-y-2">
                            <Image src={BlockChain} alt="icon" width={350} height={350} />
                            <h2 className="text-2xl font-medium">Blockchain Transparency</h2>
                            <p className="text-lg">Track your donations in real-time using blockchain technology for complete transparency.</p>
                            <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                        </div>
                        <div className="flex w-1/5 flex-col space-y-2">
                            <Image src={VettedImage} alt="icon" width={350} height={350} />
                            <h2 className="text-2xl font-medium">Vetted Causes</h2>
                            <p className="text-lg">Every cause is carefully vetted to ensure your contributions make a genuine impact.</p>
                            <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                        </div>
                        <div className="flex w-1/5 flex-col space-y-2">
                            <Image src={EasyDonations} alt="icon" width={350} height={350} />
                            <h2 className="text-2xl font-medium">Easy Donation Process</h2>
                            <p className="text-lg">Donate to causes with just a few clicks and track progress every step of the way.</p>
                            <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                        </div>
                        <div className="flex w-1/5 flex-col space-y-2">
                            <Image src={GlobalAccesImage} alt="icon" width={350} height={350} />
                            <h2 className="text-2xl font-medium">Global Access</h2>
                            <p className="text-lg">Support causes from anywhere in the world with our secure, web-based platform.</p>
                            <a href="#" className="flex font-medium hover:text-blue-800 hover:underline transition duration-500 ease-in-out transform">Read more<Image src={ArrowRight} alt="icon" width={25} height={25} /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Urgent causes section */}
            <div></div>
          </div>
      </div>
  );
}