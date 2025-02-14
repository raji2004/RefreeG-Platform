import React from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import StatsCard from "../../../components/StatsCard";
import DonationChart from "../../../components/DonationChart";
import CountryChart from "../../../components/CountryChart";
import TransactionsTable from "../../../components/TransactionsTable";
import Comments from "../../../components/Comments";

const Dashboard: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar (Navbar) */}
      <Topbar />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Page Title */}
          {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1> */}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Maiduguri Flood Victims"
              progress={90}
              amount="N200,000.00"
              percentageIncrease="20% more than 7 days ago"
            />
            <StatsCard
              title="Funds donated"
              progress={75}
              amount="N150,000.00"
              percentageIncrease="15% more than 7 days ago"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DonationChart />
            <CountryChart />
          </div>

          {/* Transactions Table */}
          <div className="mb-8">
            <TransactionsTable />
          </div>

          {/* Comments Section */}
          <div className="mb-8">
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
