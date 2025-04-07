"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MainCauseCard } from "@/components/CauseCard";
import { useState, useEffect } from "react";
import { fetchCausesByCategory } from "@/lib/firebase/admin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { getDaysLeft } from "@/lib/utils";

export const DonationCarousel: React.FC<{ category: string }> = ({ category }) => {
  const [causes, setCauses] = useState<any[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [mobileApi, setMobileApi] = useState<CarouselApi>();

  useEffect(() => {
    const getCauses = async () => {
      try {
        const data = await fetchCausesByCategory(category);
        setCauses(data);
      } catch (error) {
        console.error("Failed to fetch causes by category:", error);
      }
    };

    getCauses();
  }, [category]);

  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
    if (mobileApi) {
      mobileApi.scrollNext();
    }
  };

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
    }
    if (mobileApi) {
      mobileApi.scrollPrev();
    }
  };

  // Group causes into chunks of 4 (2x2 grid per slide)
  const groupedCauses = [];
  for (let i = 0; i < causes.length; i += 4) {
    groupedCauses.push(causes.slice(i, i + 4));
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-6">
        <div className="w-full lg:w-[100%]">
          {causes.length === 0 ? (
            // Empty state message
            <div className="text-center text-gray-500 py-10">
              <p>No causes available</p>
            </div>
          ) : (
            <>
              {/* Mobile: Single Column Carousel */}
              <div className="md:hidden">
                <Carousel setApi={setMobileApi}>
                  <CarouselContent>
                    {causes.map((cause) => (
                      <CarouselItem key={cause.id} className="basis-full">
                        <MainCauseCard
                          {...cause}
                          isBookmarked={cause.isBookmarked ?? false}
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
              </div>

              {/* Larger Screens: 2x2 Grid Carousel */}
              <div className="hidden md:block">
                <Carousel setApi={setApi}>
                  <CarouselContent>
                    {groupedCauses.map((group, groupIndex) => (
                      <CarouselItem key={groupIndex} className="basis-full">
                        <div className="grid grid-cols-4 grid-rows-1 gap-6">
                          {group.map((cause) => (
                            <MainCauseCard
                              {...cause}
                              key={cause.id}
                              isBookmarked={cause.isBookmarked ?? false}
                              onRemoveBookmark={
                                cause.onRemoveBookmark ?? (() => {})
                              }
                              daysLeft={getDaysLeft(cause.deadline)}
                              progressPercentage={
                                (cause.raisedAmount / cause.goalAmount) * 100
                              }
                              hideDescription
                              hideTags
                            />
                          ))}

                          {Array.from({ length: 4 - group.length }).map(
                            (_, index) => (
                              <div
                                key={`empty-${index}`}
                                className="w-full"
                                aria-hidden="true"
                              />
                            )
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {causes.length > 0 && (
        <div className="flex justify-center md:justify-end">
          <Button
            variant={"link"}
            className="text-black"
            onClick={handlePrevious}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button variant={"link"} className="text-black" onClick={handleNext}>
            <ChevronRight size={24} />
          </Button>
        </div>
      )}
    </>
  );
};
