import { FormWrapper } from "@/components/formWrapper";
import { SignupForm1 } from "@/components/forms";
import { User } from "@/lib/type";
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
      <SignupForm1 defaultValues={searchParams} />
    </FormWrapper>
  );
}
