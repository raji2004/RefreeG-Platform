import { FormWrapper } from "@/components/formWrapper";
import { SignupForm4 } from "@/components/forms";
import Particles from "@/components/ui/particles";
import { Suspense } from 'react';
export default function Page() {
    return (
        <FormWrapper hideSidebar step={4}>
              <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
        size={20}
      />
            <Suspense fallback={<div>Loading...</div>}>
                <SignupForm4 />
            </Suspense>
        </FormWrapper>
    )

}