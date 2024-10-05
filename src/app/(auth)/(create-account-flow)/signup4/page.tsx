import { FormWrapper } from "@/components/formWrapper";
import { SignupForm4 } from "@/components/forms";
import { Suspense } from 'react';
export default function Page() {
    return (
        <FormWrapper hideSidebar step={4}>
            <Suspense fallback={<div>Loading...</div>}>
                <SignupForm4 />
            </Suspense>
        </FormWrapper>
    )

}