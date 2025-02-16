import { useState } from "react";
import { FaClock } from "react-icons/fa";
import Comment from "./Comments";
import FAQ from "./FAQ";
import Community from "./Community";
import Updates from "./Updates";

const DonationNav = () => {
  const [activeTab, setActiveTab] = useState("Comment");
  const [commentsCount, setCommentsCount] = useState(0);

  const updateCommentsCount = (count: number) => {
    setCommentsCount(count);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "Comment":
        return <Comment updateCommentsCount={updateCommentsCount} />;
      case "FAQ":
        return <FAQ />;
      case "Community":
        return <Community />;
      case "Updates":
        return <Updates />;
      default:
        return <Comment updateCommentsCount={updateCommentsCount} />;
    }
  };

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center bg-white shadow-lg px-4 py-2">
        <ul className="flex space-x-6">
          {["Comment", "FAQ", "Community", "Updates"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer hover:underline ${
                activeTab === tab ? "font-bold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Comment" ? (
                <>
                  Comments
                  <sup className="text-xs text-red-500 ml-1">
                    {commentsCount}
                  </sup>
                </>
              ) : (
                tab
              )}
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center space-x-2">
          <button className="bg-blue-500 text-white px-4 py-1 rounded">
            Donate
          </button>
          <div className="flex items-center space-x-1">
            <FaClock />
            <span>Remind me</span>
          </div>
        </div>
      </nav>
      <div className="mt-4">{renderComponent()}</div>
    </div>
  );
};

export default DonationNav;
