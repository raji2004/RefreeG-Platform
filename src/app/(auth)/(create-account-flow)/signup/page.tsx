import { FormWrapper } from "@/components/formWrapper";
import { SignupForm1 } from "@/components/forms";
import { Suspense } from 'react';

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
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm1 defaultValues={searchParams} />
      </Suspense>
    </FormWrapper>
  );
}
