"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  ArrowLeftOnRectangleIcon as SignOutIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (["/UserFlow/MyCauses", "/UserFlow/DonationHistory", "/signed-petitions"].includes(pathname)) {
      setIsActivityOpen(true);
    }
  }, [pathname]);

  const navItems = [
    { name: "Profile", path: "/UserFlow/UserProfile", icon: UserIcon },
    {
      name: "Activity Overflow",
      path: "#",
      icon: ActivityIcon,
      hasDropdown: true,
      subItems: [
        { name: "My Causes", path: "/UserFlow/MyCauses", icon: CausesIcon },
        { name: "Donation History", path: "/UserFlow/DonationHistory", icon: DonationHistoryIcon },
        { name: "Signed Petitions", path: "/UserFlow/SignedPetitions", icon: PetitionsIcon },
      ],
    },
    {
      name: "Cause Dashboard",
      path: "/admin/dashboard",
      icon: CauseDashboardIcon,
    },
    {
      name: "Notification Centre",
      path: "/admin/dashboard/notifications",
      icon: NotificationIcon,
    },
    { name: "Account", path: "/account", icon: AccountIcon },
    { name: "Security", path: "/admin/dashboard/security", icon: SecurityIcon },
    {
      name: "Support & Help Center",
      path: "/admin/dashboard/support",
      icon: SupportIcon,
    },
    { name: "Sign Out", path: "/signout", icon: SignOutIcon },
  ];

  // Extract the common sidebar content into a function
  const renderSidebarContent = () => (
    <div className="w-64 bg-white text-black min-h-screen p-4 border-r relative">
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <DashboardIcon className="w-6 h-6 mr-2" /> Dashboard
      </h1>
      <nav>
        <ul>
          {navItems.map(({ name, path, icon: Icon, hasDropdown, subItems }) => (
            <li key={name} className="mb-4">
              <button
                onClick={() => {
                  if (hasDropdown) {
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
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsMobileSidebarOpen(true)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">{renderSidebarContent()}</div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-transform transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Sidebar panel */}
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
    </>
  );
};

export default Sidebar;
