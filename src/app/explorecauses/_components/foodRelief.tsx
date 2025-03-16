"use client";
import React from "react";
import Image from "next/image";
import { H2, P, Ol } from "@/components/typograpy";
import { DonationCarousel } from "./exploredonationcarosuel";
import { ChevronRight } from "lucide-react";

export default function FoodRelief() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <H2>Food Relief</H2>
          <P>These causes contribute to the those in need of food</P>
        </div>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View all <ChevronRight size={20} />
        </a>
      </div>
      <DonationCarousel />
    </div>
  );
}
