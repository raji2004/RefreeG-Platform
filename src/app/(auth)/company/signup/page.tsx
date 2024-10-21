import { CompanyForm } from "@/components/forms";
import { FormWrapper } from "@/components/formWrapper";
import Particles from "@/components/ui/particles";
import { Suspense } from "react";


export default function Page() {


  return (
    <FormWrapper login={true}>
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
        size={20}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyForm />
      </Suspense>
    </FormWrapper>
  );
}
