import { SignedPetitionsColumn } from '@/components/columns';
import { SignedPetitionsData } from '@/lib/dummyData';
import { DataTable } from '@/components/ui/data-table';

export default function Petitions() {

  return (
          <DataTable
            columns={SignedPetitionsColumn}
            data={SignedPetitionsData}
            filterColumn="cause"
           filterColumnPlaceholder="Search for a pettition"

          />
  )
}