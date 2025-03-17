"use client";

import React from "react";
import Image from "next/image";
import { H2, P } from "@/components/typograpy";
import { DonationCarousel } from "./exploredonationcarosuel";
import { ChevronRight } from "lucide-react";

export default function Education({ causes = [] }: { causes?: any[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <H2>Education</H2>
          <P>These causes contribute to the education of kids in school</P>
        </div>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View all <ChevronRight size={20} />
        </a>
      </div>
      <DonationCarousel causes={causes} />
    </div>
  );
}
