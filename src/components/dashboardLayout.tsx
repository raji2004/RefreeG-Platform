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

  const handleSignOutClick = () => {
    startTransition(async () => {
      await handleSignOut();
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
            ({ name, path, icon: Icon, hasDropdown, subItems, onClick }) => (
              <li key={name} className="mb-4">
                <button
                  onClick={() => {
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
                  }`}
                  disabled={isPending}
                >
                  <span className="flex items-center">
                    <Icon className="w-5 h-5 mr-2" /> {name}
                  </span>
                  {hasDropdown && (
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
      <div className="bg-white shadow-sm p-4 w-full sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="mr-4"
              />
            </Link>
          </div>

          <div className="flex items-center">
            <Link href="/admin/dashboard/notifications">
              <NotificationIcon className="w-6 h-6 text-gray-500 mr-4 cursor-pointer" />
            </Link>
            {profileImage ? (
              <Link
                href="/dashboard/UserProfile"
                className="hidden md:block w-full h-full"
              >
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full aspect-square object-cover"
                />
              </Link>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
            )}

            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden mr-4"
            >
              <Bars3Icon className="w-7 h-7" />
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
        <div className="flex-1 overflow-auto p-4 bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
