"use client";
import React, { useState } from 'react';
import { useDebounce } from "./useDebounce"; // Adjust the import path
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from '../../../public/images/logo.svg';
import Dropdown from '../../../public/images/dropdown.svg';
import Image from "next/image";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from 'lucide-react'
import { SessionLogout } from "@/lib/helpers";
import { getCauseByKeyword } from "@/lib/firebase/admin";
import { ClipLoader } from "react-spinners"; // Import spinner
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

interface MenuLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Explicitly define event type
}

const MenuLink = ({
  href,
  children,
  className,
  onClick,
  ...props
}: MenuLinkProps) => (
  <Link
    href={href}
    className={`relative group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-colors duration-500 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${className}`}
    prefetch={false}
    onClick={onClick} // No change here, just ensuring type compatibility
    {...props}
  >
    {children}
  </Link>
);

export function Navbar({ userSession,profile }: { userSession?: boolean ,profile?:string}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);


  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    try {
      const results = await getCauseByKeyword(term);
      setSearchResults(results);
      console.log("Search Results:", results); // Debugging line
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  // Trigger search when debouncedSearchTerm changes
  React.useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="/" className="mr-6 lg:mr-0" prefetch={false}>
        <Image src={Logo} alt="logo" height={50} width={50} />
      </Link>

      {/* Large Screen Navigation */}
      <nav className="hidden lg:flex ml-auto gap-6">
        <div className="relative">
          <button
            className="hover:bg-blue-100 p-2 flex items-center space-x-2"
            onClick={() => setShowInput(!showInput)}
          >
            <span className="font-medium">{showInput ? <IoMdClose /> : <CiSearch size={20} />}</span>
            <span className="font-medium">{showInput ? "Close" : "Search"}</span>
          </button>

          {/* Search Input Field */}
          {showInput && (
            <div className="z-20 absolute top-full mt-2 bg-white shadow-lg p-3 rounded-lg w-64">
              <div className="flex border">
                <input
                  type="text"
                  placeholder="Search for a cause..."
                  className="outline-none p-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="text-white p-2 rounded" onClick={() => handleSearch(searchTerm)}>
                  {loading ? (
                    <ClipLoader className="bg-[#a7d7ef]" size={30} color="#142256" />
                  ) : (
                    <span className="text-xl px-1 py-0.5 rounded text-black bg-[#a7d7ef] hover:text-white hover:bg-[#142256] transition">
                      →
                    </span>
                  )}
                </button>
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 ? (
                <div className="mt-2 border rounded bg-gray-100 max-h-60 overflow-y-auto">
                  {searchResults.map((cause) => (
                    <div key={cause.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                      {cause.causeTitle || "Unnamed Cause"} {/* Ensure name is displayed */}
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p className="mt-2 text-gray-500">No cause found</p>
              )}
            </div>
          )}
        </div>


        <MenuLink href="/cause" className='hover:bg-blue-100'>Explore causes</MenuLink>

        {/* <TestProfileLink /> */}

        <div
          className="relative"
          onMouseEnter={() => setAboutUsOpen(true)}
          onMouseLeave={() => setAboutUsOpen(false)}
        >
          <MenuLink href="#" className="hover:bg-blue-100">
            <DropdownMenu open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
              <DropdownMenuTrigger asChild>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents closing when clicking inside
                    setAboutUsOpen((prev) => !prev);
                  }}
                >
                  About us
                  <Image
                    src={Dropdown}
                    height={12}
                    width={12}
                    alt="dropdown"
                    className="ml-2"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="absolute mt-2 py-4 bg-white shadow-lg rounded-md hidden lg:block"
                align="start"
              >
                <div className="">
                  <div className="flex">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/OurMission"
                        className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block"
                      >
                        Our Mission
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/OurStory"
                        className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block"
                      >
                        Our Story (The &quot;Why&quot; Behind RefreeG)
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <div className="flex">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/OurImpact"
                        className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block"
                      >
                        Our Impact
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="whitespace-nowrap hover:underline">
                      Who Are We Made By?
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href="/WhatWeDo" className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block">
                      What We Do
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </MenuLink>
        </div>

        <MenuLink href="#" className="hover:bg-blue-100">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none items-center">
              How it works
              <Image
                src={Dropdown}
                height={12}
                width={12}
                alt="dropdown"
                className="ml-2"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href={"/dashboard/UserProfile"}> Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={"/dashvoard/Account"}> Settings </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => SessionLogout()}>
                {" "}
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MenuLink>

        <MenuLink
          href={userSession ? "/cause/create" : "/login"}
          className="text-white hover:text-white bg-blue-600 hover:bg-blue-700"
        >
          List a cause
        </MenuLink>



        {userSession ? <MenuLink href='/dashboard/UserProfile'> <Image
          src={profile??"/UserProfile/defaultProfile.svg"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full aspect-square"
        />
        </MenuLink> : <MenuLink href="/login" className="">
          Login
        </MenuLink>
        }
      </nav>

      

      {/* Small Screen Menu and Search Button */}
      <div className="lg:hidden ml-auto flex items-center space-x-4">
        <div className="relative w-full">
          <button
            className="p-2"
            aria-label="Search"
            onClick={() => setShowInput(!showInput)}
          >
            <span className="font-medium">{showInput ? <IoMdClose /> : <CiSearch size={20} />}</span>
          </button>

          {/* Search Input Field */}
          {showInput && (
            <div className="fixed inset-x-0 top-16 mx-auto bg-white shadow-lg p-3 rounded-lg w-[80vw] max-w-md z-50">
              <div className="flex border">
                <input
                  type="text"
                  placeholder="Search for a cause..."
                  className="outline-none p-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="text-white p-2 rounded" onClick={() => handleSearch(searchTerm)}>
                  {loading ? (
                    <ClipLoader className="bg-[#a7d7ef]" size={30} color="#142256" />
                  ) : (
                    <span className="text-xl px-1 py-0.5 rounded text-black bg-[#a7d7ef] hover:text-white hover:bg-[#142256] transition">
                      →
                    </span>
                  )}
                </button>
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 ? (
                <div className="mt-2 border rounded bg-gray-100 max-h-60 overflow-y-auto">
                  {searchResults.map((cause) => (
                    <div key={cause.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                      {cause.causeTitle || "Unnamed Cause"}
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p className="mt-2 text-gray-500">No cause found</p>
              )}
            </div>
          )}
        </div>
     
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-none">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-white flex flex-col h-full">
            <Link href="#" className="mr-6  lg:flex" prefetch={false}>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={40}
                height={40}
                className=""
              />
            </Link>
            <div className="grid gap-2 py-6">
              <MenuLink href="/cause">Explore causes</MenuLink>
              {/* Mobile About Us (Accordion) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setAboutUsOpen((prev) => !prev)}
                  className="w-full font-medium text-left flex justify-between items-center py-2 px-3 hover:bg-gray-100"
                >
                  About Us
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      aboutUsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {aboutUsOpen && (
                  <div className="pl-4 space-y-1">
                    <MenuLink href="/OurMission" className='text-xs'>Our Mission</MenuLink>
                    <MenuLink href="/OurStory" className='text-xs'>
                      Our Story (The &quot;Why&quot; Behind RefreeG)
                    </MenuLink>

                    <MenuLink href="/OurImpact" className='text-xs'>Our Impact</MenuLink>
                    <MenuLink href="#" className='text-xs'>Who Are We Made By?</MenuLink>
                    <MenuLink href="/WhatWeDo" className='text-xs'>What We Do</MenuLink>
                  </div>
                )}
              </div>

              <MenuLink href="#">How it works</MenuLink>
              <MenuLink
                href={userSession ? "/cause/create" : "/login"}
                onClick={(e) => {
                  if (!userSession) {
                    e.preventDefault(); // Prevent default navigation
                    alert("You need to log in before listing a cause.");
                  }
                }}
              >
                List a cause
              </MenuLink>
            </div>

            <div className="mt-auto flex justify-start items-center  ">
              {userSession ? (
                <MenuLink href="/dashboard/UserProfile">
                  {" "}
                  <Image
                    src={profile ?? "/UserProfile/defaultProfile.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </MenuLink>
              ) : (
                <MenuLink href="/login" className="hover:underline">
                  Login
                </MenuLink>
              )}

              {userSession && (
                <div className=" ml-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-none"
                    onClick={() => SessionLogout()}
                  >
                    <LogOut size={24} />
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function MenuIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="20" y1="12" y2="12" />
      <line x1="2" x2="20" y1="6" y2="6" />
      <line x1="2" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
