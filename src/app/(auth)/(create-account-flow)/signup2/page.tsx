import { FormWrapper } from "@/components/formWrapper";
import { SignupForm2 } from "@/components/forms";
import { Suspense } from "react";
import Particles from "@/components/ui/particles";

interface SignupSearchParams {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page({
  searchParams,
}: {
  searchParams: any;
}) {
  // Assert that searchParams is our expected type
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
        <SignupForm2 defaultValues={params} />
      </Suspense>
    </FormWrapper>
  );
}
