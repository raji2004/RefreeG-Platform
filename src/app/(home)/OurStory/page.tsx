import React from "react";
import Hero from "./_components/hero";
import JoinCommunity from "../OurMission/_components/JoinCommunity";
import Stories from "./_components/stories";

export default function Impact() {
    return (
        <div className="w-full">
            <Hero />
            <Stories />
            <JoinCommunity />            
        </div>
    )
}