import React from "react";
import Image from "next/image";

function UnicefBanner() {
  return (
    <div className="my-5 w-full">
      <div className="flex items-center rounded-md p-3 text-black border-t border-b">
        <div className="mr-3">
          <Image
            src="/DonationDetail/sponsor.png"
            alt="United Nations Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">
            United Nations International Children&apos;s Emergency Fund
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnicefBanner;
