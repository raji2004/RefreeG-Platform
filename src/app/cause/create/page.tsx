import ListacauseForm from "@/components/ListacauseForm";
import { getSessionId } from "@/lib/helpers";
import { redirect } from "next/navigation";

export default async function Listacause() {
  const session = (await getSessionId()) != undefined ? true : false;
  if (!session) {
    redirect("/login");
  } 
  return <ListacauseForm />;
}
