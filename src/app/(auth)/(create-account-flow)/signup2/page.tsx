import { FormWrapper } from "@/components/formWrapper";
import { SignupForm2 } from "@/components/forms";
import { User } from "@/lib/type";
export default function Page({searchParams}:{searchParams:{email:string,password:string,confirmPassword:string}}){
    console.log(searchParams)
    return (
            <FormWrapper step={2}>
                <SignupForm2 defaultValues={searchParams} />
            </FormWrapper>
    )

}