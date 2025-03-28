import React, { Suspense } from "react";
import SuccessPage from "@/components/SuccessPage";
import { getCauseById } from "@/lib/firebase/actions";
import { getBaseURL } from "@/lib/utils";


export default async function SuccessPageWrapper({ searchParams }: { searchParams: { id: string } }) {

  const cause = await getCauseById(searchParams.id);
  const baseURL = await getBaseURL();
  if (!cause) {
    return <div>Cause not found</div>;
  }
  return (
    <Suspense fallback={<div>Loading success page...</div>}>
      <SuccessPage causeData={cause} baseURL={baseURL} />
    </Suspense>
  );
}
