import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

interface UnicefBannerProps {
  name?: string;
  userId?: string; // Add userId prop
}

function UnicefBanner({ name, userId }: UnicefBannerProps) {
  const displayName = name ?? "United Nations International Children's Emergency Fund";
  
  return (
    <div className="my-5 w-full">
      <div className="flex items-center rounded-md p-3 text-black border-t border-b">
        <div className="mr-3">
          <User   
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          {userId ? (
            <Link 
              href={`/profile/${userId}`}
              className="font-semibold text-sm hover:underline"
            >
              {displayName}
            </Link>
          ) : (
            <p className="font-semibold text-sm">
              {displayName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnicefBanner;