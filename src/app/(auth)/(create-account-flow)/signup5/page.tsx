import { FormWrapper } from "@/components/formWrapper";
import { SignupForm5 } from "@/components/forms";
import { Suspense } from 'react';
export default function Page() {
    return (
        <FormWrapper hideSidebar step={5}>
            <Suspense fallback={<div>Loading...</div>}>
                <SignupForm5 />
            </Suspense>
        </FormWrapper>
    )

}