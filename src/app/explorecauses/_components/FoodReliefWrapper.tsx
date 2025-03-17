import React from "react";
import { getCauses } from "@/lib/action";
import FoodRelief from "./foodRelief";

export default async function FoodReliefWrapper() {
  const causes = await getCauses();
  return <FoodRelief causes={causes} />;
}
