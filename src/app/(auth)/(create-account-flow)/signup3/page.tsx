import { FormWrapper } from "@/components/formWrapper";
import { SignupForm3 } from "@/components/forms";
import { Suspense } from 'react';
export default function Page(){
    return (
            <FormWrapper step={3}>
                <Suspense fallback={<div>Loading...</div>}>
                <SignupForm3 />
                </Suspense>
            </FormWrapper>
    )

}