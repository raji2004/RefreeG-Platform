import { FormWrapper } from "@/components/formWrapper";
import { LoginForm } from "@/components/forms"; // LoginForm is in forms


export default function Page({searchParams}:{searchParams:{email:string,password:string,}}) {
   const defaultValues = searchParams

  return (
    <FormWrapper hideProgressBar={true} login={true}> {/* Hide progress bar and set login mode */}
      <LoginForm defaultValues={defaultValues} />
      
    </FormWrapper>
  );
}
