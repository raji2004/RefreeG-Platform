import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { SignedPetitionsColumn } from '@/components/columns';
import { SignedPetitionsData } from '@/lib/dummyData';
import { DataTable } from '@/components/ui/data-table';

export default function Petitions() {

  return (
    <div className='w-full lg:bg-[#FAFCFF]'>
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-11/12 lg:w-full">
        <Sidebar />
        <div className="container  p-10">
          <DataTable
            columns={SignedPetitionsColumn}
            data={SignedPetitionsData}

          />
        </div>
      </div>
    </div>
  )
}