"use client";
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
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/typograpy";
import { Cause } from "@/lib/type";
import { getDaysLeft } from "@/lib/utils";
import { getBookmarkedIds } from "@/lib/firebase/actions";
import { getSessionId } from "@/lib/helpers";

export default function HappeningNearYou({ causes }: { causes: Cause[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const userId = await getSessionId();
      if (userId) {
        const ids = await getBookmarkedIds(userId);
        setBookmarkedIds(ids);
      }
      setLoading(false);
    };

    fetchBookmarks();
  }, []);

  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  if (loading) {
    return (
      <div className="px-10 my-10 space-y-5">
        <div>
          <H2 className="font-medium">Happening near you</H2>
          <P className="mt-1 text-gray-400">
            These causes are happening close to your current location.
          </P>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 my-10 space-y-5">
      <div>
        <H2 className="font-medium">Happening near you</H2>
        <P className="mt-1 text-gray-400">
          These causes are happening close to your current location.
        </P>
      </div>
      {causes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <SearchX className="w-16 h-16 text-gray-400 mb-4" />
          <P className="text-gray-500">
            No causes found near your location at the moment.
          </P>
        </div>
      ) : (
        <>
          <Carousel setApi={setApi}>
            <CarouselContent>
              {causes.map((cause) => (
                <CarouselItem
                  key={cause.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <MainCauseCard
                    {...cause}
                    profileImage={cause.profileImage}
                    isBookmarked={bookmarkedIds.includes(cause.id)}
                    onRemoveBookmark={(id) => {
                      setBookmarkedIds((prev) =>
                        prev.filter((causeId) => causeId !== id)
                      );
                    }}
                    daysLeft={getDaysLeft(cause.deadline)}
                    progressPercentage={Math.round(
                      (cause.raisedAmount / cause.goalAmount) * 100
                    )}
                    hideDescription
                    hideTags
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-10 flex justify-center md:justify-end">
            <Button
              variant={"link"}
              className="text-black"
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant={"link"}
              className="text-black"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
