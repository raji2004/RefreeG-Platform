import { FormWrapper } from "@/components/formWrapper";
import { H1 } from "@/components/typograpy";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import Particles from "@/components/ui/particles";


export default function Page() {


  return (
    <FormWrapper hideProgressBar={true} login={true}> 
       <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
        size={20}
      />
      <div className=" gap-10 flex flex-col items-center ">

        <H1 className=" font-bold">Sign up to join RefreeG</H1>

        <div className=" flex flex-col gap-4 lg:w-[60%]">
          <Button link href="/signup" className=" text-gray-500" variant={'outline'}>Sign up as an Individual</Button>
          <Button link href="/company/signup" className=" text-gray-500" variant={'outline'}>Sign up as an Organization</Button>
          <Divider> or</Divider>
          <Button link href="/login" className=" bg-primaryShades-800" >Log In</Button>
        </div>
      </div>
    </FormWrapper>
  );
}
