// components/AuthWrapper.tsx
'use client'; // Only this component needs to be client-side

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { handleSignOut } from "@/lib/action";

export const AuthWrapper = ({cookies}:{cookies:any}) => {


  const handleClick = async () => {
    await handleSignOut(); // Call the sign-out handler
  };

  return (
    <div>
      {  (
        <Button onClick={handleClick}>
          Log out
        </Button>
      )}
    </div>
  );
};
