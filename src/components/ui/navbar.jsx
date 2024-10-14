'use client'

import Logo from '../../images/logo.png';
import Dropdown from '../../images/dropdown.svg';
import Search from '../../images/search.svg';
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md w-full z-10">
            <div className="w-full px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="text-xl ml-10 font-bold">
                        <Image src={Logo} alt="Logo" width={60} height={60} />
                    </Link>
                </div>
                <div className="flex space-x-4">
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
                    <Link href="/login" aria-label="login" className="text-lg bg-white text-gray-700 px-4 py-2 rounded-sm transition duration-200 ease-in-out hover:underline hover:text-blue-800">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavbarMedium = () => {
    const [nav, setNav] = useState(false);

    const handleClick = () => setNav(!nav);

    return (
        <nav className="bg-white shadow-md w-full z-10">
            <div className="w-full px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="text-xl ml-10 font-bold">
                        <Image src={Logo} alt="Logo" width={60} height={60} />
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link href="/" className="flex text-sm text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <Image src={Search} alt="icon" width={15} height={15} />Search
                    </Link>
                    <Link href="/explore" className="text-sm text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        Explore causes
                    </Link>
                    <Link href="/about" className="flex text-sm text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        About us<Image src={Dropdown} alt="icon" width={12} height={12} />
                    </Link>
                    <Link href="/how-it-works" className="flex text-sm text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        How it works<Image src={Dropdown} alt="icon" width={12} height={12} />
                    </Link>
                    <Link href="/list-cause" className="text-sm bg-blue-700 text-white px-2 py-2 rounded-sm transition duration-200 ease-in-out hover:bg-blue-900 transform hover:-translate-y-1 hover:scale-110">
                        List a cause
                    </Link>
                    <Link href="/login" aria-label="login" className="text-sm bg-white text-gray-700 px-2 py-2 rounded-sm transition duration-200 ease-in-out hover:underline hover:text-blue-800">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavbarSmall = () => {
    const [nav, setNav] = useState(false);

    const handleClick = () => setNav(!nav);

    return (
        <nav className="bg-white shadow-md w-full z-10">
            <div className="w-full px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="text-xl ml-10 font-bold">
                        <Image src={Logo} alt="Logo" width={60} height={60} />
                    </Link>
                </div>
                <div className="flex mr-8 items-center">
                    <button onClick={handleClick}>
                        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                    </button>
                </div>
            </div>
            {nav && (
                <div>
                    <div className="flex flex-col items-center space-y-4 mt-4">
                        <Link href="/" className="flex text-base text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                            <Image src={Search} alt="icon" width={18} height={18} />Search
                        </Link>
                        <Link href="/explore" className="text-base text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                            Explore causes
                        </Link>
                        <Link href="/about" className="flex text-base text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                            About us<Image src={Dropdown} alt="icon" width={15} height={15} />
                        </Link>
                        <Link href="/how-it-works" className="flex text-base text-gray-700 hover:bg-blue-200 px-2 py-2 rounded-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                            How it works<Image src={Dropdown} alt="icon" width={15} height={15} />
                        </Link>
                        <Link href="/list-cause" className="text-base bg-blue-700 text-white px-5 py-2 rounded-sm transition duration-200 ease-in-out hover:bg-blue-900 transform hover:-translate-y-1 hover:scale-110">
                            List a cause
                        </Link>
                        <Link href="/login" className="text-base bg-white text-gray-700 px-5 py-2 rounded-sm transition duration-200 ease-in-out hover:underline hover:text-blue-800">
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export { Navbar, NavbarMedium, NavbarSmall };
