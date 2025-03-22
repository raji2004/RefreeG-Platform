'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MainCauseCard } from "@/components/CauseCard";
import { useState, useEffect } from "react";
import { causesData } from "@/lib/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/typograpy";
import { Cause } from "@/lib/type";
import { getDaysLeft } from "@/lib/utils";

export default function HappeningNearYou({ causes,}: { causes: Cause[]}) {
  // const mainCause = { ...causesData[0], description: causesData[0].description || "" }; // Ensure description is defined
  // const otherCauses = causesData.slice(1);
  const [api, setApi] = useState<CarouselApi>();

  const handleNext = () => {
    if (api) {
      api.scrollNext(); // Scroll desktop carousel
    }

  };

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev(); // Scroll desktop carousel
    }

  };

  return (
    <div className="px-10 my-10 space-y-5">
      <div>
        <H2 className=" font-medium">Happening near you</H2>
        <P className=" mt-1 text-gray-400">These causes are happening close to your current location.</P>
      </div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {causes.map((cause) => (
            <CarouselItem key={cause.id} className="basis-full md:basis-1/2 lg:basis-1/3">
               <MainCauseCard
                {...cause}
                isBookmarked={ cause.isBookmarked?? false}
                onRemoveBookmark={cause.onRemoveBookmark ?? (() => {})}
                daysLeft={getDaysLeft(cause.deadline)}
                progressPercentage={
                  (cause.raisedAmount / cause.goalAmount) * 100
                }
                hideDescription
                hideTags
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className=" mt-10 flex justify-center md:justify-end">
        <Button variant={"link"} className=" text-black" onClick={handlePrevious}>
          <ChevronLeft size={24} />
        </Button>
        <Button variant={"link"} className=" text-black" onClick={handleNext}>
          <ChevronRight size={24} />
        </Button>
      </div>

    </div>
  )
}