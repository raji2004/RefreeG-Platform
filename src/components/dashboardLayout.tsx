"use client";

import React, { useState, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { handleSignOut } from "@/lib/firebase/actions";
import {
  Squares2X2Icon as DashboardIcon,
  UserIcon,
  ClipboardDocumentListIcon as ActivityIcon,
  HeartIcon as CausesIcon,
  DocumentTextIcon as DonationHistoryIcon,
  PencilSquareIcon as PetitionsIcon,
  ChartBarIcon as CauseDashboardIcon,
  BellIcon as NotificationIcon,
  ShieldCheckIcon as SecurityIcon,
  UserCircleIcon as AccountIcon,
  LifebuoyIcon as SupportIcon,
  BookmarkIcon as FavouritesIcon,
  ArrowLeftOnRectangleIcon as SignOutIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { SessionLogout } from "@/lib/helpers";
import { MouseEvent } from 'react';

interface LayoutProps {
  profileImage?: string | null;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ profileImage, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOutClick = () => {
    setIsSigningOut(true);
    startTransition(async () => {
      await handleSignOut();
      // The redirect happens in handleSignOut, but we'll keep the state for UI
    });
  };



  useEffect(() => {
    if (
      [
        "/dashboard/MyCauses",
        "/dashboard/DonationHistory",
        "/signed-petitions",
      ].includes(pathname)
    ) {
      setIsActivityOpen(true);
    }
  }, [pathname]);

  const navItems = [
    { name: "Profile", path: "/dashboard/UserProfile", icon: UserIcon },
    {
      name: "Activity Overflow",
      path: "#",
      icon: ActivityIcon,
      hasDropdown: true,
      subItems: [
        { name: "My Causes", path: "/dashboard/MyCauses", icon: CausesIcon },
        {
          name: "Donation History",
          path: "/dashboard/DonationHistory",
          icon: DonationHistoryIcon,
        },
        {
          name: "Signed Petitions",
          path: "/dashboard/SignedPetitions",
          icon: PetitionsIcon,
        },
      ],
    },
    {
      name: "Cause Dashboard",
      path: "/admin/dashboard",
      icon: CauseDashboardIcon,
    },
    {
      name: "Favourite Causes",
      path: "/admin/dashboard/favourite-causes",
      icon: FavouritesIcon,
    },
    {
      name: "Notification Centre",
      path: "/admin/dashboard/notifications",
      icon: NotificationIcon,
    },
    { name: "Account", path: "/dashboard/Account", icon: AccountIcon },
    { name: "Security", path: "/admin/dashboard/security", icon: SecurityIcon },
    {
      name: "Support & Help Center",
      path: "/admin/dashboard/support",
      icon: SupportIcon,
    },
    {
      name: "Sign Out",
      path: "#",
      icon: SignOutIcon,
      onClick: handleSignOutClick,
      isLoading: isSigningOut,
    },
  ];

  const renderSidebarContent = () => (
    <div className="md:w-64 bg-white text-black min-h-screen p-4 border-r overflow-auto pb-24 sticky top-0 h-screen">
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <DashboardIcon className="w-6 h-6 mr-2" /> Dashboard
      </h1>
      <nav>
        <ul>
          {navItems.map(
            ({ name, path, icon: Icon, hasDropdown, subItems, onClick, isLoading }) => (
              <li key={name} className="mb-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (onClick) {
                      onClick();
                    } else if (hasDropdown) {
                      setIsActivityOpen(!isActivityOpen);
                    } else {
                      router.push(path);
                      setIsMobileSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center justify-between p-2 rounded w-full text-left transition duration-300 ${
                    pathname === path || (hasDropdown && isActivityOpen)
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isPending || isLoading}
                >
                  <span className="flex items-center">
                    {isLoading ? (
                      <span className="w-5 h-5 mr-2 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 mr-2" />
                    )}
                    {name}
                  </span>
                  {hasDropdown && !isLoading && (
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActivityOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>
                {hasDropdown && (
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      isActivityOpen ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    <ul className="ml-6 mt-2 space-y-2">
                      {subItems.map(({ name, path, icon: SubIcon }) => (
                        <li key={name}>
                          <button
                            className={`flex items-center p-2 rounded w-full text-left transition duration-300 ${
                              pathname === path
                                ? "bg-gray-300 font-semibold"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              router.push(path);
                              setIsMobileSidebarOpen(false);
                            }}
                          >
                            <SubIcon className="w-5 h-5 mr-2" /> {name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="bg-white shadow-sm py-2 px-4 w-full sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center h-12">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="mr-4"
              />
            </Link>
          </div>

          <div className="flex items-center">
            <Link href="/admin/dashboard/notifications">
              <NotificationIcon className="w-5 h-5 text-gray-500 mr-4 cursor-pointer" />
            </Link>
            {profileImage ? (
              <Link
                href="/dashboard/UserProfile"
                className="hidden md:block"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            )}

            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden ml-4"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">{renderSidebarContent()}</div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 transition-transform transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="relative">
            {renderSidebarContent()}
            <button
              className="absolute top-4 right-4 p-2"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {isSigningOut && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900">Signing out...</h3>
                <p className="mt-2 text-sm text-gray-500">Please wait while we securely sign you out.</p>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
