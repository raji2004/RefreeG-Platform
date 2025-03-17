"use client";

import React from "react";
import { H2, P } from "@/components/typograpy";
import { DonationCarousel } from "./exploredonationcarosuel";
import { ChevronRight } from "lucide-react";

interface FoodReliefProps {
  causes: any[]; // Replace with the actual type if available
}

export default function FoodRelief({ causes }: FoodReliefProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <H2>Food Relief</H2>
          <P>These causes contribute to those in need of food</P>
        </div>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View all <ChevronRight size={20} />
        </a>
      </div>
      <DonationCarousel causes={causes} />
    </div>
  );
}
