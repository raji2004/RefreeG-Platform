import { getUserById } from "@/lib/firebase/actions";
import { getSessionId } from "@/lib/helpers";
import Navbar from "./_components/navbar";
import Image from "next/image";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSessionId();
  const user = await getUserById(session ?? "");
  return (
    <div className="">
      <Navbar profile={user?.profileImage} />
      <div className="w-full mx-auto md:flex md:flex-row">
        <div className="hidden lg:block w-5/12 md:px-14 md:py-20 px-4 py-4 bg-[#f3f7fc]">
          <div className="mb-80">
            <h3 className="text-[#2b2829] text-xl font-semibold font-montserrat">
              Welcome to the RefreeG cause listing!
            </h3>
            <p className="text-[#2b2829] text-base font-montserrat">
              Let&rsquo;s get your cause started :)
            </p>
          </div>
          <div>
            <p className="mb-6 text-[#0a0a0b] text-base font-medium font-montserrat">
              &quot;Every act of giving brings us closer to a brighter, more united
              future. Your support isn&apos;t just a donation—it&apos;s a catalyst for
              change&quot;
            </p>
            <div className="flex gap-3 items-center">
              <Image
                src="/List_a_cause/UserImg.svg"
                alt=""
                width={50}
                height={50}
              />
              <span>
                <h4>Chukwunomso Amadike-Unaogu</h4>
                <p>Chief Product Officer, Refreeg</p>
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto lg:w-7/12 md:px-14 md:py-20 px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
