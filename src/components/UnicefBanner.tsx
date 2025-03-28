import React from "react";
import Image from "next/image";
import {User} from "lucide-react"

function UnicefBanner({name}: {name?: string}) {
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
          <p className="font-semibold text-sm">
          {name ??  "United Nations International Children's Emergency Fund"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnicefBanner;
