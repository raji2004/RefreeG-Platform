import React from "react";
import StatsCard from "../../../components/StatsCard";
import ChartComponent from "../../../components/ChartComponent";
import TransactionsTable from "../../../components/TransactionsTable";
import Comments from "../../../components/Comments";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100">
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
        <ChartComponent
          title="Funds Donated Over Time"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          dataValues={[200, 300, 400, 500, 600, 700, 800]}
        />
        <ChartComponent
          title="Donations per Country"
          labels={[
            "Nigeria",
            "UK",
            "USA",
            "Ghana",
            "Egypt",
            "Canada",
            "India",
            "Austria",
          ]}
          dataValues={[500, 300, 400, 200, 100, 150, 250, 50]}
          isHorizontal={true}
        />
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
  );
};

export default Dashboard;
