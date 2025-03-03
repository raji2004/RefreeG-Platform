import { DonationHistoryData } from "@/lib/dummyData";
import { donationHistoryColumn } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function Donations() {
  return (   
      <DataTable
        columns={donationHistoryColumn}
        data={DonationHistoryData}
        filterColumn="cause"
        filterColumnPlaceholder="Search Cause"
      />
);
}