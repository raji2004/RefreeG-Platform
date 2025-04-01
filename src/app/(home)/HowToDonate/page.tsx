import React from "react";
import HowDoWeAchieveThis from "../OurMission/_components/HowDoWeAchieveThis";
import Hero from "./_components/hero";
import WhyChooseRefreeg from "../WhatWeDo/_components/WhyChooseRefreeg";
import Stories from "./_components/stories";
// import ByNumbers from "./_components/ByNumbers";
// import ChangeLives from "./_components/ChangeLives";

export default function Impact() {
    return (
        <div className="w-full">
            <Hero />
            <WhyChooseRefreeg />
            <Stories />
            {/* <ByNumbers /> */}
            {/* <HowDoWeAchieveThis /> */}
            {/* <ChangeLives />        */}
        </div>
    )
}