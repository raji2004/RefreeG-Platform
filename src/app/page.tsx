import { FormWrapper } from "@/components/formWrapper";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const userSession = cookieStore.get('userSession')?.value;
  
 if(!userSession){
  redirect('/login')
 }


  return (
    <div className="">
      <FormWrapper step={1} >
       h
  
      </FormWrapper>
    </div>
  );
}
