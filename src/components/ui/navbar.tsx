"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../../../public/images/logo.svg";
import Search from "../../../public/images/search.svg";
import Dropdown from "../../../public/images/dropdown.svg";
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
import SearchModal from "./searchModal";
import { ChevronDown, LogOut } from "lucide-react";

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

export function Navbar({ userSession }: { userSession?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    setIsSearchModalOpen(false);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="#" className="mr-6 lg:mr-0" prefetch={false}>
        <Image src={Logo} alt="logo" height={50} width={50} />
      </Link>

      {/* Large Screen Navigation */}
      <nav className="hidden lg:flex ml-auto gap-6">
        <div className="relative">
          <MenuLink
            href="#"
            onClick={toggleSearchModal}
            className="hover:bg-blue-100"
          >
            <Image src={Search} height={20} width={20} alt="search" />
            Search
          </MenuLink>
        </div>

        <MenuLink href="#" className="hover:bg-blue-100">
          Explore causes
        </MenuLink>

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
                  <div className='flex'>
                    <DropdownMenuItem asChild>
                      <Link href="/OurMission" className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block">
                        Our Mission
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/OurStory" className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block">
                        Our Story (The &quot;Why&quot; Behind RefreeG)
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <div className='flex'>
                    <DropdownMenuItem asChild>
                      <Link href="/OurImpact" className="whitespace-nowrap hover:underline hover:bg-[#D6EBFF] px-4 py-2 block">
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MenuLink>

        <MenuLink
          href={userSession ? "/cause/create" : "/login"}
          className="text-white hover:text-white bg-blue-600 hover:bg-blue-700"
          onClick={(e) => {
            if (!userSession) {
              e.preventDefault(); // Prevent default navigation
              alert("You need to log in before listing a cause.");
            }
          }}
        >
          List a cause
        </MenuLink>

        {userSession ? (
          <MenuLink href="/dashboard/UserProfile">
            {" "}
            <Image
              src="/UserProfile/defaultProfile.svg"
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
      </nav>

      {/* Small Screen Menu and Search Button */}
      <div className="lg:hidden ml-auto flex items-center space-x-4">
        <button onClick={toggleSearchModal} className="p-2" aria-label="Search">
          <Image src={Search} alt="search icon" height={24} width={24} />
        </button>
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
              <MenuLink href="#">Explore causes</MenuLink>
              {/* Mobile About Us (Accordion) */}
              <div className="lg:hidden">
                <button
                  onClick={() => setAboutUsOpen((prev) => !prev)}
                  className="w-full text-left flex justify-between items-center py-2 px-3 hover:bg-gray-100"
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
                    <MenuLink href="#" className="text-xs">
                      Our Mission
                    </MenuLink>
                    <MenuLink href="#" className="text-xs">
                      Our Story (The &quot;Why&quot; Behind RefreeG)
                    </MenuLink>

                    <MenuLink href="#" className="text-xs">
                      Our Impact
                    </MenuLink>
                    <MenuLink href="#" className="text-xs">
                      Who Are We Made By?
                    </MenuLink>
                    <MenuLink href="#" className="text-xs">
                      What We Do
                    </MenuLink>
                  </div>
                )}
              </div>

              <MenuLink href="#">How it works</MenuLink>
              <MenuLink
                href={userSession ? "/cause/create" : "/login"}
                className="text-white hover:text-white bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  if (!userSession) {
                    e.preventDefault();
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
                    src="/UserProfile/defaultProfile.svg"
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
                  <Button variant="outline" size="icon" className="border-none">
                    <LogOut size={24} />
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Modal with Responsive Padding */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={toggleSearchModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
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
