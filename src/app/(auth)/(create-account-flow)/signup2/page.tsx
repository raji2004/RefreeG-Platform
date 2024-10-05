import { FormWrapper } from "@/components/formWrapper";
import { SignupForm2 } from "@/components/forms";
import { Suspense } from 'react';

export default function Page({ searchParams }: { searchParams: { email: string, password: string, confirmPassword: string } }) {
    console.log(searchParams)
    return (
        <FormWrapper step={2}>
            <Suspense fallback={<div>Loading...</div>}>
                <SignupForm2 defaultValues={searchParams} />
            </Suspense>
        </FormWrapper>
    )

}