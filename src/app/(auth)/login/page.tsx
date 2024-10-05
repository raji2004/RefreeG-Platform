import { FormWrapper } from "@/components/formWrapper";
import { LoginForm } from "@/components/forms"; // LoginForm is in forms


export default function Page() {


  return (
    <FormWrapper hideProgressBar={true} login={true}> {/* Hide progress bar and set login mode */}
      <LoginForm  />
      
    </FormWrapper>
  );
}
