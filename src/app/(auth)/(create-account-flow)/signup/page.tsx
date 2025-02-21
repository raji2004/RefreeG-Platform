import { FormWrapper } from "@/components/formWrapper";
import { SignupForm1 } from "@/components/forms";
import { Suspense } from 'react';
import Particles from "@/components/ui/particles";

export default function Page({
  searchParams,
}: {
  searchParams: {
    firstName: string;
    lastName: string;
    countryOfResidence: string;
    DOB: string;
  };
}) {
  console.log(searchParams);
  return (
    <FormWrapper step={1}>
        <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
        size={20}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm1 defaultValues={searchParams} />
      </Suspense>
    </FormWrapper>
  );
}
