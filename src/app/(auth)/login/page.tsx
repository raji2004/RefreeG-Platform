import FormWrapper from "@/components/formWrapper";
import LoginForm from "@/components/forms"; // LoginForm is in forms
import Particles from "@/components/ui/particles";
 

export default function Page() {


  return (
    <FormWrapper hideProgressBar={true} login={true}> 
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
        size={20}
      />
      <LoginForm  />
      
    </FormWrapper>
  );
}
