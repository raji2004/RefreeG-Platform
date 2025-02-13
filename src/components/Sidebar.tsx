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
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  // Automatically open Activity Overflow if a submenu is active
  useEffect(() => {
    if (
      ["/my-causes", "/donation-history", "/signed-petitions"].includes(
        pathname
      )
    ) {
      setIsActivityOpen(true);
    }
  }, [pathname]);

  const navItems = [
    { name: "Profile", path: "/profile", icon: UserIcon },
    {
      name: "Activity Overflow",
      path: "#",
      icon: ActivityIcon,
      hasDropdown: true,
      subItems: [
        { name: "My Causes", path: "/my-causes", icon: CausesIcon },
        {
          name: "Donation History",
          path: "/donation-history",
          icon: DonationHistoryIcon,
        },
        {
          name: "Signed Petitions",
          path: "/signed-petitions",
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
      name: "Notification Centre",
      path: "/admin/dashboard/notifications",
      icon: NotificationIcon,
    },
    { name: "Account", path: "/account", icon: AccountIcon },
    { name: "Security", path: "/security", icon: SecurityIcon },
    {
      name: "Support & Help Center",
      path: "/admin/dashboard/support",
      icon: SupportIcon,
    },
  ];

  return (
    <div className="w-64 bg-white text-black min-h-screen p-4 border-r">
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
                  }
                }}
                className={`flex items-center justify-between p-2 rounded w-full text-left transition ${
                  pathname === path || (hasDropdown && isActivityOpen)
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center">
                  <Icon className="w-5 h-5 mr-2" /> {name}
                </span>
                {hasDropdown && <ChevronDownIcon className="w-4 h-4" />}
              </button>
              {hasDropdown && isActivityOpen && subItems && (
                <ul className="ml-6 mt-2 space-y-2">
                  {subItems.map(({ name, path, icon: SubIcon }) => (
                    <li key={name}>
                      <button
                        className={`flex items-center p-2 rounded w-full text-left ${
                          pathname === path
                            ? "bg-gray-300 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => router.push(path)}
                      >
                        <SubIcon className="w-5 h-5 mr-2" /> {name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4 w-full">
        <button
          onClick={() => router.push("/signout")}
          className="flex items-center text-black p-2 rounded w-full text-left hover:bg-gray-100"
        >
          <SignOutIcon className="w-5 h-5 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
