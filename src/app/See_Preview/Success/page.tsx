"use client";

import React, { Suspense } from "react";
import SuccessPage from "@/components/SuccessPage";

export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<div>Loading success page...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
