import { FormWrapper } from "@/components/formWrapper";
import { SignupForm2 } from "@/components/forms";
import Particles from "@/components/ui/particles";
import { Suspense } from 'react';

export default function Page({ searchParams }: { searchParams: { email: string, password: string, confirmPassword: string } }) {
    console.log(searchParams)
    return (
        <FormWrapper step={2}>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
                size={20}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <SignupForm2 defaultValues={searchParams} />
            </Suspense>
        </FormWrapper>
    )

}