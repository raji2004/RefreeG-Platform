import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { SignedPetitionsColumn } from '@/components/columns';
import { SignedPetitionsData } from '@/lib/dummyData';
import { DataTable } from '@/components/ui/data-table';
import RefreshButton from "@/components/refreshButton";


export default function Petitions() {

  return (
    <div className='w-full lg:bg-[#FAFCFF]'>
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-full lg:w-full">
        <Sidebar />
        <div className="container py-5 px-2">
          <div className="flex justify-between w-full">
            <div className="flex gap-3 md:gap-5 lg:gap-8 text-base md:text-xl lg:text-3xl font-semibold py-4">
              <span className="text-gray-500">Activity Overview</span> <span className="text-gray-700">&gt;</span>  <span>Signed Petitions</span>
            </div>
            <div className="py-4 lg:pr-4">
              <RefreshButton />
            </div>
          </div>
          <DataTable
            columns={SignedPetitionsColumn}
            data={SignedPetitionsData}
            filterColumn="cause"
            filterColumnPlaceholder="Search Cause"
          />
        </div>
      </div>
    </div>
  )
}