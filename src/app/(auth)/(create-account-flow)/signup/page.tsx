import { FormWrapper } from "@/components/formWrapper";
import { SignupForm1 } from "@/components/forms";
import { Suspense } from "react";
import Particles from "@/components/ui/particles";

interface SignupSearchParams {
  firstName: string;
  lastName: string;
  countryOfResidence: string;
  DOB: string;
}

export default async function Page({
  searchParams,
}: {
  // Use any here to bypass Next.js’s constraint
  searchParams: any;
}) {
  // Now cast to your expected type
  const params = searchParams as SignupSearchParams;
  console.log(params);
  return (
    <FormWrapper step={1}>
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
        size={20}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm1 defaultValues={params} />
      </Suspense>
    </FormWrapper>
  );
}
