'use client'

import Logo from '@/images/logo.png';
import Dropdown from '@/images/dropdown.svg';
import Search from '@/images/search.svg';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  return (
    <nav className="bg-white shadow-md w-full md:w-screen z-10">
    <div className="w-full px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl ml-10 font-bold">
                <Image src={Logo} alt="icon" width={60} height={60} />
            </Link>
        </div>
        <div className="hidden md:flex space-x-4">
            <Link href="/" className="flex text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <Image src={Search} alt="icon" width={18} height={18} />Search
            </Link>
            <Link href="/explore" className="text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                Explore causes
            </Link>
            <Link href="/about" className="flex text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                About us<Image src={Dropdown} alt="icon" width={15} height={15} />
            </Link>
            <Link href="/how-it-works" className="flex text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                How it works<Image src={Dropdown} alt="icon" width={15} height={15} />
            </Link>
            <Link href="/list-cause" className="text-lg bg-blue-700 text-white px-5 py-2 rounded-sm transition duration-200 ease-in-out hover:bg-blue-900 transform hover:-translate-y-1 hover:scale-110">
                List a cause
            </Link>
            <Link href="/login" className="text-lg bg-white text-gray-700 px-4 py-2 rounded-sm transition duration-200 ease-in-out hover:underline hover:text-blue-800">
                Login
            </Link>
        </div>
        <div className="md:hidden flex items-center">
            <button onClick={handleClick}>
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
        </div>
    </div>
    {nav && (
        <div className="md:hidden">
            <div className="flex flex-col items-center space-y-4 mt-4">
                <Link href="/" className="text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    Search
                </Link>
                <Link href="/explore" className="text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    Explore causes
                </Link>
                <Link href="/about" className="text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    About us
                </Link>
                <Link href="/how-it-works" className="text-lg text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    How it works
                </Link>
                <Link href="/list-cause" className="text-lg bg-blue-700 text-white px-5 py-2 rounded-sm transition duration-200 ease-in-out hover:bg-blue-900 transform hover:-translate-y-1 hover:scale-110">
                    List a cause
                </Link>
                <Link href="/login" className="text-lg bg-white text-gray-700 px-5 py-2 rounded-sm transition duration-200 ease-in-out hover:underline hover:text-blue-800">
                    Login
                </Link>
            </div>
        </div>
    )}
</nav>

  );
};

export default Navbar;
