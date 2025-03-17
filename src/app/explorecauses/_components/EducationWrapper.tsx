import React from "react";
import { getCauses } from "@/lib/action";
import Education from "./education"; // Import the client component

export default async function EducationWrapper() {
  const causes = await getCauses(); // Fetch on the server
  return <Education causes={causes} />;
}
