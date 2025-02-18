import Link from "next/link";
import Image from "next/image";
import Mail from '../../../public/images/mail.svg';
import Facebook from '../../../public/images/facebook.svg';
import Instagram from '../../../public/images/instagram.svg';
import X from '../../../public/images/x.svg';

export function Footer() {
    return (
        <>
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
            <footer className="bg-blue-50">

                <div className="lg:flex ml-10 mr-10 pt-8 border-b border-gray-500">
                    <div className="md:flex md:justify-between lg:justify-between lg:w-7/12 ">
                        <div className="flex flex-col w-full mb-16 md:w-1/2 lg:w-7/12 md:mr-16">
                            <div className="text-blue-950 text-2xl font-semibold pb-3">Subscribe</div>
                            <div className="text-lg pb-3">Join our newsletter to stay up to date on features and releases.</div>
                            <form className="flex justify-between bg-white px-3 py-3 mb-3 w-full rounded-full">
                                <Image src={Mail} alt="mail" className="" />
                                <input type="email" required className="w-3/6 text-blue-900 outline-none" placeholder="Enter your email" />
                                <button className="bg-customNavyBlue2 text-white px-3 py-3 rounded-full">Subscribe</button>
                            </form>
                            <div className="text-lg">By Subscribing you agree with our <Link href='#' className="underline text-blue-950 font-semibold">Privacy policy</Link></div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 lg:w-5/12 md:pl-16">
                            <div className="text-blue-950 text-2xl pb-3 font-semibold">Quick Links</div>
                            <Link href="#" className="underline text-lg mb-3">Home</Link>
                            <Link href="#" className="underline text-lg mb-3">About Us</Link>
                            <Link href="#" className="underline text-lg mb-3">Who we are</Link>
                        </div>
                    </div>
                    <div className="md:flex md:justify-between lg:justify-between lg:w-5/12">
                        <div className="flex flex-col w-full mb-12 md:w-1/2">
                            <div className="text-blue-950 text-2xl pb-3 font-semibold">Contact Us</div>
                            <Link href="#" className="underline hidden md:text-lg md:block mb-3">refreegcorrespondence@gmail.com</Link>
                            <Link href="#" className="underline text-lg mb-3">Phone: +234-090-174-6760</Link>
                            <Link href="#" className="underline text-lg mb-3">Abuja, Nigeria</Link>
                        </div>
                        <div className="flex flex-col w-full md:w-2/5 lg:w-2/12">
                            <div className="text-blue-950 text-2xl pb-3 font-semibold">Legal</div>
                            <Link href='#' className="underline text-lg mb-3">Privacy Policy</Link>
                            <Link href='#' className="underline text-lg mb-3">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="md:flex justify-between mr-10 ml-10 pt-5 pb-10">
                    <div>Copyright © 2024 <Link href="#" className="underline font-semibold">Eiza Innovations.</Link> All Rights Reserved.</div>
                    <div className="flex">
                        <Image src={Facebook} alt="facebook.com" />
                        <Image src={Instagram} alt="instagram.com" className="ml-3" />
                        <Image src={X} alt="x.com" className="ml-3" />
                    </div>
                </div>
            </footer>
        </>
    );
}
