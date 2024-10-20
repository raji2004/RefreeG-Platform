import { CompanyForm } from "@/components/forms";
import { FormWrapper } from "@/components/formWrapper";
import { H1 } from "@/components/typograpy";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import Particles from "@/components/ui/particles";


export default function Page() {


  return (
    <FormWrapper login={true}> 
      <CompanyForm/>
    </FormWrapper>
  );
}
